import clsx from "clsx";
import "./HorizontalRule.less";

export const HorizontalRule = ({
  color = "red",
  type = "fullWidth",
  className,
}) => {
  return (
    <div
      className={clsx(
        "HorizontalRule",
        `HorizontalRule--${type}`,
        `HorizontalRule--${color.toLowerCase()}`,
        className
      )}
    />
  );
};
