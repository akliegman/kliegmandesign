// @ts-nocheck
import "./StaticLayout.less";
import { toTitleCase } from "../helpers/toTitleCase";
import clsx from "clsx";

export const StaticLayout = ({ alignItems = "left", className, children }) => {
  return (
    <>
      <div
        className={clsx(
          "StaticLayout",
          `StaticLayout--alignItems${toTitleCase(alignItems)}`,
          className
        )}
      >
        <div className="StaticLayout__content">{children}</div>
      </div>
    </>
  );
};
