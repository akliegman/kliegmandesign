import { Nav } from "../Nav/Nav";
import { IconButton, Button } from "../reusables/";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { CaretLeftFilled, MenuOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import clsx from "clsx";
import "./Header.less";
import { useAuth } from "../../context/AuthContext";

export const Header = ({ location }) => {
  const [showHomeButton, setShowHomeButton] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isLoggedIn } = useAuth();

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const closeMobileMenu = () => {
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
        {isLoggedIn && "Logged In"}
        <Nav location={location} linkOnClick={closeMobileMenu} />
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
