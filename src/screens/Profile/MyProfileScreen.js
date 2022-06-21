import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import Layout from "../../components/Layouts/WithAuth/Layout";

//import specific my profile component
import FirmOwnerScreen from "../../components/MyProfile/FirmOwnerProfile/FirmOwnerScreen";
import ResourceManagerScreen from "../../components/MyProfile/ResourceManagerProfile/ResourceManagerScreen";
import ClientScreen from "../../components/MyProfile/ClientProfile/ClientScreen";

const MyProfileScreen = () => {
  const { userDetails } = useAuthContext();
  const user_primary_role = JSON.parse(userDetails).user_primary_role;

  const displayMyProfileOnRoleBasis = () => {
    if (user_primary_role === "1") {
      return <FirmOwnerScreen />;
    } else if (user_primary_role === "2") {
      return <ResourceManagerScreen />;
    } else if (user_primary_role === "4") {
      return <ClientScreen />;
    }
  };

  return (
    <Layout pageTitle={"FirmConnector :: My Profile"}>
      {displayMyProfileOnRoleBasis()}
    </Layout>
  );
};

export default MyProfileScreen;
