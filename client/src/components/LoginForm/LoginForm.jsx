import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextInput, Form } from "../reusables";
import { useApi } from "../../contexts/ApiContext";
import { validateEmail } from "../../helpers/validateEmail";
import "./LoginForm.less";

export const LoginForm = ({ user = "user" }) => {
  const location = useLocation();
  const { login } = useApi();
  const [formErrors, setFormErrors] = useState({});
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { from } = location.state || { from: { pathname: "/" } };
  const navigate = useNavigate();

  const validateForm = (email, password) => {
    if (password.length < 1) {
      setFormErrors({ passwordError: "Password is required" });
      return false;
    }

    if (email.length > 0 && !validateEmail(email)) {
      setFormErrors({ emailError: "Invalid email address" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRequestInProgress(true);
    setFormErrors({});
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!validateForm(email, password)) {
      setRequestInProgress(false);
      return false;
    }

    const { success, message } = await login(user, password, email);

    if (success) {
      setRequestInProgress(false);
      return navigate(from.pathname, { replace: true });
    } else {
      setRequestInProgress(false);
      setFormErrors({ passwordError: message });
      return false;
    }
  };

  return (
    <div className="LoginForm">
      <Form className="LoginForm__form" onSubmit={(e) => handleSubmit(e)}>
        <TextInput
          type="password"
          name="password"
          placeholder="Enter password"
          autoFocus={formErrors?.passwordError}
          required
          withIcon
          error={formErrors?.passwordError}
          disabled={requestInProgress}
        />
        {user === "user" && (
          <TextInput
            type="email"
            name="email"
            placeholder="Enter email (optional)"
            withIcon
            error={formErrors?.emailError}
            autoFocus={formErrors?.emailError}
            disabled={requestInProgress}
          />
        )}

        <Button
          type="submit"
          disabled={requestInProgress}
          data-testid="login-button"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};
