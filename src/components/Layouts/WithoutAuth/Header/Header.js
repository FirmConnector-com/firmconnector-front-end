import React from "react";
import TopNav from "./TopNav";

import "./header.css";
import "./navbar.css";

const Header = (props) => {
  return (
    <div className="header-wrapper">
      <TopNav />
    </div>
  );
};

export default Header;
