import { useState, useEffect } from "react";
import clsx from "clsx";
import "./TextInput.less";
import { MailFilled, KeyOutlined } from "@ant-design/icons";

export const TextInput = ({
  label,
  value = "",
  onChange,
  placeholder,
  type = "text",
  name,
  className,
  disabled,
  required,
  error,
  size = "md",
  onBlur,
  onFocus,
  autoComplete,
  autoFocus,
  inputRef,
  withIcon = false,
  ...rest
}) => {
  const classNames = clsx(
    "TextInput",
    `TextInput--${size}`,
    withIcon && "TextInput--WithIcon",
    className
  );

  return (
    <div className={classNames}>
      {label && (
        <label className="TextInput__Label" htmlFor={name}>
          {label}
        </label>
      )}
      {withIcon && (
        <div className="TextInput__Icon">
          {type === "email" && <MailFilled />}
          {type === "password" && <KeyOutlined />}
        </div>
      )}
      <input
        className={clsx("TextInput__Input", {
          "TextInput__Input--Error": error,
        })}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onBlur={onBlur}
        onFocus={onFocus}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        ref={inputRef}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${name}-error` : undefined}
        invalid={error ? "true" : "false"}
        {...rest}
      />
      {error && <span className="TextInput__Error">{error}</span>}
    </div>
  );
};
