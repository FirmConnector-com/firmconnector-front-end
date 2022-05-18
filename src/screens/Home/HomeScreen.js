import React from "react";

//Import component
import HomeComponent from "../../components/HomeComponents/HomeComponent";
import Layout from "../../components/Layouts/WithoutAuth/Layout";

const HomeScreen = () => {
  return (
    <Layout pageTitle={"Welcome to FirmConnector"}>
      <HomeComponent />
    </Layout>
  );
};

export default HomeScreen;
