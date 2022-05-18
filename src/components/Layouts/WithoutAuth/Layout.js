import React from "react";
import { Helmet } from "react-helmet";

import Header from "./Header/Header";
import Content from "./Content";
import Footer from "./Footer";

import "../../../assets/css/main.css";
import "../../../assets/css/color.css";
import "../../../assets/css/button.css";

const Layout = (props) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div className="page-wrapper">
        <Header />
        <Content>{props.children}</Content>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
