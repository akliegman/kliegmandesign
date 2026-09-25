import https from "https";
import readline from "readline";
import { createGunzip } from "zlib";
import type { ParsedIp } from "./ip";
import { parseIp } from "./ip";

export type NetworkType =
  | "isp"
  | "mobile"
  | "hosting"
  | "security-proxy"
  | "vpn"
  | "other"
  | "unknown";

export interface NetworkInfo {
  asn: number | null;
  organization: string | null;
  /** Country the network is registered in, which is not necessarily where the visitor is. */
  registeredCountry: string | null;
  type: NetworkType;
}

export const UNKNOWN_NETWORK: NetworkInfo = {
  asn: null,
  organization: null,
  registeredCountry: null,
  type: "unknown",
};

/** ASNs of well-known shared networks, checked before the name patterns. Unmatched networks are "other". */
const KNOWN_ASNS: Record<Exclude<NetworkType, "other" | "unknown">, number[]> = {
  isp: [7922, 20115, 11427, 10796, 11426, 12271, 20001, 33363, 7018, 701, 22773, 5650, 6128, 209],
  mobile: [21928, 6167, 22394, 20057, 7843],
  hosting: [
    16509, 14618, 8987, 15169, 396982, 8075, 8068, 14061, 63949, 16276, 24940, 31898, 20473,
    45102, 132203, 12876, 54113, 13335, 20940, 16625,
  ],
  "security-proxy": [22616, 53813, 62044, 55256, 36692],
  vpn: [9009, 207137, 39351],
};

const NAME_PATTERNS: [RegExp, NetworkType][] = [
  [/\b(zscaler|netskope|forcepoint|menlo security|iboss)\b/i, "security-proxy"],
  [/\b(vpn|proxy|private internet access|mullvad|nord|expressvpn|surfshark)\b/i, "vpn"],
  [/\b(wireless|mobile|mobility|cellular|lte|5g)\b/i, "mobile"],
  [/\b(hosting|cloud|data ?cent(er|re)|datacenter|server|vps|colo(cation)?|cdn)\b/i, "hosting"],
  [/\b(cable|broadband|fiber|fibre|telecom|dsl|internet service|communications)\b/i, "isp"],
];

export function classifyNetwork(asn: number | null, organization: string | null): NetworkType {
  if (asn === null) return "unknown";
  for (const [type, asns] of Object.entries(KNOWN_ASNS)) {
    if (asns.includes(asn)) return type as NetworkType;
  }
  if (organization) {
    for (const [pattern, type] of NAME_PATTERNS) {
      if (pattern.test(organization)) return type;
    }
  }
  return "other";
}

/**
 * Typed arrays keep the full dataset small enough for a 512 MB dyno. IPv4 bounds are doubles (exact
 * up to 2^32); IPv6 bounds keep their upper 64 bits, the granularity allocations use.
 */
interface Ranges<T extends Float64Array | BigUint64Array> {
  starts: T;
  ends: T;
  asns: Uint32Array;
  countries: Uint16Array;
}

export interface AsnTable {
  v4: Ranges<Float64Array>;
  v6: Ranges<BigUint64Array>;
  organizations: Map<number, string>;
}

const V6_SHIFT = BigInt(2) ** BigInt(64);

function encodeCountry(code: string | undefined): number {
  return code && /^[A-Z]{2}$/.test(code) ? code.charCodeAt(0) * 256 + code.charCodeAt(1) : 0;
}

function decodeCountry(value: number): string | null {
  return value ? String.fromCharCode(Math.floor(value / 256), value % 256) : null;
}

/**
 * Builds a table from iptoasn.com's combined TSV (range_start, range_end, AS_number, country_code,
 * AS_description; public domain under PDDL v1.0). Rows are sorted by address within each family.
 */
export function createAsnTableBuilder() {
  const v4 = { starts: [] as number[], ends: [] as number[], asns: [] as number[], countries: [] as number[] };
  const v6 = { starts: [] as bigint[], ends: [] as bigint[], asns: [] as number[], countries: [] as number[] };
  const organizations = new Map<number, string>();

  return {
    add(line: string) {
      const [startText, endText, asnText, country, description] = line.split("\t");
      const asn = Number(asnText);
      if (!startText || !endText || !asn) return;
      const start = parseIp(startText);
      const end = parseIp(endText);
      if (!start || !end || start.version !== end.version) return;
      if (start.version === 4) {
        v4.starts.push(Number(start.value));
        v4.ends.push(Number(end.value));
        v4.asns.push(asn);
        v4.countries.push(encodeCountry(country));
      } else {
        v6.starts.push(start.value / V6_SHIFT);
        v6.ends.push(end.value / V6_SHIFT);
        v6.asns.push(asn);
        v6.countries.push(encodeCountry(country));
      }
      if (description && !organizations.has(asn)) organizations.set(asn, description);
    },
    build(): AsnTable {
      return {
        v4: {
          starts: Float64Array.from(v4.starts),
          ends: Float64Array.from(v4.ends),
          asns: Uint32Array.from(v4.asns),
          countries: Uint16Array.from(v4.countries),
        },
        v6: {
          starts: BigUint64Array.from(v6.starts),
          ends: BigUint64Array.from(v6.ends),
          asns: Uint32Array.from(v6.asns),
          countries: Uint16Array.from(v6.countries),
        },
        organizations,
      };
    },
  };
}

function search<T extends Float64Array | BigUint64Array>(
  ranges: Ranges<T>,
  value: T[number],
): number {
  let low = 0;
  let high = ranges.starts.length - 1;
  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    if (value < (ranges.starts[middle] as T[number])) high = middle - 1;
    else if (value > (ranges.ends[middle] as T[number])) low = middle + 1;
    else return middle;
  }
  return -1;
}

export function lookupNetwork(table: AsnTable | null, ip: ParsedIp): NetworkInfo {
  if (!table) return UNKNOWN_NETWORK;
  const ranges = ip.version === 4 ? table.v4 : table.v6;
  const index =
    ip.version === 4 ? search(table.v4, Number(ip.value)) : search(table.v6, ip.value / V6_SHIFT);
  if (index < 0) return UNKNOWN_NETWORK;
  const asn = ranges.asns[index] as number;
  const organization = table.organizations.get(asn) ?? null;
  return {
    asn,
    organization,
    registeredCountry: decodeCountry(ranges.countries[index] as number),
    type: classifyNetwork(asn, organization),
  };
}

const ASN_DATA_URL = "https://iptoasn.com/data/ip2asn-combined.tsv.gz";

/** Downloads and parses the dataset. The URL is fixed; nothing visitor-supplied is fetched. */
export function downloadAsnTable(): Promise<AsnTable> {
  return new Promise((resolve, reject) => {
    const request = https.get(ASN_DATA_URL, { timeout: 60_000 }, (response) => {
      if (response.statusCode !== 200) {
        response.resume();
        reject(new Error(`ASN download returned ${response.statusCode}`));
        return;
      }
      const builder = createAsnTableBuilder();
      const lines = readline.createInterface({ input: response.pipe(createGunzip()) });
      lines.on("line", (line) => builder.add(line));
      lines.on("close", () => resolve(builder.build()));
      lines.on("error", reject);
    });
    request.on("timeout", () => request.destroy(new Error("ASN download timed out")));
    request.on("error", reject);
  });
}
