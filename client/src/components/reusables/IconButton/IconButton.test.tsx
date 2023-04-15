// @ts-nocheck
import { render, screen } from "../../../setupTests";
import { IconButton } from "./IconButton";

describe("IconButton", () => {
  it("renders a link button when type is 'link'", () => {
    render(<IconButton type="link" to="/some-page" icon="A" />);
    const button = screen.getByTestId("icon-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/some-page");
  });

  it("renders a link button when type is 'external'", () => {
    render(<IconButton type="external" to="/some-page" icon="A" />);
    const button = screen.getByTestId("icon-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/some-page");
    expect(button).toHaveAttribute("target", "_blank");
  });

  it("renders a link button when type is 'download'", () => {
    render(<IconButton type="download" to="/some-page" icon="A" />);
    const button = screen.getByTestId("icon-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/some-page");
    expect(button).toHaveAttribute("download", "");
  });

  it("renders a button when type is 'button'", () => {
    render(<IconButton type="button" icon="A" />);
    const button = screen.getByTestId("icon-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders a submit button when type is 'submit'", () => {
    render(<IconButton type="submit" icon="A" />);
    const button = screen.getByTestId("icon-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });

  it("renders a disabled button when disabled is true", () => {
    render(<IconButton type="button" icon="A" disabled />);
    const button = screen.getByTestId("icon-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("disabled");
    expect(button).toHaveClass("IconButton--disabled");
  });

  it("renders a button with a custom class name", () => {
    render(<IconButton type="button" icon="A" className="custom-class" />);
    const button = screen.getByTestId("icon-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("custom-class");
  });

  it("renders a button with a custom data-testid", () => {
    render(<IconButton type="button" icon="A" testId="custom-test-id" />);
    const button = screen.getByTestId("custom-test-id");
    expect(button).toBeInTheDocument();
  });

  it("renders a button with a custom name", () => {
    render(<IconButton type="button" icon="A" name="custom-name" />);
    const button = screen.getByTestId("icon-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("name", "custom-name");
  });

  it("renders a button with an onClick handler that is called when clicked", () => {
    const onClick = jest.fn();
    render(<IconButton type="button" icon="A" onClick={onClick} />);
    const button = screen.getByTestId("icon-button");
    expect(button).toBeInTheDocument();
    button.click();
    expect(onClick).toHaveBeenCalled();
  });

  it("renders a button with custom class names depending on variant, size, activeClass, focusable, withShadow, and disabled", () => {
    const props = {
      variant: "primary",
      size: "large",
      activeClass: true,
      focusable: false,
      withShadow: true,
      disabled: true,
    };

    render(<IconButton type="button" icon="A" {...props} />);
    const button = screen.getByTestId("icon-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("IconButton--primary");
    expect(button).toHaveClass("IconButton--large");
    expect(button).toHaveClass("IconButton--active");
    expect(button).toHaveClass("IconButton--notFocusable");
    expect(button).toHaveClass("IconButton--withShadow");
    expect(button).toHaveClass("IconButton--disabled");
  });
});
