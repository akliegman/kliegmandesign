import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { Nav } from "../Nav/Nav";
import { IconButton } from "../reusables/";
import { routeNames } from "../../routes";

import styles from "./Header.module.less";

export const Header = ({ location, matchProjectPath }) => {
  const logoRef = useRef(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = (e) => {
    e.target.blur();
    setShowMobileMenu(!showMobileMenu);
  };

  const closeMobileMenu = (e) => {
    e.target.blur();
    setShowMobileMenu(false);
  };

  useEffect(() => {
    if (logoRef.current) {
      logoRef.current.blur();
    }
  }, [showMobileMenu, location]);

  return (
    <header className={styles.Header} data-testid="header">
      <div className={clsx(styles.Content, showMobileMenu && styles.Show)}>
        <div className={styles.Title}>
          <Link
            to={routeNames.HOME}
            className={styles.LogoLink}
            onClick={(e) => closeMobileMenu(e)}
            ref={logoRef}
          >
            <span data-testid="logo" className={styles.Logo}>
              Adam Kliegman
            </span>
            <span data-testid="logo" className={styles.Logo} aria-hidden="true">
              Adam Kliegman
            </span>
          </Link>
        </div>
        <IconButton
          className={clsx(styles.MenuButton)}
          icon={showMobileMenu ? <CloseOutlined /> : <MenuOutlined />}
          type="button"
          variant={showMobileMenu ? "navLinkShow" : "navLink"}
          testId="menu-button"
          focusable={false}
          onClick={toggleMobileMenu}
        />
        <div
          data-testid="nav-wrapper"
          className={clsx(styles.Nav, showMobileMenu && styles.NavShow)}
        >
          <Nav
            location={location}
            matchProjectPath={matchProjectPath}
            linkOnClick={(e) => closeMobileMenu(e)}
            tabbable={showMobileMenu}
          />
        </div>
      </div>
    </header>
  );
};
