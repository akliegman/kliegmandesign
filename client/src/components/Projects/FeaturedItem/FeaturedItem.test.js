import { render, screen } from "@testing-library/react";
import { FeaturedItem } from "./FeaturedItem";

const data = {
  company: "MagicSchool AI",
  title: "Spellbook Design System",
  summary: "The design system powering MagicSchool AI.",
  stack: { frameworks: ["React", "TypeScript"] },
};

describe("FeaturedItem", () => {
  it("renders the title, company, and summary", () => {
    render(<FeaturedItem data={data} />);
    expect(screen.getByText("Spellbook Design System")).toBeInTheDocument();
    expect(screen.getByText("MagicSchool AI")).toBeInTheDocument();
    expect(
      screen.getByText("The design system powering MagicSchool AI."),
    ).toBeInTheDocument();
  });

  it("shows a coming-soon pill and does not link out", () => {
    const { container } = render(<FeaturedItem data={data} />);
    expect(screen.getByText("Details coming soon")).toBeInTheDocument();
    expect(container.querySelector("a")).toBeNull();
  });

  it("renders each framework in the stack", () => {
    render(<FeaturedItem data={data} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });
});
