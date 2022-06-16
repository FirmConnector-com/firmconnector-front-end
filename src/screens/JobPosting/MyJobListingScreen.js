import React from "react";
import Layout from "../../components/Layouts/WithAuth/Layout";
import MyJobListingBlock from "../../components/JobPosting/JobListing/MyJobListingBlock";

const MyJobListingScreen = () => {
  return (
    <Layout pageTitle={"FirmConnector :: My Job Posting"}>
      <MyJobListingBlock />
    </Layout>
  );
};

export default MyJobListingScreen;
