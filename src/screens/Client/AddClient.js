import Layout from "../../components/Layouts/WithAuth/Layout";
import AddClientForm from "../../components/Clients/AddClientForm";

const AddClient = () => {
    return (
        <Layout pageTitle={"FirmConnector :: New Client"}>
            <AddClientForm/>
        </Layout>
    );
};

export default AddClient;
