import { useEffect } from "react";
import { useApi } from "../contexts/ApiContext";
import { Navigate } from "react-router-dom";
import { useMountPage } from "../hooks/useMountPage";

export const LogoutPage = () => {
  useMountPage();
  const { logout } = useApi();

  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate to="/" />;
};
