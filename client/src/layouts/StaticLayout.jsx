import "./StaticLayout.less";
import { Footer } from "../components/Footer/Footer";
import { toTitleCase } from "../helpers/toTitleCase";
import clsx from "clsx";

export const StaticLayout = ({ alignItems = "left", className, children }) => {
  return (
    <>
      <div
        className={clsx(
          "StaticLayout",
          `StaticLayout--AlignItems${toTitleCase(alignItems)}`,
          className
        )}
      >
        <div className="StaticLayout__Content">{children}</div>
      </div>
    </>
  );
};
