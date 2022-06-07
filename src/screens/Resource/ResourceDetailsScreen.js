import React from "react";
import ResourceProfile from "../../components/Resources/ResourceProfile/ResourceProfile";
import Layout from "../../components/Layouts/WithAuth/Layout";

const ResourceEditScreen = (props) => {
    const {resourceSlug} = props.match.params;

    return (
        <Layout pageTitle={"FirmConnector :: My Candidate"}>
            <ResourceProfile resourceSlug={resourceSlug}/>
        </Layout>
    );
};

export default ResourceEditScreen;
