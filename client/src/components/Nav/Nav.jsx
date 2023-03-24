import { IconButton } from "../reusables/IconButton/IconButton";
import {
  CaretDownFilled,
  CaretUpFilled,
  HomeFilled,
  FileTextFilled,
} from "@ant-design/icons";
import { useState } from "react";
import clsx from "clsx";
import { HorizontalRule } from "../reusables/HorizontalRule";
import "./Nav.less";

export const Nav = ({ location }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = (event) => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navClassNames = clsx(
    "Nav",
    isMenuOpen && "Nav--MenuOpen",
    !isMenuOpen && "Nav--MenuClosed"
  );

  return (
    <nav className={navClassNames}>
      <div className="Nav__List">
        <IconButton
          icon={<HomeFilled />}
          to="/"
          active={location.pathname === "/"}
          type="link"
          variant="nav"
          focusable={false}
        />
        <IconButton
          icon={<FileTextFilled />}
          to="/resume"
          active={location.pathname === "/resume"}
          type="link"
          variant="nav"
          focusable={false}
        />
        <HorizontalRule className="Nav__Hr" color="gray-300" />
      </div>

      <div className="Nav__menu">
        <IconButton
          icon={isMenuOpen ? <CaretUpFilled /> : <CaretDownFilled />}
          onClick={(e) => handleMenuClick(e)}
          variant="transparent"
          type="button"
          focusable={false}
        />
      </div>
    </nav>
  );
};
