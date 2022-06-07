import Layout from "../../components/Layouts/WithAuth/Layout";
import ManagersList from "../../components/ResourceManager/List/ManagersList";

const Managers = () => {
    return (
        <Layout pageTitle={"FirmConnector :: My Manager"}>
            <ManagersList/>
        </Layout>
    );
};

export default Managers;
