import React from "react";
import "./Layout.scss";
import { Header } from "./components/Header/Header";
import { Resume } from "./components/Resume/Resume";

export const Layout = () => {
  return (
    <div className="Layout">
      <Header />
      <Resume />
    </div>
  );
};
