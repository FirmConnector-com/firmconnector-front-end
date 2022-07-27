import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useAuthContext } from "../../../../context/AuthContext";
import InputLebelComponent from "../../../InputLebel/InputLebelComponent";
import getAvailableProposeJob from "../../../../apis/getAvailableProposeJob";
import addProposeJob from "../../../../apis/addProposeJob";
import Dropdown from "react-bootstrap/Dropdown";

const AddProposeForModal = (props) => {
  const { resourceSlug, open, handleClose } = props;
  const { userDetails } = useAuthContext();
  const userSlug = JSON.parse(userDetails).user_slug;

  const [showModal, setShowModal] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isJobLoading, setIsJobLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [apiStatusMessage, setApiStatusMessage] = useState(false);
  const [jobData, setJobData] = useState(false);
  const [jobId, setJobId] = useState(false);
  const [hasSubmitMessage, setHasSubmitMessage] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [buttonText, setButtonText] = useState("Save changes");

  useEffect(() => {
    if (open) {
      setIsJobLoading(true);
      setShowModal(true);
      setIsButtonDisabled(false);
      setHasData(false);
      setJobId(false);
      setIsProcessing(false);
      setButtonText("Save changes");
      setSubmitMessage(false);
      setHasSubmitMessage(false);
      setSubmitError(false);
      setSubmitSuccess(false);
      getAvailableJob();
    } else {
      setIsJobLoading(true);
      setShowModal(false);
      setIsButtonDisabled(false);
      setHasData(false);
      setJobId(false);
      setIsProcessing(false);
      setButtonText("Save changes");
      setSubmitMessage(false);
      setHasSubmitMessage(false);
      setSubmitError(false);
      setSubmitSuccess(false);
    }
  }, [open]);

  const getAvailableJob = () => {
    try {
      getAvailableProposeJob(resourceSlug, userSlug).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            setIsJobLoading(false);
            setJobData(data.data.job_list);
            setHasData(true);
          } else {
            setHasData(false);
            setIsJobLoading(false);
            setApiStatusMessage(data.data.message);
          }
        } else {
          setHasData(false);
          setIsJobLoading(false);
          setApiStatusMessage("No available job found!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClose = () => {
    handleClose();
  };

  const selectJob = (id) => {
    setJobId(id);
  };

  const displayAvailableJobList = () => {
    if (isJobLoading) {
      return (
        <div className="justify-content-center align-items-center d-flex">
          <Spinner animation="grow" role="status" />
        </div>
      );
    } else {
      if (hasData) {
        return displayJobItemList();
      } else {
        return displayNoDataBlock();
      }
    }
  };

  const displayNoDataBlock = () => {
    return (
      <Alert key={"info"} variant={"info"}>
        {apiStatusMessage}
      </Alert>
    );
  };

  const displayJobItemList = () => {
    return (
      <div className="d-block">
        <div className="form-input-holder">
          <p className="text-info-custom">
            Click on any job down below to propose
          </p>
          {displayStatusMessage()}
          {jobData.map(function (item, index) {
            return (
              <div
                className="d-block my-2"
                key={index}
                onClick={() => selectJob(item.job_id)}
              >
                <div
                  className={`card-custom cursor-pointer ${
                    item.job_id === jobId ? "bg-primary" : ""
                  }`}
                >
                  <div className="card-body">
                    <div className="d-block">
                      <span className="fw-bold">
                        {item.job_id} :: {item.job_title}
                      </span>
                    </div>
                    <div className="d-block my-2">
                      <span className="text-dark">Posted by: </span>
                      <span
                        className={`${
                          item.job_id === jobId
                            ? "text-white"
                            : "text-info-custom"
                        }`}
                      >
                        {item.creator_name}
                      </span>

                      {item.firm_name !== "" ? (
                        <span className="text-dark"> ({item.firm_name})</span>
                      ) : (
                        <span className="text-dark"> ({item.user_email})</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const displayStatusMessage = () => {
    if (hasSubmitMessage) {
      return (
        <div className="d-block my-2">
          <Alert
            key={submitError ? "danger" : "success"}
            variant={submitError ? "danger" : "success"}
          >
            {submitMessage}
          </Alert>
        </div>
      );
    }
  };

  const checkSubmit = () => {
    setIsButtonDisabled(true);
    setIsProcessing(true);
    setButtonText("Processing, please wait...");
    setHasSubmitMessage(false);
    setSubmitError(false);
    setSubmitSuccess(false);

    if (jobId > 0) {
      submitForm();
    } else {
      setIsButtonDisabled(false);
      setIsProcessing(false);
      setButtonText("Save changes");
      setHasSubmitMessage(true);
      setSubmitError(true);
      setSubmitSuccess(false);
      setSubmitMessage("Please select a job from the list.");
    }
  };

  const submitForm = () => {
    let formData = {
      r_slug: resourceSlug,
      u_slug: userSlug,
      job_id: jobId,
    };

    try {
      addProposeJob(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            setIsProcessing(false);
            setButtonText("Save changes");
            setHasSubmitMessage(true);
            setSubmitSuccess(true);
            setSubmitMessage(data.data.message);

            setTimeout(() => {
              window.location.reload(false);
            }, 1000);
          } else {
            setIsButtonDisabled(false);
            setIsProcessing(false);
            setButtonText("Save changes");
            setHasSubmitMessage(true);
            setSubmitError(true);
            setSubmitMessage(data.data.message);
          }
        } else {
          setIsButtonDisabled(false);
          setIsProcessing(false);
          setButtonText("Save changes");
          setHasSubmitMessage(true);
          setSubmitError(true);
          setSubmitSuccess(false);
          setSubmitMessage(
            "We are unable to process your request. Please try again later."
          );
        }
      });
    } catch (error) {
      setIsButtonDisabled(false);
      setIsProcessing(false);
      setButtonText("Save changes");
      setHasSubmitMessage(true);
      setSubmitError(true);
      setSubmitSuccess(false);
      setSubmitMessage(
        "We are unable to process your request. Please try again later."
      );

      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => handleModalClose()}
      scrollable={true}
      backdrop="static"
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header>
        <div className="d-block">
          <div className="d-block">
            <span className="h5 fw-bold-custom">Propose a job</span>
          </div>
          <div className="d-block">
            <span className="text-muted-custom text-sm-custom">
              Select a job from below list to propose on candidate profile
            </span>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>{displayAvailableJobList()}</Modal.Body>

      <Modal.Footer>
        <Button
          variant="dark"
          size={"sm"}
          disabled={isButtonDisabled}
          onClick={() => handleClose()}
        >
          Close
        </Button>
        <Button
          variant="primary"
          size={"sm"}
          disabled={isButtonDisabled}
          onClick={() => checkSubmit()}
        >
          {isProcessing ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              {"  "}
            </>
          ) : null}
          {buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(AddProposeForModal);
