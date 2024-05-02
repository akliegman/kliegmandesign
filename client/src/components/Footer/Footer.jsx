import { GithubOutlined, LinkedinFilled } from "@ant-design/icons";
import clsx from "clsx";
import { Link } from "react-router-dom";

import { IconButton } from "../reusables";
import { useAuth } from "../../context/AuthContext";

import styles from "./Footer.module.less";

export const Footer = ({ className }) => {
  const { session } = useAuth();
  const currentYear = new Date().getFullYear();

  const social = [
    {
      name: "LinkedIn",
      icon: <LinkedinFilled />,
      link: "https://www.linkedin.com/in/adamkliegman/",
    },
    {
      name: "GitHub",
      icon: <GithubOutlined />,
      link: "https://github.com/akliegman/",
    },
  ];

  return (
    <footer className={clsx(styles.Footer, className)} data-testid="footer">
      <div className={styles.Content}>
        <span className={styles.Copyright}>
          © {currentYear} Adam Kliegman. All rights reserved.
        </span>
        <div className={styles.Legal}>
          {session && (
            <>
              <span>
                Logged in {session?.user?.email && `as ${session?.user?.email}`}
              </span>
            </>
          )}
          <Link className={styles.Link} to="/terms-of-use">
            Terms of Use
          </Link>
          <Link className={styles.Link} to="/privacy-policy">
            Privacy Policy
          </Link>
          {social.map((item) => (
            <IconButton
              key={item.name}
              type="external"
              to={item.link}
              variant="simple"
              size="xs"
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};
