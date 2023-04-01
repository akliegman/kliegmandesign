import clsx from "clsx";
import "./Form.less";

export const Form = ({ children, className, onSubmit, ...props }) => {
  const classNames = clsx("Form", className);
  return (
    <form className={classNames} onSubmit={onSubmit} {...props}>
      {children}
    </form>
  );
};
