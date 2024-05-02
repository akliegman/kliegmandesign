import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { CSSTransition } from "react-transition-group";

import { Button } from "../reusables";

import styles from "./CookiesMessage.module.less";

export const CookiesMessage = () => {
  const cookieName = "cookiesAccepted__adamkliegman";
  const cookieOptions = {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: true,
  };

  const [cookies, setCookie] = useCookies([cookieName]);
  const [cookiesAccepted, setCookiesAccepted] = useState(true);

  useEffect(() => {
    if (!cookies.cookiesAccepted__adamkliegman) {
      setCookiesAccepted(false);
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
      timeout={1000}
      appear
      unmountOnExit
    >
      <div className={styles.Container}>
        <div className={styles.Content}>
          <p className={styles.Header}>Obligatory cookie message</p>
          <p className={styles.Body}>
            This website may use cookies to provide you with a better
            experience. You are free to manage these via your browser settings
            at any time. By continuing to use this site, you are agreeing to our
            use of cookies.
          </p>
        </div>
        <div className={styles.Buttons}>
          <Button
            variant="secondary"
            type="button"
            onClick={(e) => handleAcceptCookies(e)}
          >
            Gotcha
          </Button>
        </div>
      </div>
    </CSSTransition>
  );
};
