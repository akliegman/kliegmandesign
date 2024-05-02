import { MailFilled, KeyOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useRef, useEffect } from "react";

import styles from "./TextInput.module.less";

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
  withIcon = false,
  testId = "text-input",
  ...rest
}) => {
  const classNames = clsx(
    styles.TextInput,
    withIcon && styles.withIcon,
    error && styles.Error,
    disabled && styles.Disabled,
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
        <label className={styles.Label} htmlFor={name}>
          {label}
        </label>
      )}
      {withIcon && (
        <div className={styles.Icon}>
          {type === "email" && <MailFilled />}
          {type === "password" && <KeyOutlined />}
        </div>
      )}
      <input
        className={styles.Input}
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
        invalid={error ? "true" : "false"}
        data-testid={testId}
        {...rest}
      />
    </div>
  );
};
