import clsx from "clsx";
import "./HorizontalRule.less";

export const HorizontalRule = ({ color = "red", className }) => {
  return (
    <div
      className={clsx(
        "HorizontalRule",
        `HorizontalRule--${color.toLowerCase()}`,
        className
      )}
    />
  );
};
