import Layout from "../../components/Layouts/WithAuth/Layout";
import EditJobPosting from "../../components/JobPosting/EditJobPosting";

const JobEditScreen = (props) => {
  const { jobSlug } = props.match.params;

  return (
    <Layout pageTitle={"FirmConnector :: Edit Job"}>
      <EditJobPosting jobSlug={jobSlug} />
    </Layout>
  );
};

export default JobEditScreen;
