import { toTitleCase } from "./toTitleCase";

describe("toTitleCase", () => {
  it("should capitalize the first letter of each word", () => {
    const input = "hello world";
    const output = "Hello World";
    expect(toTitleCase(input)).toEqual(output);
  });

  it("should handle single-letter words", () => {
    const input = "a b c";
    const output = "A B C";
    expect(toTitleCase(input)).toEqual(output);
  });

  it("should return an empty string for empty input", () => {
    const input = "";
    const output = "";
    expect(toTitleCase(input)).toEqual(output);
  });
});
