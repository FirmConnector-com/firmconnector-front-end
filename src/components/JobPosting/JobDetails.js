import React, { useEffect, useState } from "react";
import { FIRM_IMAGE_BASE } from "../../config/env";
import getJobDetails from "../../apis/getJobDetails";
import LoadingPageSm from "../CommonComponent/LoadingPageSm";
import { Button } from "react-bootstrap";
import moment from "moment";
import Modal from "react-bootstrap/Modal";

import { useHistory } from "react-router-dom";

const JobDetails = (props) => {
  const history = useHistory();
  const { jobSlug } = props;
  const [isJobDetailsLoading, setIsJobDetailsLoading] = useState(true);
  const [jobArray, setJobArray] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

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

  const displayMainContent = () => {
    return (
      <>
        {isJobDetailsLoading ? (
          <LoadingPageSm title={"Loading job details..."} />
        ) : (
          displayJobDetailsBlock()
        )}
      </>
    );
  };

  const displayHeaderBlock = () => {
    return (
      <div className="card-custom mb-4">
        <div className="card-body">
          <div className="d-block mb-2">
            <span className="fs-4 fw-bold">{jobArray.job_title}</span>
          </div>
          <div className="d-dlock">
            <span className="text-secondary">Posted by</span>{" "}
            <span className="text-info">{jobArray.creator_name}</span>
          </div>
          <div className="d-block">
            <span className="text-muted-custom">
              {moment(jobArray.created_on).format("MMMM Do, YYYY")}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const displayDiscription = () => {
    if (jobArray.job_description !== "") {
      return (
        <div className="d-block">
          <div className="d-block mb-2">
            <span className="fs-6 fw-bold">Job Overview:</span>
          </div>
          <div className="d-block">{checkDescriptionlength()}</div>
        </div>
      );
    }
  };

  const checkDescriptionlength = () => {
    if (
      jobArray.job_description !== null &&
      jobArray.job_description !== "" &&
      jobArray.job_description !== undefined
    ) {
      if (jobArray.job_description.length > 500) {
        return (
          <>
            <span className="text-muted-custom">
              {jobArray.job_description.substr(0, 499) + "..."}
            </span>{" "}
            <span
              className="text-info fs-6 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              read more
            </span>
          </>
        );
      } else {
        return (
          <span className="text-muted-custom">{jobArray.job_description}</span>
        );
      }
    }
  };

  const displayDescriptionModal = () => {
    return (
      <Modal
        show={isOpen}
        scrollable={true}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="d-block">
            <div className="d-block">
              <span className="fs-5 fw-bold-custom">Job Overview</span>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <span>{jobArray.job_description}</span>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            size={"sm"}
            onClick={() => setIsOpen(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const displaySkills = () => {
    if (
      jobArray.required_skill_set !== "" &&
      jobArray.required_skill_set !== null
    ) {
      return (
        <div className="d-block mt-4">
          <div className="d-block mb-2">
            <span className="fs-6 fw-bold">Required Skills:</span>
          </div>
          <div className="d-block">
            <span className="text-muted-custom">
              {jobArray.required_skill_set}
            </span>
          </div>
        </div>
      );
    }
  };

  const displayExperience = () => {
    if (
      jobArray.experience_required !== "" &&
      jobArray.experience_required !== null
    ) {
      return (
        <div className="d-block mt-4">
          <div className="d-block mb-2">
            <span className="fs-6 fw-bold">Experience Required:</span>
          </div>
          <div className="d-block">
            <span className="text-muted-custom">
              {jobArray.experience_required}
            </span>
          </div>
        </div>
      );
    }
  };

  const displayLanguage = () => {
    if (
      jobArray.preffered_language !== "" &&
      jobArray.preffered_language !== null
    ) {
      return (
        <div className="d-block mt-4">
          <div className="d-block mb-2">
            <span className="fs-6 fw-bold">Preffered Language:</span>
          </div>
          <div className="d-block">
            <span className="text-muted-custom">
              {jobArray.preffered_language}
            </span>
          </div>
        </div>
      );
    }
  };

  const displayOverviewBlock = () => {
    return (
      <div className="card-custom">
        <div className="card-body">
          {displayDiscription()}
          {displaySkills()}
          {displayExperience()}
          {displayLanguage()}
        </div>
      </div>
    );
  };

  const displayJobDetailsBlock = () => {
    return (
      <>
        {displayHeaderBlock()}
        {displayOverviewBlock()}
        {displayDescriptionModal()}
      </>
    );
    // return (
    //   <div className="d-block">
    //     <div className="d-block border-bottom pb-3">
    //       <span className="h4">{jobArray.job_title}</span>
    //     </div>
    //     <div className="my-3 bg-light p-2 m-1 rounded">
    //       <div className="row d-flex align-items-center">
    //         <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-2 mb-lg-0 mb-xl-0 mb-xxl-0">
    //           <div className="d-block">
    //             <span className="text-dark">Posted By</span>
    //           </div>
    //           <div className="d-block">
    //             <span className="fw-bold">{jobArray.creator_name}</span>
    //           </div>
    //         </div>
    //         <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-2 mb-lg-0 mb-xl-0 mb-xxl-0">
    //           <div className="d-block">
    //             <span className="text-dark">Posted On</span>
    //           </div>
    //           <div className="d-block">
    //             <span className="fw-bold">
    //               {moment(jobArray.created_on).format("MM-DD-YYYY")}
    //             </span>
    //           </div>
    //         </div>
    //         <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-2 mb-lg-0 mb-xl-0 mb-xxl-0">
    //           <div className="d-block">{displayFirm(jobArray.firm_logo)}</div>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="d-block my-4">
    //       <p className="text-black" style={{ whiteSpace: "pre-line" }}>
    //         {jobArray.job_description}
    //       </p>
    //     </div>

    //     <div className="d-flex justify-content-center mt-5 ">
    //       <Button variant="success" size="sm" onClick={() => history.goBack()}>
    //         Back to job listing
    //       </Button>
    //     </div>
    //   </div>
    // );
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

  return <div className="d-block">{displayMainContent()}</div>;
};

export default JobDetails;
