import { LoadingOutlined } from "@ant-design/icons";
import clsx from "clsx";
import "./Spinner.less";

export const Spinner = ({ type = "app", ...rest }) => {
  const classNames = clsx("Spinner", {
    "Spinner--app": type === "app",
    "Spinner--page": type === "page",
  });
  return (
    <div className={classNames} data-testid={`${type}-spinner`} {...rest}>
      {type === "app" && <LoadingOutlined data-testid="spinner-loading-icon" />}
    </div>
  );
};
