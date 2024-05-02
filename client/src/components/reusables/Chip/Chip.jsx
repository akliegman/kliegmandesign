import clsx from "clsx";

import { toTitleCase } from "../../../helpers/toTitleCase";

import styles from "./Chip.module.less";

export const Chip = ({
  className,
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition,
  onClick,
}) => {
  const classNames = clsx(
    styles.Chip,
    styles[toTitleCase(size)],
    styles[toTitleCase(variant)],
    className
  );

  const handleOnClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div className={classNames} onClick={handleOnClick}>
      <span>
        {iconPosition === "left" && icon}
        {children}
        {iconPosition === "right" && icon}
      </span>
    </div>
  );
};
