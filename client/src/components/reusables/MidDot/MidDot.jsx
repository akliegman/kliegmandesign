import clsx from "clsx";
import { toTitleCase } from "../../../helpers/toTitleCase";

import "./MidDot.less";

export const MidDot = ({ color = "black" }) => {
  return <span className={clsx("MidDot", `MidDot--${toTitleCase(color)}`)} />;
};
