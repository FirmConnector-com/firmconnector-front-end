import Layout from "../../components/Layouts/WithAuth/Layout";
import AddResourceForm from "../../components/Resources/AddResourceForm";

const AddResource = () => {
    return (
        <Layout pageTitle={"FirmConnector :: New Candidate"}>
            <AddResourceForm/>
        </Layout>
    );
};

export default AddResource;
