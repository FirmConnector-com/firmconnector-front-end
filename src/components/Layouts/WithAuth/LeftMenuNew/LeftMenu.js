import React from "react";
import "./LeftMenuCss.css";

const Sidebar = () => {
  return (
    <div className="container-fluid bg-white navbar-top fixed-top d-flex align-items-center py-4">
      <div className="d-flex container align-items-center">
        <div className="d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none">
          Menu
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
