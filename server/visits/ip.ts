import { isIP } from "net";

export interface ParsedIp {
  version: 4 | 6;
  value: bigint;
}

export interface Cidr {
  version: 4 | 6;
  base: bigint;
  prefix: number;
}

/**
 * Cloudflare's published edge ranges (https://www.cloudflare.com/ips/, checked 2026-09-25). The
 * site's DNS is proxied through Cloudflare, so these are the only peers whose CF-Connecting-IP
 * header is trusted.
 */
export const CLOUDFLARE_RANGES = [
  "173.245.48.0/20",
  "103.21.244.0/22",
  "103.22.200.0/22",
  "103.31.4.0/22",
  "141.101.64.0/18",
  "108.162.192.0/18",
  "190.93.240.0/20",
  "188.114.96.0/20",
  "197.234.240.0/22",
  "198.41.128.0/17",
  "162.158.0.0/15",
  "104.16.0.0/13",
  "104.24.0.0/14",
  "172.64.0.0/13",
  "131.0.72.0/22",
  "2400:cb00::/32",
  "2606:4700::/32",
  "2803:f800::/32",
  "2405:b500::/32",
  "2405:8100::/32",
  "2a06:98c0::/29",
  "2c0f:f248::/32",
];

function ipv4ToBigInt(address: string): bigint {
  return address
    .split(".")
    .reduce((total, octet) => total * BigInt(256) + BigInt(Number(octet)), BigInt(0));
}

function ipv6ToBigInt(address: string): bigint {
  let text = address;
  // An embedded IPv4 tail (::ffff:1.2.3.4) becomes two hextets.
  const v4Tail = /(\d+\.\d+\.\d+\.\d+)$/.exec(text)?.[1];
  if (v4Tail) {
    const v4 = ipv4ToBigInt(v4Tail);
    const high = (v4 / BigInt(65536)).toString(16);
    const low = (v4 % BigInt(65536)).toString(16);
    text = `${text.slice(0, -v4Tail.length)}${high}:${low}`;
  }
  const [head = "", tail] = text.split("::");
  const headGroups = head ? head.split(":") : [];
  const tailGroups = tail ? tail.split(":") : [];
  const missing = 8 - headGroups.length - tailGroups.length;
  const groups =
    tail === undefined
      ? headGroups
      : [...headGroups, ...Array<string>(missing).fill("0"), ...tailGroups];
  return groups.reduce(
    (total, group) => total * BigInt(65536) + BigInt(parseInt(group, 16)),
    BigInt(0),
  );
}

/** Parses an IPv4 or IPv6 address. IPv4-mapped IPv6 addresses are returned as IPv4. */
export function parseIp(input: string): ParsedIp | null {
  const address = input.trim().replace(/%.*$/, "");
  const version = isIP(address);
  if (version === 4) return { version: 4, value: ipv4ToBigInt(address) };
  if (version !== 6) return null;
  const mapped = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/i.exec(address)?.[1];
  if (mapped) return { version: 4, value: ipv4ToBigInt(mapped) };
  return { version: 6, value: ipv6ToBigInt(address) };
}

export function formatIp(ip: ParsedIp): string {
  if (ip.version === 4) {
    const octets: string[] = [];
    let rest = ip.value;
    for (let index = 0; index < 4; index++) {
      octets.unshift((rest % BigInt(256)).toString());
      rest /= BigInt(256);
    }
    return octets.join(".");
  }
  const groups: string[] = [];
  let remaining = ip.value;
  for (let index = 0; index < 8; index++) {
    groups.unshift((remaining % BigInt(65536)).toString(16));
    remaining /= BigInt(65536);
  }
  // Shortens the longest run of zero groups, as RFC 5952 recommends.
  const joined = `:${groups.join(":")}:`;
  const runs: string[] = joined.match(/(:0)+:/g) ?? [];
  const longest = runs.reduce<string>((best, run) => (run.length > best.length ? run : best), "");
  const compact = longest.length > 3 ? joined.replace(longest, "::") : joined;
  return compact.replace(/^:(?!:)/, "").replace(/(?<!:):$/, "");
}

/** Zeroes the lowest `hostBits` bits of an address. */
function networkOf(value: bigint, hostBits: number): bigint {
  return value - (value % BigInt(2) ** BigInt(hostBits));
}

export function parseCidr(input: string): Cidr | null {
  const [address = "", prefixText] = input.trim().split("/");
  const ip = parseIp(address);
  if (!ip) return null;
  const bits = ip.version === 4 ? 32 : 128;
  const prefix = prefixText === undefined ? bits : Number(prefixText);
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > bits) return null;
  return { version: ip.version, base: networkOf(ip.value, bits - prefix), prefix };
}

export function cidrContains(cidr: Cidr, ip: ParsedIp): boolean {
  if (cidr.version !== ip.version) return false;
  return networkOf(ip.value, (ip.version === 4 ? 32 : 128) - cidr.prefix) === cidr.base;
}

export function parseCidrList(inputs: readonly string[]): Cidr[] {
  return inputs.map(parseCidr).filter((cidr): cidr is Cidr => cidr !== null);
}

export function inAnyCidr(cidrs: readonly Cidr[], ip: ParsedIp): boolean {
  return cidrs.some((cidr) => cidrContains(cidr, ip));
}

/** Masks an address to its network: /24 for IPv4, /48 for IPv6. */
export function maskIp(ip: ParsedIp): string {
  const masked = formatIp({ version: ip.version, value: networkOf(ip.value, ip.version === 4 ? 8 : 80) });
  return `${masked}/${ip.version === 4 ? 24 : 48}`;
}

export type ClientIpHeaders = Record<string, string | string[] | undefined>;

const cloudflare = parseCidrList(CLOUDFLARE_RANGES);

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * Finds the visitor's address behind Heroku's router and, when present, Cloudflare.
 *
 * Heroku appends the address that connected to its router to the right of X-Forwarded-For, so
 * only the last entry is trustworthy; everything before it was supplied by the client. When that
 * peer is a Cloudflare edge, Cloudflare's CF-Connecting-IP names the visitor. A CF-Connecting-IP
 * from any other peer is ignored, since anyone can send the header to the herokuapp.com hostname.
 * Without the router (local development) the socket address is used.
 */
export function clientIp(
  headers: ClientIpHeaders,
  socketAddress: string | undefined,
  behindHerokuRouter: boolean,
): { ip: ParsedIp; viaCloudflare: boolean } | null {
  if (!behindHerokuRouter) {
    const ip = socketAddress ? parseIp(socketAddress) : null;
    return ip ? { ip, viaCloudflare: false } : null;
  }

  const forwarded = first(headers["x-forwarded-for"]);
  const peerText = forwarded?.split(",").pop();
  const peer = peerText ? parseIp(peerText) : null;
  if (!peer) return null;

  if (inAnyCidr(cloudflare, peer)) {
    const connecting = first(headers["cf-connecting-ip"]);
    const ip = connecting ? parseIp(connecting) : null;
    return ip ? { ip, viaCloudflare: true } : null;
  }
  return { ip: peer, viaCloudflare: false };
}
