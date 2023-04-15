// @ts-nocheck
import { shallow, screen } from "../../../setupTests";
import { TextBlock } from "./TextBlock";

describe("TextBlock", () => {
  it("should render with children", () => {
    const mockText = "Hello World!";
    shallow(<TextBlock>{mockText}</TextBlock>);
    expect(screen.getByText(mockText)).toBeInTheDocument();
    expect(screen.getByTestId("text-block")).toHaveClass("TextBlock");
  });
});
