export interface DeviceInfo {
  browser: string;
  os: string;
  device: "desktop" | "mobile" | "tablet" | "unknown";
}

/**
 * Crawlers, link previewers, uptime monitors, and automation. Most previewers never run the
 * site's JavaScript, so they rarely reach the collector; this catches the ones that do. It is a
 * heuristic, not bot detection.
 */
const AUTOMATED = new RegExp(
  [
    "bot\\b",
    "crawl",
    "spider",
    "slurp",
    "headless",
    "lighthouse",
    "pagespeed",
    "preview",
    "facebookexternalhit",
    "embedly",
    "quora link",
    "whatsapp",
    "skypeuripreview",
    "uptime",
    "pingdom",
    "statuscake",
    "monitor",
    "checkly",
    "datadog",
    "curl/",
    "wget/",
    "python-",
    "go-http-client",
    "node-fetch",
    "axios/",
    "phantomjs",
    "selenium",
    "playwright",
    "puppeteer",
    "scanner",
  ].join("|"),
  "i",
);

export function isAutomatedUserAgent(userAgent: string | undefined): boolean {
  return !userAgent || AUTOMATED.test(userAgent);
}

/** Reduces a user agent to browser family, OS family, and device class. The raw string is not kept. */
export function describeUserAgent(userAgent: string | undefined): DeviceInfo {
  const ua = userAgent ?? "";
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /OPR\/|Opera/.test(ua)
      ? "Opera"
      : /SamsungBrowser/.test(ua)
        ? "Samsung Internet"
        : /Firefox\/|FxiOS/.test(ua)
          ? "Firefox"
          : /Chrome\/|CriOS/.test(ua)
            ? "Chrome"
            : /Safari\//.test(ua)
              ? "Safari"
              : "Other";
  const os = /iPad/.test(ua)
    ? "iPadOS"
    : /iPhone|iPod/.test(ua)
      ? "iOS"
      : /Android/.test(ua)
        ? "Android"
        : /CrOS/.test(ua)
          ? "ChromeOS"
          : /Windows/.test(ua)
            ? "Windows"
            : /Mac OS X|Macintosh/.test(ua)
              ? "macOS"
              : /Linux/.test(ua)
                ? "Linux"
                : "Other";
  const device = /iPad|Tablet/.test(ua)
    ? "tablet"
    : /Mobi|iPhone|Android/.test(ua)
      ? "mobile"
      : ua
        ? "desktop"
        : "unknown";
  return { browser, os, device };
}
