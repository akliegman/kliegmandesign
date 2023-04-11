import { Link } from "react-router-dom";
import "./IconButton.less";
import PropTypes from "prop-types";
import clsx from "clsx";

export const IconButton = ({
  icon,
  type = "link",
  name,
  to,
  active = false,
  size = "md",
  variant = "",
  focusable = true,
  withShadow = false,
  onClick,
  disabled = false,
  className,
  ...rest
}) => {
  const classNames = clsx(
    "IconButton",
    `IconButton--${size.toLowerCase()}`,
    `IconButton--${variant.toLowerCase()}`,
    active && "IconButton--active",
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
          {...rest}
        >
          {icon}
        </a>
      )}
      {type === "button" && (
        <button
          name={name}
          className={classNames}
          onClick={(e) => handleOnClick(e)}
          disabled={disabled}
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
          {...rest}
        >
          {icon}
        </button>
      )}
    </>
  );
};

IconButton.propTypes = {
  icon: PropTypes.element.isRequired,
  type: PropTypes.string,
  to: PropTypes.string,
  name: PropTypes.string,
  shape: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
};
