import BlockHeader from "../../Headers/BlockHeader";
import JobListingResultBlock from "./JobListingResultBlock";

const JobListingBlock = () => {
  return (
    <>
      <div className="d-block mb-3">
        <BlockHeader title={"Job Posting"} />
      </div>
      <div className="row my-3">
        <div className="text-secondary">
          This section is currently under development
        </div>
      </div>
      <JobListingResultBlock />
    </>
  );
};

export default JobListingBlock;
