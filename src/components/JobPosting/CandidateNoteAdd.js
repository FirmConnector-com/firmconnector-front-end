import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { Button } from "react-bootstrap";
import { useAuthContext } from "../../context/AuthContext";
import createJobNote from "../../apis/createJobNote";

const CandidateNoteAdd = (props) => {
  const { resourceSlug, jobId, handleClose, updateNoteList } = props;
  const { userDetails } = useAuthContext();
  const userSlug = JSON.parse(userDetails).user_slug;

  const [note, setNote] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [responseStatus, setResponseStatus] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState("Submit Note");

  useEffect(() => {
    setIsProcessing(false);
    setIsButtonDisabled(false);
    setStatusMessage("");
    setResponseStatus(false);
    setHasSubmitError(false);
    setSubmitButtonText("Submit Note");
    setNote("");
  }, []);

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
            setResponseStatus(true);
            setHasSubmitError(false);
            setSubmitButtonText("Submit Note");
            setNote("");
            setStatusMessage("");
            setResponseStatus(false);
            setHasSubmitError(false);
            await updateNoteList(data.data.note_array);
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
          className="mb-2 w-100"
        >
          {statusMessage}
        </Alert>
      );
    }
  };

  return (
    <div className="d-flex w-100 flex-column align-items-center">
      <div className="w-100 d-flex align-items-center justify-content-center mb-2">
        <div className="form-input-holder mb-0 w-100">
          <div className="d-block">
            <textarea
              type="textarea"
              className="form-control"
              id="note"
              placeholder="Enter your note"
              onChange={handleNoteChange}
              value={note}
              autoComplete="off"
              rows={1}
            />
          </div>
        </div>
      </div>
      <div className="w-100 d-flex">{displayMessage()}</div>
      <div className="w-100 d-flex justify-content-end">
        <Button
          variant="dark"
          size={"sm"}
          onClick={() => handleClose()}
          disabled={isButtonDisabled}
          className="me-2"
        >
          Cancel
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
      </div>
    </div>
  );
};

export default React.memo(CandidateNoteAdd);
