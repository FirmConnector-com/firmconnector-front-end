import React from "react";

//Import component
import SignupComponent from "../../components/AuthComponent/SignupComponent/SignupComponent";
import Layout from "../../components/Layouts/WithoutAuth/Layout";

const SignUpScreen = () => {
  return (
    <Layout pageTitle={"Firmconnector :: Create your own account"}>
      <SignupComponent />
    </Layout>
  );
};

export default SignUpScreen;
