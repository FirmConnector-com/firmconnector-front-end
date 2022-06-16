import Layout from "../../components/Layouts/WithAuth/Layout";
import JobDetails from "../../components/JobPosting/JobDetails";

const JobDetailsScreen = (props) => {
  const { jobSlug } = props.match.params;

  return (
    <Layout pageTitle={"Job Details"}>
      <JobDetails jobSlug={jobSlug} />
    </Layout>
  );
};

export default JobDetailsScreen;
