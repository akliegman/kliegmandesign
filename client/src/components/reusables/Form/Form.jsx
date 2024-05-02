import clsx from "clsx";

import styles from "./Form.module.less";

export const Form = ({
  children,
  className,
  onSubmit,
  testId = "form",
  ...rest
}) => {
  return (
    <form
      className={clsx(styles.Form, className)}
      onSubmit={onSubmit}
      data-testid={testId}
      {...rest}
    >
      {children}
    </form>
  );
};
