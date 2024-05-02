import clsx from "clsx";
import { Link } from "react-router-dom";

import { toTitleCase } from "../../../helpers/toTitleCase";

import styles from "./IconButton.module.less";

export const IconButton = ({
  icon,
  type = "link",
  name,
  to,
  activeClass = false,
  size = "md",
  variant = "primary",
  focusable = true,
  withShadow = false,
  onClick,
  disabled = false,
  className,
  testId = "icon-button",
  ...rest
}) => {
  const classNames = clsx(
    styles.IconButton,
    styles[toTitleCase(size)],
    styles[toTitleCase(variant)],
    focusable === false && styles.NotFocusable,
    disabled === true && styles.Disabled,
    activeClass === true && styles.Active,
    className
  );

  const handleOnClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <>
      {type === "link" && (
        <Link
          to={to}
          name={name}
          className={classNames}
          onClick={(e) => handleOnClick(e)}
          disabled={disabled}
          data-testid={testId}
          {...rest}
        >
          <span>{icon}</span>
        </Link>
      )}
      {type === "external" && (
        <a
          href={to}
          name={name}
          className={classNames}
          onClick={(e) => handleOnClick(e)}
          target="_blank"
          rel="noreferrer"
          disabled={disabled}
          data-testid={testId}
          {...rest}
        >
          <span>{icon}</span>
        </a>
      )}
      {type === "anchor" && (
        <a
          href={to}
          name={name}
          className={classNames}
          onClick={(e) => handleOnClick(e)}
          disabled={disabled}
          data-testid={testId}
          {...rest}
        >
          <span>{icon}</span>
        </a>
      )}
      {type === "download" && (
        <a
          href={to}
          name={name}
          className={classNames}
          onClick={(e) => handleOnClick(e)}
          download
          disabled={disabled}
          data-testid={testId}
          {...rest}
        >
          <span>{icon}</span>
        </a>
      )}
      {type === "button" && (
        <button
          name={name}
          type="button"
          className={classNames}
          onClick={(e) => handleOnClick(e)}
          disabled={disabled}
          data-testid={testId}
          {...rest}
        >
          <span>{icon}</span>
        </button>
      )}
      {type === "submit" && (
        <button
          type="submit"
          name={name}
          className={classNames}
          onClick={(e) => handleOnClick(e)}
          disabled={disabled}
          data-testid={testId}
          {...rest}
        >
          <span>{icon}</span>
        </button>
      )}
    </>
  );
};
