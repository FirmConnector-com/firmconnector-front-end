import Layout from "../../components/Layouts/WithAuth/Layout";
import AddJobPosting from "../../components/JobPosting/AddJobPosting";

const CreateJob = () => {
    return (
        <Layout pageTitle={"FirmConnector :: New Job"}>
            <AddJobPosting/>
        </Layout>
    );
};

export default CreateJob;
