import React from "react";
import Layout from "../../components/Layouts/WithAuth/Layout";
import ClientListingBlock from "../../components/Clients/ClientListing/ClientListingBlock";

const ClientListingScreen = () => {
    return (
        <Layout pageTitle={"FirmConnector :: My Client"}>
            <ClientListingBlock/>
        </Layout>
    );
};

export default ClientListingScreen;
