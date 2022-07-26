import React, { useEffect, useState } from "react";
import BlockHeader from "../../Headers/BlockHeader";
import JobListingResultBlock from "./JobListingResultBlock";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";
import { AlertInfo } from "../../Alerts/Alert";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import getMyJobPostings from "../../../apis/getMyJobPostings";
import removeJob from "../../../apis/removeJob";
import Swal from "sweetalert2";
import swalWithBootstrapButtons from "sweetalert2-react-content";

const MyJobListingBlock = () => {
  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;
  const MySwal = swalWithBootstrapButtons(Swal);

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
    Promise.all([getMyJobPostings(user_slug, searchText)])
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

  const handleRemoveJob = async (slug) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "that you want to remove this job post",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      confirmButtonColor: "var(--danger)",
      cancelButtonColor: "var(--black)",
    }).then(async (result) => {
      if (result.isConfirmed) {
        removeSelectedDetails(slug);
      }
    });
  };

  const removeSelectedDetails = (slug) => {
    let formData = {
      user_slug: user_slug,
      job_slug: slug,
    };

    try {
      removeJob(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            await setJobData(jobData.filter((item) => item.job_slug !== slug));
            if (jobData.length === 1) {
              setNoDataFound(true);
              setErrorMessage(
                "You haven't posted any job. Click on the create button to post new job."
              );
            }

            await MySwal.fire({
              title: <strong>Success</strong>,
              html: <i>{data.data.message}</i>,
              icon: "success",
            });
          } else if (data.data.status === 0) {
            await MySwal.fire({
              title: <strong>Error</strong>,
              html: <i>{data.data.message}</i>,
              icon: "danger",
            });
          } else {
            await MySwal.fire({
              title: <strong>Error</strong>,
              html: <i>{data.data.status}</i>,
              icon: "danger",
            });
          }
        } else {
          await MySwal.fire({
            title: <strong>Error</strong>,
            html: <i>{data.data.message}</i>,
            icon: "danger",
          });
        }
      });
    } catch (error) {
      MySwal.fire({
        title: <strong>Success</strong>,
        html: <i>Something wrong happened!</i>,
        icon: "danger",
      });
    }
  };

  const displayJobListBlock = () => {
    return (
      <>
        {isJobLoading ? (
          <>{displayLoadingBlock()}</>
        ) : !noDataFound ? (
          <JobListingResultBlock
            jobList={jobData}
            handleRemoveJob={handleRemoveJob}
          />
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
          title={"My Job Postings"}
          subText={"The listing shows the jobs you have created"}
        />
      </div>
      <div className="d-flex justify-content-end my-3">
        <Link to="/job/latest-jobs">
          <Button variant="outline-secondary" size="sm">
            Latest Jobs
          </Button>
        </Link>
        <Link to="/job/my-jobs">
          <Button variant="primary" size="sm" className="mx-2">
            My Posted Jobs
          </Button>
        </Link>
        <Link to="/create-job">
          <Button variant="outline-secondary" size="sm">
            Create Job
          </Button>
        </Link>
      </div>
      {displayJobListBlock()}
    </>
  );
};

export default MyJobListingBlock;
