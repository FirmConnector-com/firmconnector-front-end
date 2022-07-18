import React, { useEffect, useState } from "react";
import BlockHeader from "../../Headers/BlockHeader";
import LatestJobListingResultBlock from "./LatestJobListingResultBlock";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";
import { AlertInfo } from "../../Alerts/Alert";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import getLatestJobPostings from "../../../apis/getLatestJobPostings";

const LatestJobListingBlock = () => {
  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;

  const [isJobLoading, setIsJobLoading] = useState(true);
  const [jobData, setJobData] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [noDataFound, setNoDataFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user_slug) {
      getMyJobListings();
    }
  }, [searchText, user_slug]);

  const getMyJobListings = () => {
    Promise.all([getLatestJobPostings(user_slug, searchText)])
      .then(async ([data]) => {
        if (data?.data?.status === 0) {
          setIsJobLoading(false);
          setNoDataFound(true);
          setErrorMessage(data.data.message);
        } else {
          if (data?.data?.job_list) {
            setIsJobLoading(false);
            setJobData(data?.data?.job_list);
            setNoDataFound(false);
          } else {
            setIsJobLoading(false);
            setNoDataFound(true);
            setErrorMessage("Error happened. Please try again!");
          }
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
        ) : !noDataFound ? (
          <LatestJobListingResultBlock jobList={jobData} />
        ) : (
          displayErrorMessage()
        )}
      </>
    );
  };

  const displayLoadingBlock = () => {
    return <LoadingPageSm title={"Loading jobs..."} />;
  };

  const displayErrorMessage = () => {
    if (noDataFound) {
      return <AlertInfo title={"Oops"} message={errorMessage} />;
    }
  };

  return (
    <>
      <div className="d-block">
        <BlockHeader
          title={"Latest Job Postings"}
          subText={"The listing shows the jobs posted within your firms"}
        />
      </div>
      <div className="d-flex justify-content-end my-3">
        <Link to="/job/my-jobs">
          <Button variant="primary" size="sm">
            My Posted Jobs
          </Button>
        </Link>
      </div>
      {displayJobListBlock()}
    </>
  );
};

export default LatestJobListingBlock;
