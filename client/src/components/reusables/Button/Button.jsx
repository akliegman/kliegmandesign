import { Link } from "react-router-dom";
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
  onClick,
  className,
}) => {
  const classNames = clsx(
    "Button",
    `Button--${toTitleCase(size)}`,
    `Button--${toTitleCase(variant)}`,
    icon && iconPosition === "left" && "Button--WithIcon--Left",
    icon && iconPosition === "right" && "Button--WithIcon--Right",
    focusable === false && "Button--NotFocusable",
    className
  );

  const handleOnClick = (event) => {
    if (onClick) {
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
        >
          {buttonContent}
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
