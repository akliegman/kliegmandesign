import { Link, NavLink } from "react-router-dom";
import "./Button.less";
import PropTypes from "prop-types";
import clsx from "clsx";

export const Button = ({
  children,
  icon,
  iconPosition = "left",
  type = "button",
  name,
  to,
  size = "md",
  variant = "primary",
  focusable = true,
  withShadow = false,
  onClick,
  activeClass,
  disabled = false,
  className,
  ...rest
}) => {
  const classNames = clsx(
    "Button",
    `Button--${size.toLowerCase()}`,
    `Button--${variant.toLowerCase()}`,
    icon && iconPosition === "left" && "Button--withIcon-left",
    icon && iconPosition === "right" && "Button--withIcon-right",
    focusable === false && "Button--notFocusable",
    withShadow && "IconButton--withShadow",
    disabled === true && "Button--disabled",
    activeClass === true && "Button--active",
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
          {...rest}
        >
          {buttonContent}
        </Link>
      )}
      {type === "navlink" && (
        <NavLink
          to={to}
          name={name}
          className={({ isActive, isPending }) =>
            clsx(classNames, (isActive || isPending) && "Button--active")
          }
          onClick={(e) => handleOnClick(e)}
          disabled={disabled}
          {...rest}
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
          {...rest}
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
          {...rest}
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
          {...rest}
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
          {...rest}
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
