import React from "react";

//Import component
import ForgotPasswordComponent from "../../components/AuthComponent/ForgotPasswordComponent";
import Layout from "../../components/Layouts/WithoutAuth/Layout";

const ForgotPassword = () => {
  return (
    <Layout pageTitle={"Firmconnector :: Forgot Password"}>
      <ForgotPasswordComponent />
    </Layout>
  );
};

export default ForgotPassword;
