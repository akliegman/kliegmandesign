import { afterEach, describe, expect, it, vi } from "vitest";

import {
  isProductionHost,
  landingAttribution,
  linkEvent,
  sendVisitEvent,
  shouldCollect,
  visitSessionId,
} from "@/lib/visits";

const US = { enabled: true, consentRequired: false };
const EU = { enabled: true, consentRequired: true };

function setOptOutSignal(gpc: boolean, dnt: string | null) {
  Object.defineProperty(navigator, "globalPrivacyControl", { value: gpc, configurable: true });
  Object.defineProperty(navigator, "doNotTrack", { value: dnt, configurable: true });
}

afterEach(() => {
  setOptOutSignal(false, null);
  sessionStorage.clear();
  vi.restoreAllMocks();
});

describe("shouldCollect", () => {
  it("collects by default where consent isn't required, until the visitor declines", () => {
    expect(shouldCollect(US, "unset")).toBe(true);
    expect(shouldCollect(US, "granted")).toBe(true);
    expect(shouldCollect(US, "denied")).toBe(false);
  });

  it("collects only after an explicit yes where consent is required", () => {
    expect(shouldCollect(EU, "unset")).toBe(false);
    expect(shouldCollect(EU, "denied")).toBe(false);
    expect(shouldCollect(EU, "granted")).toBe(true);
  });

  it("collects nothing under Global Privacy Control or Do Not Track, whatever the choice", () => {
    setOptOutSignal(true, null);
    expect(shouldCollect(US, "granted")).toBe(false);
    setOptOutSignal(false, "1");
    expect(shouldCollect(EU, "granted")).toBe(false);
  });

  it("collects nothing when the server is disabled or unreachable", () => {
    expect(shouldCollect(null, "granted")).toBe(false);
    expect(shouldCollect({ enabled: false, consentRequired: false }, "granted")).toBe(false);
  });

  it("never runs outside the production build", () => {
    expect(isProductionHost("www.adamkliegman.com")).toBe(false);
  });
});

describe("linkEvent", () => {
  it("tracks only the résumé and contact links", () => {
    expect(linkEvent("/adamkliegman_resume_2026.pdf", "/resume")).toEqual({
      type: "resume_download",
      path: "/resume",
    });
    expect(linkEvent("mailto:someone@example.com", "/")).toEqual({
      type: "contact_click",
      path: "/",
      target: "email",
    });
    expect(linkEvent("https://www.linkedin.com/in/someone", "/about")?.type).toBe("contact_click");
    expect(linkEvent("https://github.com/someone", "/about")).toMatchObject({ target: "github" });
    expect(linkEvent("/work/spellbook", "/")).toBeNull();
    expect(linkEvent("https://example.com/file.pdf", "/")).toBeNull();
  });
});

describe("landingAttribution", () => {
  it("keeps the referring host and campaign parameters, nothing else", () => {
    const location = new URL(
      "https://www.adamkliegman.com/?utm_source=linkedin&utm_campaign=fall&email=x@y.z",
    ) as unknown as Location;
    expect(landingAttribution(location, "https://www.linkedin.com/feed/some/path?q=1")).toEqual({
      referrerHost: "www.linkedin.com",
      utmSource: "linkedin",
      utmMedium: null,
      utmCampaign: "fall",
      utmContent: null,
      utmTerm: null,
    });
  });

  it("ignores the site's own pages as referrers", () => {
    const location = new URL("https://www.adamkliegman.com/work") as unknown as Location;
    expect(landingAttribution(location, "https://www.adamkliegman.com/").referrerHost).toBeNull();
  });
});

describe("visit session", () => {
  it("keeps one id through a visit and rotates it after 30 idle minutes", () => {
    const first = visitSessionId(1_000);
    expect(visitSessionId(1_000 + 29 * 60_000)).toBe(first);
    expect(visitSessionId(1_000 + 29 * 60_000 + 31 * 60_000)).not.toBe(first);
  });
});

describe("sendVisitEvent", () => {
  it("posts the allowlisted payload without credentials and swallows network failures", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("offline"));
    vi.stubGlobal("fetch", fetchMock);
    sendVisitEvent({ type: "pageview", path: "/", previousEngagedMs: null }, "unset");
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/visits/events");
    expect(init).toMatchObject({ method: "POST", credentials: "omit", keepalive: true });
    expect(Object.keys(JSON.parse(init.body as string))).toEqual([
      "sessionId",
      "consent",
      "event",
      "attribution",
    ]);
    expect(JSON.parse(init.body as string).consent).toBe("notice");
    await Promise.resolve();
    vi.unstubAllGlobals();
  });
});
