import React from "react";
import moment from "moment";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FIRM_IMAGE_BASE } from "../../../config/env";

const JobListingResultBlock = (props) => {
  const { jobList, handleRemoveJob } = props;

  const displayDiscription = (discription) => {
    if (discription.length > 400) {
      return discription.substr(0, 400) + "...";
    } else {
      return discription;
    }
  };

  const removeJob = (jobSlug) => {
    handleRemoveJob(jobSlug);
  };

  const jobItem = (item) => {
    return (
      <div key={item.job_id} className="d-block mb-3">
        <div className="card-custom">
          <div className="card-body">
            <div className="d-block">
              <h5>
                <Link to={`/job/details/${item.job_slug}`}>
                  <span className="text-dark">{item.job_title}</span>
                </Link>
              </h5>
            </div>
            <div className="d-block my-3">
              <span className="text-muted-custom">
                {displayDiscription(item.job_description)}
              </span>
            </div>
            <div className="row d-flex align-items-center">
              <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-2 mb-lg-0 mb-xl-0 mb-xxl-0">
                <div className="d-block">
                  <span className="text-dark text-x-sm-custom">Posted By</span>
                </div>
                <div className="d-block">
                  <span className="text-sm-custom fw-bold">
                    {item.creator_name}
                  </span>
                </div>
              </div>
              <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-2 mb-lg-0 mb-xl-0 mb-xxl-0">
                <div className="d-block">
                  <span className="text-dark text-x-sm-custom">Posted On</span>
                </div>
                <div className="d-block">
                  <span className="text-sm-custom fw-bold">
                    {moment(item.created_on).format("MM-DD-YYYY")}
                  </span>
                </div>
              </div>
              <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-2 mb-lg-0 mb-xl-0 mb-xxl-0">
                <div className="d-block">{displayFirm(item.firm_logo)}</div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end border-top p-3">
            <Link to={`/job/details/${item.job_slug}`}>
              <Button variant="warning" size="md">
                View Job
              </Button>
            </Link>
            <Link to={`/job/edit/${item.job_slug}`}>
              <Button variant="success" size="md" className="ms-3">
                Edit Job
              </Button>
            </Link>
            <Button
              variant="danger"
              size="md"
              className="ms-3"
              onClick={() => removeJob(item.job_slug)}
            >
              Remove Job
            </Button>
          </div>
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
      {jobList
        ? jobList.map(function (item) {
            return jobItem(item);
          })
        : null}
    </div>
  );
};

export default JobListingResultBlock;
