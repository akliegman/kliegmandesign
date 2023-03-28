import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Button } from "../reusables";
import "./CookiesMessage.less";

export const CookiesMessage = () => {
  const [cookies, setCookie] = useCookies(["cookiesAccepted__adamkliegman"]);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    if (cookies.cookiesAccepted__adamkliegman) {
      setCookiesAccepted(true);
    }
  }, [cookies]);

  const handleAcceptCookies = (e) => {
    e.preventDefault();
    setCookie("cookiesAccepted__adamkliegman", true);
    setCookiesAccepted(true);
  };

  if (cookiesAccepted) {
    return null;
  }

  return (
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
  );
};
