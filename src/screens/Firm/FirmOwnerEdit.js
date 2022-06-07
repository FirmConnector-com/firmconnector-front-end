import React from "react";
import Layout from "../../components/Layouts/WithAuth/Layout";
import EditFirmOwnerForm from "../../components/Firm/FirmOwnerEditProfile/EditFirmOwnerForm";

const FirmOwnerEdit = () => {
    return (
        <Layout pageTitle={"FirmConnector :: Edit Owner"}>
            <EditFirmOwnerForm/>
        </Layout>
    );
};

export default FirmOwnerEdit;
