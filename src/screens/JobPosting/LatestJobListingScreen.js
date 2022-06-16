import React from "react";
import Layout from "../../components/Layouts/WithAuth/Layout";
import LatestJobListingBlock from "../../components/JobPosting/JobListing/LatestJobListingBlock";

const LatestJobListingScreen = () => {
  return (
    <Layout pageTitle={"FirmConnector :: Latest Job Posting"}>
      <LatestJobListingBlock />
    </Layout>
  );
};

export default LatestJobListingScreen;
