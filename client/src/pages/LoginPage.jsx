import { MainLayout } from "../layouts/MainLayout";
import { LockFilled } from "@ant-design/icons";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PageHelmet } from "../components/PageHelmet/PageHelmet";

export const LoginPage = ({ user = "user" }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(from.pathname, { replace: true });
    }
  }, [isLoggedIn, navigate, from.pathname]);

  const title = user === "admin" ? "Admin Login" : "Log In";

  return (
    <>
      <PageHelmet title={title} />
      <MainLayout className="LoginPage" alignItems="center">
        <LockFilled />
        {user === "admin" && <h2>Admin</h2>}
        <LoginForm user={user} />
      </MainLayout>
    </>
  );
};
