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
import { useApi } from "../../contexts/ApiContext";
import "./Nav.less";

export const Nav = ({ location, matchProjectPath, linkOnClick, className }) => {
  const { isLoggedIn } = useApi();

  const iconMap = {
    resume: <FileTextFilled data-testid="resume-icon" />,
    projects: <CodeFilled data-testid="projects-icon" />,
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
    <nav className={clsx("Nav", className)} role="navigation" data-testid="nav">
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
          variant="navlink"
          focusable={false}
          onClick={linkOnClick}
          testId="navlink"
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
