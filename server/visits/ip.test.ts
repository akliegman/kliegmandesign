import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { clientIp, formatIp, maskIp, parseCidr, cidrContains, parseIp } from "./ip";

const CLOUDFLARE_EDGE = "172.70.1.1";

function resolved(headers: Record<string, string>, socket = "10.0.0.1", heroku = true) {
  const result = clientIp(headers, socket, heroku);
  return result ? { ip: formatIp(result.ip), viaCloudflare: result.viaCloudflare } : null;
}

describe("parseIp and formatIp", () => {
  it("round-trips IPv4 and compressed IPv6", () => {
    for (const address of ["203.0.113.9", "0.0.0.0", "2001:db8::1", "2001:db8:0:1::", "::1", "2001:db8:1:2:3:4:5:6"]) {
      const parsed = parseIp(address);
      assert.ok(parsed, address);
      assert.equal(formatIp(parsed), address);
    }
  });

  it("treats IPv4-mapped IPv6 as IPv4 and strips zone ids", () => {
    assert.deepEqual(parseIp("::ffff:198.51.100.7"), parseIp("198.51.100.7"));
    assert.equal(parseIp("fe80::1%en0")?.version, 6);
  });

  it("rejects things that are not addresses", () => {
    for (const input of ["", "999.1.1.1", "example.com", "1.2.3", "2001:db8:::1", "<script>"]) {
      assert.equal(parseIp(input), null, input);
    }
  });
});

describe("CIDR and masking", () => {
  it("matches addresses inside a range only", () => {
    const range = parseCidr("203.0.113.0/24");
    assert.ok(range);
    assert.equal(cidrContains(range, parseIp("203.0.113.200")!), true);
    assert.equal(cidrContains(range, parseIp("203.0.114.1")!), false);
    const v6 = parseCidr("2001:db8:abcd::/48");
    assert.ok(v6);
    assert.equal(cidrContains(v6, parseIp("2001:db8:abcd:12::9")!), true);
    assert.equal(cidrContains(v6, parseIp("203.0.113.1")!), false);
  });

  it("masks IPv4 to /24 and IPv6 to /48", () => {
    assert.equal(maskIp(parseIp("203.0.113.77")!), "203.0.113.0/24");
    assert.equal(maskIp(parseIp("2001:db8:abcd:12:1:2:3:4")!), "2001:db8:abcd::/48");
  });
});

describe("clientIp behind Heroku and Cloudflare", () => {
  it("uses CF-Connecting-IP when the router's peer is a Cloudflare edge", () => {
    assert.deepEqual(
      resolved({ "x-forwarded-for": `198.51.100.23, ${CLOUDFLARE_EDGE}`, "cf-connecting-ip": "198.51.100.23" }),
      { ip: "198.51.100.23", viaCloudflare: true },
    );
  });

  it("supports IPv6 visitors through Cloudflare", () => {
    assert.deepEqual(
      resolved({ "x-forwarded-for": CLOUDFLARE_EDGE, "cf-connecting-ip": "2001:db8::abcd" }),
      { ip: "2001:db8::abcd", viaCloudflare: true },
    );
  });

  it("ignores a spoofed CF-Connecting-IP sent straight to the herokuapp.com host", () => {
    assert.deepEqual(
      resolved({ "x-forwarded-for": "203.0.113.50", "cf-connecting-ip": "192.0.2.1" }),
      { ip: "203.0.113.50", viaCloudflare: false },
    );
  });

  it("ignores client-supplied X-Forwarded-For entries left of the router's", () => {
    assert.deepEqual(
      resolved({ "x-forwarded-for": `${CLOUDFLARE_EDGE}, 192.0.2.99, 203.0.113.50`, "cf-connecting-ip": "192.0.2.1" }),
      { ip: "203.0.113.50", viaCloudflare: false },
    );
  });

  it("returns null for a garbage header rather than guessing", () => {
    assert.equal(resolved({ "x-forwarded-for": "not-an-ip" }), null);
    assert.equal(resolved({ "x-forwarded-for": CLOUDFLARE_EDGE, "cf-connecting-ip": "nope" }), null);
  });

  it("uses the socket address outside Heroku", () => {
    assert.deepEqual(resolved({ "x-forwarded-for": "192.0.2.1" }, "::ffff:127.0.0.1", false), {
      ip: "127.0.0.1",
      viaCloudflare: false,
    });
  });
});
