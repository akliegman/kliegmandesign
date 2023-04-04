import "./MainLayout.less";
import { toTitleCase } from "../helpers/toTitleCase";
import clsx from "clsx";

export const MainLayout = ({ alignItems = "left", className, children }) => {
  return (
    <>
      <div
        className={clsx(
          "MainLayout",
          `MainLayout--AlignItems${toTitleCase(alignItems)}`,
          className
        )}
      >
        <div className="MainLayout__Content">{children}</div>
      </div>
    </>
  );
};
