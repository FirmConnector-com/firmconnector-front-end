import React from "react";

import ContactComponent from "../../../components/ContactUsComponent/ContactComponent";
import Layout from "../../../components/Layouts/WithoutAuth/Layout";

const ContactUsScreen = () => {
  return (
    <Layout pageTitle={"FirmConnector :: Contact Us"}>
      <ContactComponent />
    </Layout>
  );
};

export default ContactUsScreen;
