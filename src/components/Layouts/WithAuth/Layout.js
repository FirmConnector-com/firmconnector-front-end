import React from "react";
import { Helmet } from "react-helmet";

import Header from "./Header/Header";
import Content from "./Content";

import "../../../assets/css/main.css";
import "../../../assets/css/color.css";
import "../../../assets/css/button.css";
import "./layout.css";
import Sidebar from "./LeftMenu/LeftMenu";

const Layout = (props) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="sidebar-main">
          <Content>{props.children}</Content>
        </div>
      </div>
    </>
  );
};

export default Layout;
