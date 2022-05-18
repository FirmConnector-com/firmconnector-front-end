import React from "react";

import AboutComponent from "../../../components/AboutComponent/AboutComponent";
import Layout from "../../../components/Layouts/WithoutAuth/Layout";

const AboutScreen = () => {
  return (
    <Layout pageTitle={"FirmConnector :: About Us"}>
      <AboutComponent />
    </Layout>
  );
};

export default AboutScreen;
