import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import InputLebelComponent from "../../../InputLebel/InputLebelComponent";
import Alert from "react-bootstrap/Alert";
import { useAuthContext } from "../../../../context/AuthContext";

import createNote from "../../../../apis/createNote";

const NoteAddModal = (props) => {
  const { resourceSlug } = props;
  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;

  const [noteText, setNoteText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Save Note");
  const [hasStatusMessage, setHasStatusMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleClose = async () => {
    props.setShow(false);
    window.location.reload(false);
  };

  const displaySubmitButton = () => {
    return (
      <div className="d-block">
        {isProcessing ? (
          <Button variant="primary" size="sm" disabled={isButtonDisabled}>
            <span>{buttonText}</span>
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            disabled={isButtonDisabled}
            onClick={() => handleSubmit()}
          >
            <span>{buttonText}</span>
          </Button>
        )}
      </div>
    );
  };

  const handleSubmit = async () => {
    await setIsProcessing(true);
    await setErrorMessage(false);
    await setHasStatusMessage(false);
    await setSuccessMessage(false);
    await setIsButtonDisabled(true);
    await setButtonText("Processing, please wait...");

    if (noteText.trim().length === 0) {
      await setHasStatusMessage(true);
      await setErrorMessage("Please enter note.");
      await setIsButtonDisabled(false);
      await setButtonText("Save Note");
      await setIsProcessing(false);
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    let formData = {
      resource_slug: resourceSlug,
      r_slug: user_slug,
      note: noteText,
    };

    try {
      createNote(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            setSuccessMessage(data.data.message);
            setHasStatusMessage(true);

            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else {
            setErrorMessage(data.data.message);
            setHasStatusMessage(true);

            setTimeout(() => {
              window.location.reload();
            }, 1500);
          }
        } else {
          setErrorMessage("Something wrong happened. Please try again later.");
          setHasStatusMessage(true);

          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleNoteChange = (e) => {
    setNoteText(e.target.value);
  };

  const closeAddModal = async () => {
    props.setShow(false);
    await setIsProcessing(false);
    await setErrorMessage(false);
    await setHasStatusMessage(false);
    await setSuccessMessage(false);
    await setIsButtonDisabled(false);
    await setButtonText("Save Note");
    await setNoteText("");
  };

  const displayCloseButton = () => {
    return (
      <div className="d-block me-3">
        <Button
          variant="dark"
          onClick={() => closeAddModal()}
          size="sm"
          disabled={isButtonDisabled}
        >
          Close
        </Button>
      </div>
    );
  };

  const displayStatusMessage = () => {
    if (hasStatusMessage) {
      return (
        <div className="d-block mt-3">
          {errorMessage ? (
            <Alert key={"danger"} variant={"danger"}>
              {errorMessage}
            </Alert>
          ) : (
            <Alert key={"success"} variant={"success"}>
              {successMessage}
            </Alert>
          )}
        </div>
      );
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={() => handleClose()}
      scrollable={true}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <div className="d-block">
          <div className="d-block">
            <span className="h5 fw-bold-custom">Add Note</span>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form id="create-frm">
          <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
            <div className="col-12 col-md-12 col-lg-12 col-xlg-12">
              <div className="form-input-holder">
                <InputLebelComponent title="Note" />
                <div className="d-block">
                  <textarea
                    type="textarea"
                    className="form-control"
                    id="add-note"
                    placeholder="Enter note"
                    value={noteText}
                    autoComplete="off"
                    rows={4}
                    onChange={handleNoteChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            {displayCloseButton()}
            {displaySubmitButton()}
          </div>
          {displayStatusMessage()}
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default NoteAddModal;
