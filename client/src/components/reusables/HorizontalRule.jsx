import clsx from "clsx";
import { toTitleCase } from "../../helpers/toTitleCase";

import "./HorizontalRule.less";

export const HorizontalRule = ({ color = "red", className }) => {
  return (
    <div
      className={clsx(
        "HorizontalRule",
        `HorizontalRule--${toTitleCase(color)}`,
        className
      )}
    />
  );
};
