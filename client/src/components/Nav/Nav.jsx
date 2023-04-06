import { Button } from "../reusables";
import {
  FileTextFilled,
  CodeFilled,
  ExperimentFilled,
  LockFilled,
} from "@ant-design/icons";
import clsx from "clsx";
import { routes } from "../../routes";
import { replaceSpecialCharacters } from "../../helpers/replaceSpecialCharacters";
import { useAuth } from "../../context/AuthContext";
import "./Nav.less";

export const Nav = ({ location, matchProjectPath, linkOnClick, className }) => {
  const { isLoggedIn } = useAuth();

  const iconMap = {
    resume: <FileTextFilled />,
    projects: <CodeFilled />,
    sandbox: <ExperimentFilled />,
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
    <nav className={clsx("Nav", className)}>
      {navData.map((item) => (
        <Button
          key={item.label}
          icon={item.protected && !isLoggedIn ? <LockFilled /> : item.icon}
          to={item.link}
          type="navlink"
          variant="navlink"
          focusable={false}
          onClick={linkOnClick}
          activeClass={
            (item.label === "Projects" &&
              matchProjectPath?.pathname?.length > 0) ||
            location.pathname === item.link
          }
        >
          {item.label}
        </Button>
      ))}
    </nav>
  );
};
