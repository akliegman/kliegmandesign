import { shallow, fireEvent, screen } from "../../../setupTests";
import { TextInput } from "./TextInput";

describe("TextInput", () => {
  it("renders label correctly", () => {
    const label = "Email";
    const onChange = jest.fn();

    shallow(<TextInput label={label} onChange={onChange} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("renders input value correctly", () => {
    const value = "test@test.com";
    const onChange = jest.fn();

    shallow(<TextInput value={value} onChange={onChange} />);
    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });

  it("calls onChange when input value changes", () => {
    const onChange = jest.fn();
    const value = "test@test.com";
    const newValue = "new@test.com";
    shallow(<TextInput value={value} onChange={onChange} />);
    const input = screen.getByDisplayValue(value);
    fireEvent.change(input, { target: { value: newValue } });
    expect(onChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it("renders placeholder text correctly", () => {
    const placeholder = "Enter your email";
    const onChange = jest.fn();

    shallow(<TextInput placeholder={placeholder} onChange={onChange} />);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it("renders input type correctly", () => {
    const type = "password";
    const onChange = jest.fn();

    shallow(<TextInput type={type} onChange={onChange} />);
    expect(screen.getByTestId("text-input")).toHaveAttribute("type", type);
  });

  it("renders error message correctly", () => {
    const name = "email";
    const onChange = jest.fn();
    const error = "Email is required";

    shallow(<TextInput error={error} name={name} onChange={onChange} />);
    expect(screen.getByTestId("text-input")).toHaveAttribute(
      "aria-describedby",
      `${name}-error`
    );
  });

  it("renders withIcon correctly", () => {
    const type = "email";
    const onChange = jest.fn();

    shallow(<TextInput withIcon={true} type={type} onChange={onChange} />);
    const icon = screen.getByRole("img");
    expect(icon).toBeInTheDocument();
  });
});
