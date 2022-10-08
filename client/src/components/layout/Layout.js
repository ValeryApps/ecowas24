import React from "react";
import { AppFooter } from "../footer/AppFooter";
import { RightSideMenu } from "../rightSide/RightSideMenu";
import "./layout.css";

export const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="left_side">{children}</div>
      <div className="right_side">
        <RightSideMenu />
      </div>
    </div>
  );
};
