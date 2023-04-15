// @ts-nocheck
import { screen, shallow, fireEvent } from "../../../setupTests";
import { Form } from "./Form";

describe("Form", () => {
  it("should render the form element with the provided class name and children", () => {
    const className = "test-form";
    const childText = "Test Child";
    shallow(
      <Form className={className}>
        <div>{childText}</div>
      </Form>
    );
    const formElement = screen.getByTestId("form");
    const childElement = screen.getByText(childText);
    expect(formElement).toHaveClass(className);
    expect(childElement).toBeInTheDocument();
  });

  it("should call the onSubmit function when the form is submitted", () => {
    const onSubmit = jest.fn();
    shallow(<Form onSubmit={onSubmit} />);
    const formElement = screen.getByTestId("form");
    fireEvent.submit(formElement);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
