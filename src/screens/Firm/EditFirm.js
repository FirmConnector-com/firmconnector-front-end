import Layout from "../../components/Layouts/WithAuth/Layout";
import EditForm from "../../components/Firm/Edit/EditForm";

const EditFirm = () => {
    return (
        <Layout pageTitle={"FirmConnector :: Edit Firm"}>
            <EditForm/>
        </Layout>
    );
};

export default EditFirm;
