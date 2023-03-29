import { useState, useEffect } from "react";
import { Button } from "../reusables";
import { useAuth } from "../../context/AuthContext";

export const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login("user", password, email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="LoginForm">
      <form>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => handleEmailChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => handlePasswordChange(e)}
        />
        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
      </form>
    </div>
  );
};
