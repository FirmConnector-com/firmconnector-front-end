import React, { useEffect, useState } from "react";
import { FIRM_IMAGE_BASE } from "../../config/env";
import getJobDetails from "../../apis/getJobDetails";
import Spinner from "react-bootstrap/Spinner";
import { Button } from "react-bootstrap";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProposedCandidate from "./ProposedCandidate";
import Requirements from "./Requirements";
import AIMatching from "./AIMatching";

import { useAuthContext } from "../../context/AuthContext";

const JobDetails = (props) => {
  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;

  const { jobSlug } = props;
  const [isJobDetailsLoading, setIsJobDetailsLoading] = useState(true);
  const [jobArray, setJobArray] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState("candidates");

  useEffect(() => {
    if (jobSlug) {
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
          <div className="justify-content-center align-items-center d-flex">
            <Spinner animation="grow" role="status" />
          </div>
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
          <div className="d-block mb-3">
            <h5 className="text-info-custom">{jobArray.job_title}</h5>
            <div className="d-dlock">
              <span className="text-secondary">Job ID :</span>{" "}
              <span className="text-dark fw-bold">{jobArray.job_id}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="d-dlock">
                <span className="text-secondary">Posted by :</span>{" "}
                <span className="text-info-custom">
                  {jobArray.creator_name}
                </span>
              </div>
              <div className="d-block">
                <span className="text-secondary">Posted on :</span>{" "}
                <span className="text-dark">
                  {moment(jobArray.created_on).format("MMMM Do, YYYY")}
                </span>
              </div>
            </div>
            <div className="col-6 d-flex justify-content-end align-items-center">
              {displayFirm(jobArray.firm_logo)}
            </div>
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
      if (jobArray.job_description.length > 200) {
        return (
          <>
            <span className="text-muted-custom">
              {jobArray.job_description.substr(0, 199) + "..."}
            </span>{" "}
            <span
              className="text-info-custom cursor-pointer fw-bold"
              onClick={() => setIsOpen(true)}
            >
              Read more
            </span>
          </>
        );
      } else {
        return <span>{jobArray.job_description}</span>;
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
              <span className="fs-6 fw-bold-custom">Job Overview</span>
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
        <div className="d-block mt-3">
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
        <div className="d-block mt-3">
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
        <div className="d-block mt-3">
          <div className="d-block mb-2">
            <span className="fs-6 fw-bold">Preferred Language:</span>
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

  const displayTabSection = () => {
    return (
      <div className="card-custom my-4 bg-light">
        <div className="card-body">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="candidates" title="Candidates">
              <ProposedCandidate jobSlug={jobSlug} user_slug={user_slug} />
            </Tab>
            <Tab eventKey="requirements" title="Requirements">
              <Requirements />
            </Tab>
            <Tab eventKey="aiMatching" title="AI Matching">
              <AIMatching />
            </Tab>
          </Tabs>
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
        {displayTabSection()}
      </>
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

  return <div className="d-block">{displayMainContent()}</div>;
};

export default JobDetails;
