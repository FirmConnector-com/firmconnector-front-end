import React, { useEffect, useState } from "react";
//import API
import { FIRM_IMAGE_BASE } from "../../config/env";
import getJobDetails from "../../apis/getJobDetails";
import LoadingPageSm from "../CommonComponent/LoadingPageSm";

import BlockHeader from "../Headers/BlockHeader";
import moment from "moment";

const JobDetails = (props) => {
  const { jobSlug } = props;
  const [isJobDetailsLoading, setIsJobDetailsLoading] = useState(true);
  const [jobArray, setJobArray] = useState(true);

  useEffect(() => {
    if (jobSlug !== undefined) {
      getJob();
    }
  }, [jobSlug]);

  const getJob = () => {
    Promise.all([getJobDetails(jobSlug)])
      .then(async ([data]) => {
        if (data?.data?.job_details) {
          await setIsJobDetailsLoading(false);
          await setJobArray(data.data.job_details);
        } else {
          setIsJobDetailsLoading(false);
        }
      })
      .catch((err) => {
        setIsJobDetailsLoading(false);
      });
  };

  const displayTopBlock = () => {
    return <BlockHeader title={"Job Details"} />;
  };

  const displayMainContent = () => {
    return (
      <div className="card-custom bg-white  mb-4">
        <div className="card-body">
          {isJobDetailsLoading ? (
            <LoadingPageSm title={"Loading job details..."} />
          ) : (
            displayJobDetailsBlock()
          )}
        </div>
      </div>
    );
  };

  const displayJobDetailsBlock = () => {
    return (
      <div className="d-block">
        <div className="d-block border-bottom pb-3">
          <span className="h4">{jobArray.job_title}</span>
        </div>
        <div className="my-3 bg-light p-2 m-1 rounded">
          <div className="row d-flex align-items-center">
            <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-2 mb-lg-0 mb-xl-0 mb-xxl-0">
              <div className="d-block">
                <span className="text-dark text-x-sm-custom">Posted By</span>
              </div>
              <div className="d-block">
                <span className="text-sm-custom fw-bold">
                  {jobArray.creator_name}
                </span>
              </div>
            </div>
            <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-2 mb-lg-0 mb-xl-0 mb-xxl-0">
              <div className="d-block">
                <span className="text-dark text-x-sm-custom">Posted On</span>
              </div>
              <div className="d-block">
                <span className="text-sm-custom fw-bold">
                  {moment(jobArray.created_on).format("MM-DD-YYYY")}
                </span>
              </div>
            </div>
            <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-2 mb-lg-0 mb-xl-0 mb-xxl-0">
              <div className="d-block">{displayFirm(jobArray.firm_logo)}</div>
            </div>
          </div>
        </div>

        <div className="d-block my-4">
          <p className="text-black" style={{ whiteSpace: "pre-line" }}>
            {jobArray.job_description}
          </p>
        </div>
      </div>
    );
  };

  const displayFirm = (logo_path) => {
    return (
      <div
        className="firm-logo-sm-custom"
        style={{
          backgroundImage: `url("${FIRM_IMAGE_BASE + logo_path}")`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    );
  };

  return (
    <div className="d-block">
      {displayTopBlock()}
      {displayMainContent()}
    </div>
  );
};

export default JobDetails;
