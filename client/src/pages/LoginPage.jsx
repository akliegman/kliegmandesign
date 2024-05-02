import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LockFilled } from "@ant-design/icons";

import { useAuth } from "../context/AuthContext";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { PageHelmet } from "../components/PageHelmet/PageHelmet";

import styles from "./LoginPage.module.less";
import { Button } from "../components/reusables";

export const LoginPage = ({ user = "user" }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/projects" } };
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
      <div className={styles.Container}>
        <div className={styles.Main}>
          <LockFilled className={styles.Icon} />
          <h1>Log in</h1>
          {user === "admin" && <h2>Admin</h2>}
          <LoginForm user={user} />
          <p>Don't have a password? Contact me to get one.</p>
          <Button
            type="link"
            to="mailto:adam.j.kliegman@gmail.com"
            size="md"
            variant="primaryInverted"
          >
            Contact
          </Button>
        </div>
      </div>
    </>
  );
};
