import React from "react";

import PrivacyComponent from "../../../components/PrivacyComponent/PrivacyComponent";
import Layout from "../../../components/Layouts/WithoutAuth/Layout";

const PrivacyPolicyScreen = () => {
  return (
    <Layout pageTitle={"FirmConnector :: Privacy Policy"}>
      <PrivacyComponent />
    </Layout>
  );
};

export default PrivacyPolicyScreen;
