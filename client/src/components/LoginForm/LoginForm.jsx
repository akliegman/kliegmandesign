import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextInput, Form } from "../reusables";
import { useAuth } from "../../context/AuthContext";
import { validateEmail } from "../../helpers/validateEmail";
import "./LoginForm.less";

export const LoginForm = () => {
  const location = useLocation();
  const { login, errors, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
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
    setPasswordError(null);
    setEmailError(null);

    if (!validatePassword(password)) {
      setPasswordError("Please enter a password");
      return;
    }

    if (email && !validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    try {
      const success = await login("user", password, email);

      if (success) {
        return navigate(from.pathname, { replace: true });
      } else {
        return false;
      }
    } catch (error) {
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

  return (
    <div className="LoginForm">
      <h1>Log In</h1>

      <Form className="LoginForm__Form" onSubmit={(e) => handleSubmit(e)}>
        <TextInput
          type="password"
          name="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => handlePasswordChange(e)}
          autoFocus={passwordError}
          required
          withIcon
          error={passwordError}
        />

        <TextInput
          type="email"
          name="email"
          placeholder="Enter email (optional)"
          value={email}
          onChange={(e) => handleEmailChange(e)}
          withIcon
          error={emailError}
          autoFocus={emailError}
        />

        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
