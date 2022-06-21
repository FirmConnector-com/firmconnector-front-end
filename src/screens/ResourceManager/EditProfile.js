import Layout from "../../components/Layouts/WithAuth/Layout";
import EditManagerForm from "../../components/ResourceManager/ManagerEditProfile/EditManagerForm";

const EditProfile = () => {
  return (
    <Layout pageTitle={"FirmConnector :: Edit Profile"}>
      <EditManagerForm />
    </Layout>
  );
};

export default EditProfile;
