import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useMountPage } from "../hooks/useMountPage";

export const LogoutPage = () => {
  useMountPage();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate to="/" />;
};
