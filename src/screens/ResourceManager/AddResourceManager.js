import Layout from "../../components/Layouts/WithAuth/Layout";
import AddManagerForm from "../../components/ResourceManager/AddManagerForm";

const AddResourceManager = () => {
    return (
        <Layout pageTitle={"FirmConnector :: New Manager"}>
            <AddManagerForm/>
        </Layout>
    );
};

export default AddResourceManager;
