import React, { useEffect, useState } from "react";
import BlockHeader from "../../Headers/BlockHeader";
import JobListingResultBlock from "./JobListingResultBlock";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import getMyJobPostings from "../../../apis/getMyJobPostings";

const MyJobListingBlock = () => {
  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;

  const [isJobLoading, setIsJobLoading] = useState(true);
  const [jobData, setJobData] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (user_slug) {
      getMyJobListings();
    }
  }, [searchText, user_slug]);

  const getMyJobListings = () => {
    Promise.all([getMyJobPostings(user_slug, searchText)])
      .then(async ([data]) => {
        if (data?.data?.job_list) {
          setIsJobLoading(false);
          setJobData(data?.data?.job_list);
        } else {
          setIsJobLoading(false);
        }
      })
      .catch((err) => {
        setIsJobLoading(false);
        console.log(err);
      });
  };

  const displayJobListBlock = () => {
    return (
      <>
        {isJobLoading ? (
          <>{displayLoadingBlock()}</>
        ) : (
          <JobListingResultBlock jobList={jobData} />
        )}
      </>
    );
  };

  const displayLoadingBlock = () => {
    return <LoadingPageSm title={"Loading jobs..."} />;
  };

  return (
    <>
      <div className="d-block">
        <BlockHeader
          title={"My Job Postings"}
          subText={"The listing shows the jobs you have created"}
        />
      </div>
      <div className="d-flex justify-content-end my-3">
        <Link to="/create-job">
          <Button variant="primary" size="sm">
            Create Job
          </Button>
        </Link>
      </div>
      {displayJobListBlock()}
    </>
  );
};

export default MyJobListingBlock;
