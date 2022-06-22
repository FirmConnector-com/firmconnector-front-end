import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/WithAuth/Layout";
import ResourceListingBlock from "../../components/Resources/ResourceListing/ResourceListingBlock";
import { useAuthContext } from "../../context/AuthContext";
import { AlertInfo } from "../../components/Alerts/Alert";

const ResourceListingScreen = () => {
  const { userDetails } = useAuthContext();
  const user_primary_role = JSON.parse(userDetails).user_primary_role;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user_primary_role !== undefined) {
      setIsLoading(false);
    }
  }, [user_primary_role]);

  const displayContent = () => {
    if (isLoading) {
    } else {
      return (
        <>
          {user_primary_role === "1" ||
          user_primary_role === "2" ||
          user_primary_role === "3" ? (
            <ResourceListingBlock />
          ) : (
            <AlertInfo
              title={"Access denied"}
              message={[
                "You don't have access to view this screen. Please check your access or contact Firmconnector Support team.",
              ]}
            />
          )}
        </>
      );
    }
  };

  return (
    <Layout pageTitle={"FirmConnector :: My Candidate"}>
      {displayContent()}
    </Layout>
  );
};

export default ResourceListingScreen;
