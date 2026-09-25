import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseIp } from "./ip";
import { classifyNetwork, createAsnTableBuilder, lookupNetwork } from "./network";

describe("classifyNetwork", () => {
  it("labels shared networks by ASN and name", () => {
    assert.equal(classifyNetwork(7922, "COMCAST-7922"), "isp");
    assert.equal(classifyNetwork(22616, "ZSCALER-SJC1"), "security-proxy");
    assert.equal(classifyNetwork(21928, "T-MOBILE-AS21928"), "mobile");
    assert.equal(classifyNetwork(16509, "AMAZON-02"), "hosting");
    assert.equal(classifyNetwork(64501, "ACME CLOUD HOSTING LTD"), "hosting");
    assert.equal(classifyNetwork(64502, "EXAMPLE CORP"), "other");
    assert.equal(classifyNetwork(null, null), "unknown");
  });
});

describe("lookupNetwork", () => {
  const builder = createAsnTableBuilder();
  builder.add("198.51.100.0\t198.51.100.255\t7922\tUS\tCOMCAST-7922");
  builder.add("203.0.113.0\t203.0.113.127\t64500\tGB\tEXAMPLE-NET");
  builder.add("2001:db8::\t2001:db8:0:ffff:ffff:ffff:ffff:ffff\t64501\tDE\tEXAMPLE-V6");
  builder.add("not\ta\tvalid\tline");
  const table = builder.build();

  it("finds the range containing an address, for both families", () => {
    assert.deepEqual(lookupNetwork(table, parseIp("198.51.100.200")!), {
      asn: 7922,
      organization: "COMCAST-7922",
      registeredCountry: "US",
      type: "isp",
    });
    assert.equal(lookupNetwork(table, parseIp("2001:db8::42")!).asn, 64501);
    assert.equal(lookupNetwork(table, parseIp("2001:db8::42")!).registeredCountry, "DE");
  });

  it("returns unknown between and outside ranges", () => {
    assert.equal(lookupNetwork(table, parseIp("203.0.113.200")!).type, "unknown");
    assert.equal(lookupNetwork(table, parseIp("192.0.2.1")!).type, "unknown");
    assert.equal(lookupNetwork(null, parseIp("198.51.100.1")!).type, "unknown");
  });
});
