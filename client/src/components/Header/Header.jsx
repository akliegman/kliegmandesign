import { Nav } from "../Nav/Nav";
import { IconButton, Button } from "../reusables/";
import { CaretLeftFilled, MenuOutlined } from "@ant-design/icons";
import { useState, useLayoutEffect } from "react";
import clsx from "clsx";
import { routeNames } from "../../routes";
import "./Header.less";

export const Header = ({ location, matchProjectPath }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [backButton, setBackButton] = useState({});

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const closeMobileMenu = (e) => {
    e.target.blur();
    setShowMobileMenu(false);
  };

  useLayoutEffect(() => {
    if (location.pathname === routeNames?.HOME) {
      setBackButton({});
    } else if (matchProjectPath?.pathname) {
      setBackButton({
        to: routeNames?.PROJECTS,
        label: "Projects",
      });
    } else {
      setBackButton({
        to: routeNames?.HOME,
        label: "Home",
      });
    }
  }, [location, matchProjectPath, setBackButton]);

  return (
    <header className="Header">
      <div className="Header__content">
        <div className="Header__title">
          {!Object.entries(backButton)?.length ? (
            <span data-testid="logo" className="Header__logo">
              Adam Kliegman
            </span>
          ) : (
            <Button
              to={backButton?.to}
              data-testid="back-button"
              type="link"
              variant="navlink"
              icon={<CaretLeftFilled />}
              focusable={false}
              aria-label={`Back to ${backButton?.label}`}
            >
              {backButton?.label}
            </Button>
          )}
        </div>
        <div
          data-testid="nav-wrapper"
          className={clsx("Header__nav", showMobileMenu && "Header__nav--show")}
        >
          <Nav
            location={location}
            matchProjectPath={matchProjectPath}
            linkOnClick={(e) => closeMobileMenu(e)}
          />
        </div>
        <IconButton
          className="Header__menuButton"
          icon={<MenuOutlined />}
          type="button"
          variant="navlink"
          data-testid="menu-button"
          focusable={false}
          onClick={toggleMobileMenu}
        />
      </div>
    </header>
  );
};
