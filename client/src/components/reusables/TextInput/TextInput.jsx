import clsx from "clsx";
import "./TextInput.less";
import { MailFilled, KeyOutlined } from "@ant-design/icons";
import { useRef, useEffect } from "react";

export const TextInput = ({
  label,
  value,
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
  withIcon = false,
  testId = "text-input",
  ...rest
}) => {
  const classNames = clsx(
    "TextInput",
    `TextInput--${size}`,
    withIcon && "TextInput--withIcon",
    error && "TextInput--error",
    disabled && "TextInput--disabled",
    className
  );
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <div className={classNames}>
      {label && (
        <label className="TextInput__label" htmlFor={name}>
          {label}
        </label>
      )}
      {withIcon && (
        <div className="TextInput__icon">
          {type === "email" && <MailFilled />}
          {type === "password" && <KeyOutlined />}
        </div>
      )}
      <input
        className={clsx("TextInput__input", {
          "TextInput__input--error": error,
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
        data-testid={testId}
        {...rest}
      />
      {/* {error && <span className="TextInput__error">{error}</span>} */}
    </div>
  );
};
