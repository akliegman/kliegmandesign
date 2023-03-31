import { Link } from "react-router-dom";
import clsx from "clsx";
import "./Footer.less";

export const Footer = ({ className }) => {
  return (
    <footer className={clsx("Footer", className)}>
      <p className="Footer__Copyright">
        © 2023 The Kliegman Design Company. All rights reserved.
      </p>
      <div className="Footer__Legal">
        <Link to="/terms-of-use">Terms of Use</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
      </div>
    </footer>
  );
};
