import React from "react";
import Layout from "../../components/Layouts/WithAuth/Layout";
import ResourceListingBlock from "../../components/Resources/ResourceListing/ResourceListingBlock";

const ResourceListingScreen = () => {
  return (
    <Layout>
      <ResourceListingBlock />
    </Layout>
  );
};

export default ResourceListingScreen;
