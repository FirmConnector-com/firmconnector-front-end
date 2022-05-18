import React from "react";

//Import component
import LoginComponent from "../../components/AuthComponent/LoginComponent";
import Layout from "../../components/Layouts/WithoutAuth/Layout";

const LoginScreen = () => {
  return (
    <Layout pageTitle={"Firmconnector :: Login to your account"}>
      <LoginComponent />
    </Layout>
  );
};

export default LoginScreen;
