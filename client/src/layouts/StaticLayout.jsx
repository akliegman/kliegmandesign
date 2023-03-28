import "./StaticLayout.less";
import { Footer } from "../components/Footer/Footer";
import clsx from "clsx";

export const StaticLayout = ({ className, children }) => {
  return (
    <>
      <div className={clsx("StaticLayout", className)}>
        <div className="StaticLayout__Content">{children}</div>
      </div>
      <Footer className="StaticLayout__Footer" />
    </>
  );
};
