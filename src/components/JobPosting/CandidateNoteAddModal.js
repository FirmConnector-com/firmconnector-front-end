import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useAuthContext } from "../../context/AuthContext";
import createJobNote from "../../apis/createJobNote";
import InputLebelComponent from "../InputLebel/InputLebelComponent";

const CandidateNoteAddModal = (props) => {
  const { resourceSlug, open, jobId, handleClose, candidateName } = props;
  const { userDetails } = useAuthContext();
  const userSlug = JSON.parse(userDetails).user_slug;

  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [responseStatus, setResponseStatus] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState("Submit Note");

  useEffect(() => {
    if (open) {
      setShowModal(true);
      setIsProcessing(false);
      setIsButtonDisabled(false);
      setStatusMessage("");
      setResponseStatus(false);
      setHasSubmitError(false);
      setSubmitButtonText("Submit Note");
      setNote("");
    } else {
      setShowModal(false);
    }
  }, [open]);

  const handleModalClose = () => {
    setIsProcessing(false);
    setIsButtonDisabled(false);
    setStatusMessage("");
    setResponseStatus(false);
    setHasSubmitError(false);
    setSubmitButtonText("Submit Note");

    handleClose();
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const checkSubmit = () => {
    setStatusMessage("");
    setResponseStatus(false);
    setHasSubmitError(false);

    if (note.trim().length === 0) {
      setStatusMessage("Please add note.");
      setResponseStatus(true);
      setHasSubmitError(true);
    } else {
      setIsProcessing(true);
      setIsButtonDisabled(true);
      setSubmitButtonText("Processing, please wait");
      submitForm();
    }
  };

  const submitForm = () => {
    let formData = {
      user_slug: userSlug,
      jobId: jobId,
      resourceSlug: resourceSlug,
      note: note,
    };

    try {
      createJobNote(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            setIsProcessing(false);
            setIsButtonDisabled(false);
            setStatusMessage(data.data.message);
            setResponseStatus(true);
            setHasSubmitError(false);
            setSubmitButtonText("Submit Note");
            setNote("");

            setTimeout(() => {
              setStatusMessage("");
              setResponseStatus(false);
              setHasSubmitError(false);
            }, 1500);
          } else {
            setIsProcessing(false);
            setIsButtonDisabled(false);
            setStatusMessage(data.data.message);
            setResponseStatus(true);
            setHasSubmitError(true);
            setSubmitButtonText("Submit Note");
          }
        } else {
          setIsProcessing(false);
          setIsButtonDisabled(false);
          setStatusMessage("Something went wrong. Please try again later.");
          setResponseStatus(true);
          setHasSubmitError(true);
          setSubmitButtonText("Submit Note");
        }
      });
    } catch (error) {
      setIsProcessing(false);
      setIsButtonDisabled(false);
      setStatusMessage("Something went wrong. Please try again later.");
      setResponseStatus(true);
      setHasSubmitError(true);
      setSubmitButtonText("Submit Note");
    }
  };

  const displayMessage = () => {
    if (responseStatus) {
      return (
        <Alert
          key={hasSubmitError ? "danger" : "success"}
          variant={hasSubmitError ? "danger" : "success"}
        >
          {statusMessage}
        </Alert>
      );
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
      centered
    >
      <Modal.Header>
        <div className="d-block">
          <div className="d-block">
            <span className="h5 fw-bold-custom">Add Note</span>
          </div>
          <div className="d-block">
            <span className="text-secondary">
              Add note to{" "}
              <span className="text-info-custom fw-bold">{candidateName}</span>{" "}
              for this job
            </span>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="form-input-holder">
          <InputLebelComponent title="Job Description" />
          <div className="d-block">
            <textarea
              type="textarea"
              className="form-control"
              id="description"
              placeholder="Enter job description"
              onChange={handleNoteChange}
              value={note}
              autoComplete="off"
              rows={3}
            />
          </div>
        </div>
        {displayMessage()}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-dark"
          size={"sm"}
          onClick={() => handleClose()}
          disabled={isButtonDisabled}
        >
          Close
        </Button>
        <Button
          variant="primary"
          size={"sm"}
          onClick={() => checkSubmit()}
          disabled={isButtonDisabled}
          className="d-flex align-items-center"
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
              &nbsp;
            </>
          ) : null}
          {submitButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(CandidateNoteAddModal);
