import { Nav } from "../Nav/Nav";
import { IconButton, Button } from "../reusables/";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { CaretLeftFilled, MenuOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import clsx from "clsx";
import "./Header.less";

export const Header = ({ location }) => {
  const [showHomeButton, setShowHomeButton] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
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
        <TransitionGroup component={null}>
          <CSSTransition
            key={location.key}
            classNames="HeaderTitleTransition"
            timeout={500}
          >
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
          </CSSTransition>
        </TransitionGroup>
      </div>
      <div
        className={clsx("Header__Nav", showMobileMenu && "Header__Nav--Show")}
      >
        <Nav location={location} linkOnClick={handleMobileMenu} />
      </div>
      <IconButton
        className="Header__MenuButton"
        icon={<MenuOutlined />}
        type="button"
        variant="navlink"
        focusable={false}
        onClick={handleMobileMenu}
      />
    </header>
  );
};
