import {
  ArrowRightOutlined,
  FileTextFilled,
  ExperimentFilled,
  LockFilled,
} from "@ant-design/icons";
import clsx from "clsx";

import { Button } from "../reusables";
import { routes } from "../../routes";
import { replaceSpecialCharacters } from "../../helpers/replaceSpecialCharacters";
import { useAuth } from "../../context/AuthContext";

import styles from "./Nav.module.less";

export const Nav = ({
  buttonVariant = "navLink",
  linkOnClick,
  linkOnTouchEnd,
  className,
  tabbable = true,
}) => {
  const { isLoggedIn } = useAuth();

  const iconMap = {
    resume: <FileTextFilled data-testid="resume-icon" />,
    projects: <ExperimentFilled data-testid="projects-icon" />,
    sandbox: <ExperimentFilled data-testid="sandbox-icon" />,
  };

  const navData = Object.entries(routes)
    .map(([path, item]) => ({
      label: item.name,
      order: item.navOrder,
      link: path,
      protected: item.protected,
      icon: iconMap[replaceSpecialCharacters(item.name.toLowerCase())],
    }))
    .filter((item) => item.order !== undefined)
    .sort((a, b) => a.order - b.order);

  return (
    <nav
      className={clsx(styles.Nav, className)}
      role="navigation"
      data-testid="nav"
    >
      {navData.map((item) => (
        <Button
          key={item.label}
          icon={
            item.protected && !isLoggedIn ? (
              <LockFilled data-testid="locked-icon" />
            ) : (
              item.icon
            )
          }
          to={item.link}
          type="navlink"
          variant={buttonVariant}
          onClick={linkOnClick}
          onTouchEnd={linkOnTouchEnd}
          testId="navlink"
          tabIndex={tabbable ? 0 : -1}
        >
          <span>{item.label}</span>
          <ArrowRightOutlined />
        </Button>
      ))}
    </nav>
  );
};
