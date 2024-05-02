import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextInput, Form } from "../reusables";
import { useAuth } from "../../context/AuthContext";
import { validateEmail } from "../../helpers/validateEmail";

import styles from "./LoginForm.module.less";

export const LoginForm = ({ user = "user" }) => {
  const location = useLocation();
  const { login, errors, clearError } = useAuth();
  const [pageMounted, setPageMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { from } = location.state || { from: { pathname: "/" } };
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 1) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError("loginError");
    setPasswordError("");
    setEmailError("");
    setRequestInProgress(true);

    setTimeout(() => {
      if (!validatePassword(password)) {
        setPasswordError("Please enter a password");
        setRequestInProgress(false);
        return;
      }

      if (email && !validateEmail(email)) {
        setEmailError("Please enter a valid email address");
        setRequestInProgress(false);
        return;
      }
    }, 0);

    try {
      const success = await login(user, password, email);

      if (success) {
        setRequestInProgress(false);
        return navigate(from.pathname, { replace: true });
      } else {
        setRequestInProgress(false);
        return false;
      }
    } catch (error) {
      setRequestInProgress(false);
      console.error(error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (errors && errors.length > 0) {
      errors.forEach((error) => {
        if (error.loginError) {
          setPasswordError(error.loginError);
        }
      });
    }
  }, [errors]);

  useEffect(() => {
    setPageMounted(true);
  }, []);

  return (
    <div className={styles.Form}>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <TextInput
          type="password"
          name="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => handlePasswordChange(e)}
          autoFocus={passwordError || pageMounted}
          required
          withIcon
          error={passwordError}
          disabled={requestInProgress}
        />
        {user === "user" && (
          <TextInput
            type="email"
            name="email"
            placeholder="Enter email (optional)"
            value={email}
            onChange={(e) => handleEmailChange(e)}
            withIcon
            error={emailError}
            autoFocus={emailError}
            disabled={requestInProgress}
          />
        )}

        <Button
          type="submit"
          disabled={requestInProgress}
          onClick={(e) => handleSubmit(e)}
          data-testid="login-button"
          className={styles.SubmitButton}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};
