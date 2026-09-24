import { readFileSync } from "node:fs";

import { contrastRatio } from "@/lib/color";
import { CONTRAST_PAIRS, readColorTokens, tokenRgb } from "@/lib/tokens";

// Vitest does not process CSS, so the `?raw` import the app uses is empty here; read the file.
const tokens = readColorTokens(readFileSync("src/styles/globals.css", "utf8"));

describe("theme tokens", () => {
  it("defines every shadcn role the components use, in both themes", () => {
    const names = tokens.map((token) => token.name);
    for (const role of [
      "background",
      "foreground",
      "card",
      "primary",
      "muted",
      "border",
      "input",
      "ring",
    ]) {
      expect(names).toContain(role);
    }
  });

  describe.each(["light", "dark"] as const)("%s theme", (theme) => {
    it.each(CONTRAST_PAIRS)("$use meets $minimum:1", ({ foreground, background, minimum }) => {
      const ratio = contrastRatio(
        tokenRgb(tokens, foreground, theme),
        tokenRgb(tokens, background, theme),
      );
      expect(ratio).toBeGreaterThanOrEqual(minimum);
    });
  });
});
