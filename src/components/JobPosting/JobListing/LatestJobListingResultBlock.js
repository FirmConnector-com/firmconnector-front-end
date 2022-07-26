import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { FIRM_IMAGE_BASE } from "../../../config/env";

const LatestJobListingResultBlock = (props) => {
  const { jobList } = props;

  const displayDiscription = (discription) => {
    if (discription.length > 400) {
      return discription.substr(0, 400) + "...";
    } else {
      return discription;
    }
  };

  const jobItem = (item) => {
    return (
      <div key={item.job_id} className="d-block mb-3">
        <div className="card-custom">
          <div className="card-body">
            <div className="d-block">
              <h5>
                <Link to={`/job/details/${item.job_slug}`}>
                  <span className="text-info-custom h5">{item.job_title}</span>
                </Link>
              </h5>
            </div>
            <div className="d-block my-3">
              <span className="text-dark">
                {displayDiscription(item.job_description)}
              </span>
            </div>
            <div className="row d-flex align-items-center rounded py-2 bg-light m-0">
              <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-2 mb-lg-0 mb-xl-0 mb-xxl-0">
                <div className="d-block">
                  <span className="text-dark">Posted By</span>
                </div>
                <div className="d-block">
                  <span className="fw-bold">{item.creator_name}</span>
                </div>
              </div>
              <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-2 mb-lg-0 mb-xl-0 mb-xxl-0">
                <div className="d-block">
                  <span className="text-dark">Posted On</span>
                </div>
                <div className="d-block">
                  <span className="fw-bold">
                    {moment(item.created_on).format("MM-DD-YYYY")}
                  </span>
                </div>
              </div>
              <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-2 mb-lg-0 mb-xl-0 mb-xxl-0">
                <div className="d-block">{displayFirm(item.firm_logo)}</div>
              </div>
            </div>
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

export default LatestJobListingResultBlock;
