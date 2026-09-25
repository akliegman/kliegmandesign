import express from "express";
import type { NextFunction, Request, Response, Router } from "express";
import type { VisitsConfig } from "./config";
import { hasOptOutSignal, requiresConsent } from "./consent";
import { parsePayload } from "./events";
import { clientIp, formatIp, inAnyCidr, maskIp } from "./ip";
import type { VisitStore } from "./store";
import { describeUserAgent, isAutomatedUserAgent } from "./userAgent";

export interface RouteDeps {
  store: VisitStore;
  config: VisitsConfig;
  log: (message: string) => void;
}

/** A fixed-window counter per address. In memory, since it only needs to blunt floods. */
export function createRateLimiter(limit: number, windowMs: number, now: () => number = Date.now) {
  const windows = new Map<string, { start: number; count: number }>();
  return (key: string): boolean => {
    const time = now();
    if (windows.size > 10_000) {
      for (const [entryKey, entry] of windows) if (time - entry.start > windowMs) windows.delete(entryKey);
    }
    const current = windows.get(key);
    if (!current || time - current.start > windowMs) {
      windows.set(key, { start: time, count: 1 });
      return true;
    }
    current.count += 1;
    return current.count <= limit;
  };
}

function header(request: Request, name: string): string | null {
  const value = request.headers[name];
  const text = Array.isArray(value) ? value[0] : value;
  return text ? text.trim() : null;
}

/** Cloudflare's location headers, only when the request actually came through Cloudflare. */
function location(request: Request, viaCloudflare: boolean) {
  if (!viaCloudflare) return { country: null, region: null, city: null };
  const clean = (value: string | null) => (value && /^[\p{L}\p{N} .'-]{1,80}$/u.test(value) ? value : null);
  const country = header(request, "cf-ipcountry")?.toUpperCase() ?? null;
  return {
    country: country && /^[A-Z0-9]{2}$/.test(country) ? country : null,
    region: clean(header(request, "cf-region")),
    city: clean(header(request, "cf-ipcity")),
  };
}

function originAllowed(request: Request, config: VisitsConfig): boolean {
  const origin = header(request, "origin");
  if (!origin) return false;
  try {
    return config.allowedHosts.includes(new URL(origin).hostname);
  } catch {
    return false;
  }
}

/**
 * The collector. Every rejection returns 204 with no detail, so the endpoint reveals nothing about
 * filtering, and the page never waits on or reacts to analytics beyond the consent answer.
 */
export function visitRoutes(deps: RouteDeps): Router {
  const { store, config, log } = deps;
  const router = express.Router();
  const allow = createRateLimiter(60, 60_000);

  const resolveIp = (request: Request) =>
    clientIp(request.headers, request.socket.remoteAddress, config.behindHerokuRouter);

  router.get("/policy", (request: Request, response: Response) => {
    const { country } = location(request, resolveIp(request)?.viaCloudflare ?? false);
    response.set("Cache-Control", "no-store");
    response.json({ enabled: config.enabled, consentRequired: requiresConsent(country) });
  });

  router.post(
    "/events",
    express.json({ limit: "2kb", type: ["application/json", "text/plain"] }),
    async (request: Request, response: Response) => {
      response.status(204).end();
      if (!config.enabled || !originAllowed(request, config) || hasOptOutSignal(request.headers)) return;

      const resolved = resolveIp(request);
      if (!resolved || inAnyCidr(config.ignoreNetworks, resolved.ip)) return;
      const { ip, viaCloudflare } = resolved;
      if (!allow(formatIp(ip))) return;

      const userAgent = header(request, "user-agent") ?? undefined;
      if (isAutomatedUserAgent(userAgent)) return;

      const payload = parsePayload(request.body);
      if (!payload) return;

      const place = location(request, viaCloudflare);
      if (requiresConsent(place.country) && payload.consent !== "granted") return;

      try {
        await store.recordEvent(
          payload,
          { ip: formatIp(ip), ipMasked: maskIp(ip), ...place, ...describeUserAgent(userAgent) },
          { startDelaySeconds: config.startDelaySeconds, inactivityMinutes: config.inactivityMinutes },
        );
      } catch {
        log("visits: failed to record an event");
      }
    },
  );

  // Malformed or oversized bodies end here instead of the default handler, which would log them.
  router.use((_error: unknown, _request: Request, response: Response, _next: NextFunction) => {
    if (!response.headersSent) response.status(204).end();
  });

  return router;
}
