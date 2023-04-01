import { StaticLayout } from "../layouts/StaticLayout";
import { LockFilled } from "@ant-design/icons";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PageHelmet } from "../components/PageHelmet/PageHelmet";

export const LoginPage = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(from.pathname, { replace: true });
    }
  }, [isLoggedIn, navigate, from.pathname]);

  return (
    <>
      <PageHelmet title="Log In">
        <meta name="theme-color" content="#ccc" />
      </PageHelmet>
      <StaticLayout className="LoginPage" alignItems="center">
        <LockFilled />
        <LoginForm />
      </StaticLayout>
    </>
  );
};
