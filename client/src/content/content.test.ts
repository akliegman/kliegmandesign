import { work } from "@/content/work";

describe("work content", () => {
  it("uses unique slugs", () => {
    const slugs = work.map((item) => item.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(work)("$slug has unique section anchors", ({ sections }) => {
    const ids = sections.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(work)("$slug describes every image", ({ cover, sections }) => {
    const media = [
      cover,
      ...sections.flatMap((section) => section.figures ?? []).map((f) => f.media),
    ];
    for (const item of media) {
      if (item.kind === "image") expect(item.alt.length).toBeGreaterThan(20);
      else expect(item.label.length).toBeGreaterThan(0);
    }
  });
});
