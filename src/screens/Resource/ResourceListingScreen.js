import React from "react";
import Layout from "../../components/Layouts/WithAuth/Layout";
import ResourceListingBlock from "../../components/Resources/ResourceListing/ResourceListingBlock";
import { useAuthContext } from "../../context/AuthContext";
import { AlertInfo } from "../../components/Alerts/Alert";

const ResourceListingScreen = () => {
  const { userDetails } = useAuthContext();
  const user_primary_role = JSON.parse(userDetails).user_primary_role;

  return (
    <Layout pageTitle={"FirmConnector :: My Candidate"}>
      {user_primary_role === 1 ||
      user_primary_role === 2 ||
      user_primary_role === 3 ? (
        <ResourceListingBlock />
      ) : (
        <AlertInfo
          title={"Access denied"}
          message={[
            "You don't have access to view this screen. Please check your access or contact Firmconnector Support team.",
          ]}
        />
      )}
    </Layout>
  );
};

export default ResourceListingScreen;
