// @ts-nocheck
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Button } from "../reusables";
import { CSSTransition } from "react-transition-group";
import "./CookiesMessage.less";

export const CookiesMessage = () => {
  const cookieName = "cookiesAccepted__adamkliegman";

  const cookieOptions = {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: true,
  };

  const [cookies, setCookie] = useCookies([cookieName]);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    if (cookies.cookiesAccepted__adamkliegman) {
      setCookiesAccepted(true);
    }
  }, [cookies]);

  const handleAcceptCookies = (e) => {
    e.preventDefault();

    setCookie(cookieName, true, cookieOptions);
    setCookiesAccepted(true);
  };

  return (
    <CSSTransition
      in={!cookiesAccepted}
      classNames="CookiesMessageFadeIn"
      timeout={1500}
      appear
      unmountOnExit
    >
      <div className="CookiesMessage">
        <p>
          We may use cookies to provide you with a better experience of this
          website. You are free to manage these via your browser settings at any
          time.
        </p>
        <Button size="xs" type="button" onClick={(e) => handleAcceptCookies(e)}>
          Accept
        </Button>
      </div>
    </CSSTransition>
  );
};
