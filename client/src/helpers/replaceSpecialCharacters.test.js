import { replaceSpecialCharacters } from "./replaceSpecialCharacters";

describe("replaceSpecialCharacters", () => {
  it("strips diacritics from accented characters", () => {
    expect(replaceSpecialCharacters("Résumé")).toBe("Resume");
  });

  it("leaves plain ascii unchanged", () => {
    expect(replaceSpecialCharacters("Projects")).toBe("Projects");
  });
});
