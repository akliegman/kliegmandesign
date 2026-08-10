import { toTitleCase } from "./toTitleCase";

describe("toTitleCase", () => {
  it("capitalizes the first letter of each word", () => {
    expect(toTitleCase("hello world")).toBe("Hello World");
  });

  it("leaves already-capitalized words intact", () => {
    expect(toTitleCase("Design Systems")).toBe("Design Systems");
  });

  it("handles a single word", () => {
    expect(toTitleCase("primary")).toBe("Primary");
  });
});
