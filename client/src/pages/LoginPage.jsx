import { StaticLayout } from "../layouts/StaticLayout";
import { LockFilled } from "@ant-design/icons";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export const LoginPage = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <StaticLayout className="LoginPage" alignItems="center">
      <LockFilled />
      <LoginForm />
    </StaticLayout>
  );
};
