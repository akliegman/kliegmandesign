import { Link } from "react-router-dom";
import { MidDot } from "../reusables";
import clsx from "clsx";
import { useAuth } from "../../context/AuthContext";
import "./Footer.less";

export const Footer = ({ className }) => {
  const { session } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={clsx("Footer", className)} data-testid="footer">
      <div className="Footer__content">
        <span className="Footer__copyright">
          © {currentYear} Adam Kliegman. All rights reserved.
        </span>
        <div className="Footer__legal">
          {session && (
            <>
              <span>
                Logged in {session?.user?.email && `as ${session?.user?.email}`}
              </span>
              <MidDot color="gray-500" />
            </>
          )}
          <Link to="/terms-of-use">Terms of Use</Link>
          <MidDot color="gray-500" />
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};
