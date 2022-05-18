import React from "react";
import Layout from "../../components/Layouts/WithAuth/Layout";
import EditFirmOwnerForm from "../../components/Firm/FirmOwnerEditProfile/EditFirmOwnerForm";

const FirmOwnerEdit = () => {
  return (
    <Layout>
      <EditFirmOwnerForm />
    </Layout>
  );
};

export default FirmOwnerEdit;
