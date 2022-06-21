import Layout from "../../components/Layouts/WithAuth/Layout";
import EditManagerForm from "../../components/ResourceManager/ManagerEditProfile/EditManagerForm";
import EditForm from "../../components/MyProfile/ClientEditProfile/EditForm";

import { useAuthContext } from "../../context/AuthContext";

const EditProfile = () => {
  const { userDetails } = useAuthContext();
  const user_primary_role = JSON.parse(userDetails).user_primary_role;

  const checkProfileEditAccess = () => {
    if (user_primary_role === "2") {
      return <EditManagerForm />;
    } else if (user_primary_role === "4") {
      return <EditForm />;
    }
  };

  return (
    <Layout pageTitle={"FirmConnector :: Edit Profile"}>
      {checkProfileEditAccess()}
    </Layout>
  );
};

export default EditProfile;
