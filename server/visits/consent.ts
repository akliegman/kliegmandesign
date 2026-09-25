/**
 * Countries where analytics storage on a visitor's device needs prior consent: the EEA (ePrivacy
 * Directive), the UK (PECR), and Switzerland. The UK's statistics exemption doesn't cover
 * per-visit notifications.
 */
const OPT_IN_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV",
  "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH",
]);

/**
 * Whether a visitor must opt in before anything is recorded. Cloudflare's country header decides;
 * an unknown country (no header, XX, or T1 for Tor) is treated as requiring consent.
 */
export function requiresConsent(country: string | null): boolean {
  if (!country || !/^[A-Z]{2}$/.test(country) || country === "XX" || country === "T1") return true;
  return OPT_IN_COUNTRIES.has(country);
}

export type PrivacySignalHeaders = Record<string, string | string[] | undefined>;

/** Global Privacy Control and Do Not Track are both honored as an opt-out. */
export function hasOptOutSignal(headers: PrivacySignalHeaders): boolean {
  return headers["sec-gpc"] === "1" || headers.dnt === "1";
}
