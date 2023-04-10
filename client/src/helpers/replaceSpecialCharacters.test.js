import { replaceSpecialCharacters } from "./replaceSpecialCharacters";

describe("replaceSpecialCharacters", () => {
  it("should replace special characters with their non-accented equivalents", () => {
    const input = "Mötorhëäd";
    const expectedOutput = "Motorhead";
    expect(replaceSpecialCharacters(input)).toEqual(expectedOutput);
  });

  it("should return an empty string when passed an empty string", () => {
    const input = "";
    const expectedOutput = "";
    expect(replaceSpecialCharacters(input)).toEqual(expectedOutput);
  });

  it("should return the input string when it contains no special characters", () => {
    const input = "abcdefg";
    const expectedOutput = "abcdefg";
    expect(replaceSpecialCharacters(input)).toEqual(expectedOutput);
  });
});
