import clsx from "clsx";
import "./Footer.less";

export const Footer = ({ className }) => {
  return (
    <footer className={clsx("Footer", className)}>
      <p className="Footer__Copyright">
        © 2023 The Kliegman Design Company. All rights reserved.
      </p>
    </footer>
  );
};
