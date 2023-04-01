import { Link } from "react-router-dom";
import { MidDot } from "../reusables";
import clsx from "clsx";
import { useAuth } from "../../context/AuthContext";
import "./Footer.less";

export const Footer = ({ className }) => {
  const { session } = useAuth();

  console.log(session);
  return (
    <footer className={clsx("Footer", className)}>
      <p className="Footer__Copyright">
        © 2023 The Kliegman Design Company. All rights reserved.
      </p>
      <div className="Footer__Legal">
        {session && (
          <>
            <p>
              Logged in {session?.user?.email && `as ${session?.user?.email}`}
            </p>
            <MidDot color="gray-500" />
          </>
        )}
        <Link to="/terms-of-use">Terms of Use</Link>
        <MidDot color="gray-500" />
        <Link to="/privacy-policy">Privacy Policy</Link>
      </div>
    </footer>
  );
};
