import { Link } from "react-router-dom";
import "./IconButton.less";
import clsx from "clsx";

export const IconButton = ({
  icon,
  type = "link",
  name,
  to,
  activeClass = false,
  size = "md",
  variant = "",
  focusable = true,
  withShadow = false,
  onClick,
  disabled = false,
  className,
  testId = "icon-button",
  ...rest
}) => {
  const classNames = clsx(
    "IconButton",
    `IconButton--${size.toLowerCase()}`,
    `IconButton--${variant.toLowerCase()}`,
    activeClass && "IconButton--active",
    focusable === false && "IconButton--notFocusable",
    withShadow && "IconButton--withShadow",
    disabled === true && "IconButton--disabled",
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
          {icon}
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
          {icon}
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
          {icon}
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
          {icon}
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
          {icon}
        </button>
      )}
    </>
  );
};
