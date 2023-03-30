import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Button, TextInput } from "../reusables";
import { useAuth } from "../../context/AuthContext";

export const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login("user", password, email);
    if (success) {
      // return to page you were trying to access
      return <Navigate to={from} />;
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="LoginForm">
      <form className="LoginForm__Form">
        <TextInput
          type="email"
          name="email"
          placeholder="Please provide your email"
          value={email}
          onChange={(e) => handleEmailChange(e)}
          withIcon
        />
        <TextInput
          type="password"
          name="password"
          value={password}
          placeholder="Enter the secret password"
          onChange={(e) => handlePasswordChange(e)}
          withIcon
        />
        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
      </form>
    </div>
  );
};
