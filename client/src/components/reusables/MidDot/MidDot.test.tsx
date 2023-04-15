// @ts-nocheck
import { render, screen } from "../../../setupTests";
import { MidDot } from "./MidDot";

describe("MidDot", () => {
  it("should render with default props", () => {
    render(<MidDot />);
    expect(screen.getByTestId("middot")).toHaveClass("MidDot");
    expect(screen.getByTestId("middot")).toHaveClass("MidDot--black");
  });

  it("should render with custom props", () => {
    render(<MidDot color="red" />);
    expect(screen.getByTestId("middot")).toHaveClass("MidDot");
    expect(screen.getByTestId("middot")).toHaveClass("MidDot--red");
  });
});
