import React from "react";
import Layout from "../../components/Layouts/WithAuth/Layout";
import JobListingBlock from "../../components/JobPosting/JobListing/JobListingBlock";

const JobListingScreen = () => {
    return (
        <Layout pageTitle={"FirmConnector :: Job Posting"}>
            <JobListingBlock/>
        </Layout>
    );
};

export default JobListingScreen;
