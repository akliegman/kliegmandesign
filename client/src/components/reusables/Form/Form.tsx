// @ts-nocheck
import clsx from "clsx";
import "./Form.less";

export const Form = ({
  children,
  className,
  onSubmit,
  testId = "form",
  ...rest
}) => {
  const classNames = clsx("Form", className);
  return (
    <form
      className={classNames}
      onSubmit={onSubmit}
      data-testid={testId}
      {...rest}
    >
      {children}
    </form>
  );
};
