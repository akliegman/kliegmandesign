import { useEffect, useState, useCallback } from "react";
import { useCookies } from "react-cookie";
import { CSSTransition } from "react-transition-group";

import { COOKIE_NAME, COOKIE_OPTIONS } from "../../config/appConfig";
import { Button } from "../reusables";
import "./CookiesMessage.less";

export const CookiesMessage = () => {
  const [cookies, setCookie] = useCookies([COOKIE_NAME]);
  const [cookiesAccepted, setCookiesAccepted] = useState(
    Boolean(cookies?.[COOKIE_NAME])
  );

  useEffect(() => {
    if (cookiesAccepted) {
      setCookie(COOKIE_NAME, true, COOKIE_OPTIONS);
    }
  }, [cookiesAccepted, setCookie]);

  const handleAcceptCookies = useCallback((e) => {
    e.preventDefault();
    setCookiesAccepted((prevCookiesAccepted) => {
      if (!prevCookiesAccepted) {
        return true;
      }
      return prevCookiesAccepted;
    });
  }, []);

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
        <Button size="xs" type="button" onClick={handleAcceptCookies}>
          Accept
        </Button>
      </div>
    </CSSTransition>
  );
};
