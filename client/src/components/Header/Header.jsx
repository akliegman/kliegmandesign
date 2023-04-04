import { Nav } from "../Nav/Nav";
import { IconButton, Button } from "../reusables/";
import { CaretLeftFilled, MenuOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import clsx from "clsx";
import "./Header.less";

export const Header = ({ location }) => {
  const [showHomeButton, setShowHomeButton] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const closeMobileMenu = (e) => {
    e.target.blur();
    setShowMobileMenu(false);
  };

  useEffect(() => {
    if (location.pathname !== "/") {
      setShowHomeButton(true);
    } else {
      setShowHomeButton(false);
    }
  }, [location]);

  return (
    <header className="Header">
      <div className="Header__Title">
        {!showHomeButton ? (
          <span className="Header__Logo">Adam Kliegman</span>
        ) : (
          <Button
            to="/"
            type="link"
            variant="navlink"
            icon={<CaretLeftFilled />}
            focusable={false}
          >
            Home
          </Button>
        )}
      </div>
      <div
        className={clsx("Header__Nav", showMobileMenu && "Header__Nav--Show")}
      >
        <Nav location={location} linkOnClick={(e) => closeMobileMenu(e)} />
      </div>
      <IconButton
        className="Header__MenuButton"
        icon={<MenuOutlined />}
        type="button"
        variant="navlink"
        focusable={false}
        onClick={toggleMobileMenu}
      />
    </header>
  );
};
