import Layout from "../../components/Layouts/WithAuth/Layout";
import EditResourceComponent from "../../components/Resources/ResourceEdit/EditResourceComponent";

const AddResource = (props) => {
    const {resourceSlug} = props.match.params;

    return (
        <Layout pageTitle={"FirmConnector :: Edit Candidate"}>
            <EditResourceComponent resourceSlug={resourceSlug}/>
        </Layout>
    );
};

export default AddResource;
