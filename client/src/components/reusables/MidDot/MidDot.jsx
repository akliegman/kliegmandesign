import clsx from "clsx";
import "./MidDot.less";

export const MidDot = ({ color = "black" }) => {
  return (
    <span
      data-testid="middot"
      className={clsx("MidDot", `MidDot--${color.toLowerCase()}`)}
    />
  );
};
