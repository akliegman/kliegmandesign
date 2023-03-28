import { Button } from "../reusables";
import { FileTextFilled, LockFilled } from "@ant-design/icons";
import clsx from "clsx";
import "./Nav.less";
import { navData } from "../../data/navData";

export const Nav = ({ location, linkOnClick, className }) => {
  return (
    <nav className={clsx("Nav", className)}>
      {navData.map((item) => {
        let iconMap = {
          resume: <FileTextFilled />,
        };

        return (
          <Button
            key={item.name}
            icon={item.disabled ? <LockFilled /> : iconMap[item.name]}
            to={item.link}
            active={location.pathname === item.link}
            type="navlink"
            variant="navlink"
            focusable={false}
            disabled={item.disabled}
            onClick={linkOnClick}
          >
            {item.label}
          </Button>
        );
      })}
    </nav>
  );
};
