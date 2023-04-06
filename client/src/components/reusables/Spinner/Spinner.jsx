import { LoadingOutlined } from "@ant-design/icons";
import clsx from "clsx";
import "./Spinner.less";

export const Spinner = ({ type, ...rest }) => {
  const classNames = clsx("Spinner", {
    "Spinner--app": type === "app",
    "Spinner--page": type === "page",
  });
  return (
    <div className={classNames} {...rest}>
      {type === "app" && <LoadingOutlined />}
    </div>
  );
};
