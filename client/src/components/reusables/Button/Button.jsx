import { Link, NavLink } from "react-router-dom";
import "./Button.less";
import PropTypes from "prop-types";
import clsx from "clsx";
import { toTitleCase } from "../../../helpers/toTitleCase";

export const Button = ({
  children,
  icon,
  iconPosition = "left",
  type = "link",
  name,
  to,
  size = "md",
  variant = "primary",
  focusable = true,
  withShadow = false,
  onClick,
  disabled = false,
  className,
}) => {
  const classNames = clsx(
    "Button",
    `Button--${toTitleCase(size)}`,
    `Button--${toTitleCase(variant)}`,
    icon && iconPosition === "left" && "Button--WithIcon--Left",
    icon && iconPosition === "right" && "Button--WithIcon--Right",
    focusable === false && "Button--NotFocusable",
    withShadow && "IconButton--WithShadow",
    disabled === true && "Button--Disabled",
    className
  );

  const handleOnClick = (event) => {
    if (disabled) {
      event.preventDefault();
    }
    if (onClick && !disabled) {
      onClick(event);
    }
  };

  const buttonContent = (
    <>
      {iconPosition === "left" && icon}
      {children}
      {iconPosition === "right" && icon}
    </>
  );

  return (
    <>
      {type === "link" && (
        <Link
          to={to}
          name={name}
          className={classNames}
          onClick={(e) => handleOnClick(e)}
          disabled={disabled}
        >
          {buttonContent}
        </Link>
      )}
      {type === "navlink" && (
        <NavLink
          to={to}
          name={name}
          className={classNames}
          onClick={(e) => handleOnClick(e)}
          disabled={disabled}
        >
          {buttonContent}
        </NavLink>
      )}
      {type === "external" && (
        <a
          href={to}
          name={name}
          className={classNames}
          onClick={(e) => handleOnClick(e)}
          disabled={disabled}
          target="_blank"
          rel="noreferrer"
        >
          {buttonContent}
        </a>
      )}
      {type === "download" && (
        <a
          href={to}
          name={name}
          className={classNames}
          onClick={(e) => handleOnClick(e)}
          disabled={disabled}
          download
        >
          {buttonContent}
        </a>
      )}
      {type === "button" && (
        <button
          name={name}
          className={classNames}
          onClick={(e) => handleOnClick(e)}
          disabled={disabled}
        >
          {buttonContent}
        </button>
      )}
      {type === "submit" && (
        <button
          type="submit"
          name={name}
          className={classNames}
          onClick={(e) => handleOnClick(e)}
          disabled={disabled}
        >
          {buttonContent}
        </button>
      )}
    </>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.element,
  type: PropTypes.string,
  to: PropTypes.string,
  name: PropTypes.string,
  shape: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
};
