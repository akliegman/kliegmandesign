import { StaticLayout } from "../layouts/StaticLayout";
import { LockFilled } from "@ant-design/icons";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const LoginPage = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(from.pathname, { replace: true });
    }
  }, [isLoggedIn]);

  return (
    <StaticLayout className="LoginPage" alignItems="center">
      <LockFilled />
      <LoginForm />
    </StaticLayout>
  );
};
