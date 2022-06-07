import React from "react";

import DashboardComponent from "../../components/DashboardComponent/DashboardComponent";
import Layout from "../../components/Layouts/WithAuth/Layout";

const DashboardScreen = () => {
    return (
        <Layout pageTitle={"Firmconnector"}>
            <DashboardComponent/>
        </Layout>
    );
};

export default DashboardScreen;
