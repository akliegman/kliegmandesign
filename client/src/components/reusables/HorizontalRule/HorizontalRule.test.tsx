// @ts-nocheck
import { render, screen } from "../../../setupTests";
import { HorizontalRule } from "./HorizontalRule";

describe("HorizontalRule", () => {
  it("should render with default props", () => {
    render(<HorizontalRule />);

    const horizontalRule = screen.getByTestId("horizontal-rule");

    expect(horizontalRule).toHaveClass("HorizontalRule");
    expect(horizontalRule).toHaveClass("HorizontalRule--fullWidth");
    expect(horizontalRule).toHaveClass("HorizontalRule--red");
  });

  it("should render with custom props", () => {
    render(
      <HorizontalRule color="blue" type="dotted" className="custom-class" />
    );

    const horizontalRule = screen.getByTestId("horizontal-rule");

    expect(horizontalRule).toHaveClass("HorizontalRule");
    expect(horizontalRule).toHaveClass("HorizontalRule--dotted");
    expect(horizontalRule).toHaveClass("HorizontalRule--blue");
    expect(horizontalRule).toHaveClass("custom-class");
  });
});
