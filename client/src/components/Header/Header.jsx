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
  const menuButtonRef = useRef(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [hoverClassName, setHoverClassName] = useState(true);

  const blurRefs = () => {
    if (logoRef.current) {
      logoRef.current.blur();
    }
    if (menuButtonRef.current) {
      menuButtonRef.current.blur();
    }
  };

  const toggleMobileMenu = () => {
    blurRefs();
    setShowMobileMenu(!showMobileMenu);
  };

  const closeMobileMenu = () => {
    blurRefs();
    setShowMobileMenu(false);
  };

  useEffect(() => {
    blurRefs();
  }, [showMobileMenu, location]);

  return (
    <header className={styles.Header} data-testid="header">
      <div className={clsx(styles.Content, showMobileMenu && styles.Show)}>
        <div className={styles.Title}>
          <Link
            to={routeNames.HOME}
            className={clsx(styles.LogoLink, hoverClassName && styles.Hover)}
            onClick={closeMobileMenu}
            onTouchEnd={() => setHoverClassName(false)}
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
          className={clsx(styles.MenuButton, hoverClassName && styles.Hover)}
          icon={showMobileMenu ? <CloseOutlined /> : <MenuOutlined />}
          type="button"
          variant={showMobileMenu ? "navLinkShow" : "navLink"}
          testId="menu-button"
          focusable={false}
          onClick={toggleMobileMenu}
          ref={menuButtonRef}
        />
        <div
          data-testid="nav-wrapper"
          className={clsx(styles.Nav, showMobileMenu && styles.NavShow)}
        >
          <Nav
            location={location}
            matchProjectPath={matchProjectPath}
            linkOnClick={closeMobileMenu}
            linkOnTouchEnd={() => setHoverClassName(false)}
            tabbable={showMobileMenu}
          />
        </div>
      </div>
    </header>
  );
};
