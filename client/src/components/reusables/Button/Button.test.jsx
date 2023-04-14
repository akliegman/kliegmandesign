import { render, screen } from "../../../setupTests";
import { Button } from "./Button";

describe("Button", () => {
  it("renders a link button when type is 'link'", () => {
    render(<Button type="link" to="/some-page" />);
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/some-page");
  });

  it("renders a link button when type is 'external'", () => {
    render(<Button type="external" to="/some-page" />);
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/some-page");
    expect(button).toHaveAttribute("target", "_blank");
  });

  it("renders a link button when type is 'download'", () => {
    render(<Button type="download" to="/some-page" />);
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/some-page");
    expect(button).toHaveAttribute("download", "");
  });

  it("renders a button when type is 'button'", () => {
    render(<Button type="button" />);
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders a submit button when type is 'submit'", () => {
    render(<Button type="submit" />);
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });

  it("renders a disabled button when disabled is true", () => {
    render(<Button type="button" disabled />);
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("disabled");
    expect(button).toHaveClass("Button--disabled");
  });

  it("renders a button with a custom class name", () => {
    render(<Button type="button" className="custom-class" />);
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("custom-class");
  });

  it("renders a button with an icon", () => {
    render(<Button type="button" icon="some-icon" />);
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("Button--withIcon-left");
    expect(button).toHaveTextContent("some-icon");
  });

  it("renders a button with a custom data-testid", () => {
    render(<Button type="button" testId="custom-test-id" />);
    const button = screen.getByTestId("custom-test-id");
    expect(button).toBeInTheDocument();
  });

  it("renders a button with a custom name", () => {
    render(<Button type="button" name="custom-name" />);
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("name", "custom-name");
  });

  it("renders a button with an onClick handler that is called when clicked", () => {
    const onClick = jest.fn();
    render(<Button type="button" onClick={onClick} />);
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    button.click();
    expect(onClick).toHaveBeenCalled();
  });

  it("renders a button with custom class names depending on variant, size, iconPosition, activeClass, focusable, withShadow, and disabled", () => {
    const props = {
      variant: "primary",
      size: "large",
      activeClass: true,
      icon: "A",
      iconPosition: "right",
      focusable: false,
      withShadow: true,
      disabled: true,
    };

    render(<Button type="button" {...props} />);
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("Button--primary");
    expect(button).toHaveClass("Button--large");
    expect(button).toHaveClass("Button--active");
    expect(button).toHaveClass("Button--notFocusable");
    expect(button).toHaveClass("Button--withShadow");
    expect(button).toHaveClass("Button--disabled");
  });
});
