import React, { useState, useEffect, useRef } from "react";
import HeaderXSm from "../../Headers/HeaderXSm";
import { Button, Modal } from "react-bootstrap";
import { AlertDanger, AlertSuccess } from "../../Alerts/Alert";
import InputLebelComponent from "../../InputLebel/InputLebelComponent";
import saveResourceAvailability from "../../../apis/saveResourceAvailability";

const ResourceAvailabilityForm = (props) => {
  const { availability_details, resourceSlug } = props;
  const statusRef = useRef(null);
  const executeScroll = () => statusRef.current.scrollIntoView();

  const [availability, setAvailability] = useState(0);
  const [show, setShow] = useState(false);

  const [buttonText, setButtonText] = useState("Save Availability Details");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [isValidSubmit, setIsValidSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (availability_details) {
      setAvailability(parseInt(availability_details.availability));
    }
  }, [availability_details]);

  const handleClose = () => {
    setShow(false);
    window.location.reload(false);
  };

  const handleShow = () => setShow(true);

  const handleChangeAvailability = (val) => {
    setAvailability(val);
  };

  const handleFormSubmit = () => {
    //disable signup button
    setIsButtonDisabled(true);

    //change signup button text while processing
    setButtonText("Processing, please wait...");

    //change alert block content
    setHasSubmitError(false);
    setErrorMessage(false);
    setIsValidSubmit(false);
    setSuccessMessage(false);

    let isInvalid = 0;
    let errMessage = [];

    if (availability < 0) {
      isInvalid = 1;
      errMessage.push("Please select your availability");
    }

    if (isInvalid === 1) {
      executeScroll();
      setErrorMessage(errMessage);
      setHasSubmitError(true);
      setIsButtonDisabled(false);
      setButtonText("Save Availability Details");
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    let errMessage = [];
    let succMessage = [];

    let formData = {
      resourceSlug: resourceSlug,
      availability: availability,
    };

    try {
      saveResourceAvailability(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            succMessage.push(data.data.message);
            setSuccessMessage(succMessage);
            setIsValidSubmit(true);
            setHasSubmitError(false);
            setButtonText("Save Availability Details");
            executeScroll();
            setTimeout(() => {
              setIsValidSubmit(false);
              setHasSubmitError(false);
              setErrorMessage(false);
              setSuccessMessage(false);
              window.location.reload(false);
            }, 1000);
          } else if (data.data.status === 0) {
            executeScroll();
            errMessage.push(data.data.message);
            setErrorMessage(errMessage);
            setHasSubmitError(true);
            setIsButtonDisabled(false);
            setButtonText("Save Availability Details");
          } else {
            executeScroll();
            errMessage.push(
              "Error happened. Unable to save education information."
            );
            setErrorMessage(errMessage);
            setHasSubmitError(true);
            setIsButtonDisabled(false);
            setButtonText("Save Availability Details");
          }
        } else {
          executeScroll();
          errMessage.push(
            "Error happened. Unable to save education information."
          );
          setErrorMessage(errMessage);
          setHasSubmitError(true);
          setIsButtonDisabled(false);
          setButtonText("Save Availability Details");
        }
      });
    } catch (error) {
      executeScroll();
      errMessage.push("Error happened. Network error happened.");
      setErrorMessage(errMessage);
      setHasSubmitError(true);
      setIsButtonDisabled(false);
      setButtonText("Save Availability Details");
    }
  };

  const displayAvailability = () => {
    if (availability === 0) {
      return (
        <>
          <span className="fw-bold">{availability}</span>{" "}
          <span className="text-muted-custom">hr/week</span>
        </>
      );
    } else {
      return (
        <>
          <span>
            <span className="fw-bold">{availability}</span>{" "}
            <span className="text-muted-custom">hrs/week</span>
          </span>
        </>
      );
    }
  };

  const displayUpdateButton = () => {
    return (
      <div className="d-block justify-content-end">
        <Button variant="primary" size="sm" onClick={() => handleShow()}>
          Update Availability
        </Button>
      </div>
    );
  };

  const showModal = () => {
    return (
      <Modal
        show={show}
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
              <span className="h5 fw-bold-custom">
                Update your current availability
              </span>
            </div>
            <div className="d-block">
              <span className="text-muted-custom text-sm-custom">
                Knowing how much you can work per week
              </span>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form id="create-frm">
            <div className="d-block mb-4">
              <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
                <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                  <InputLebelComponent title="I'm available up to" />
                  <div className="d-block mt-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value={40}
                        onChange={() => handleChangeAvailability(40)}
                        checked={availability === 40}
                      />
                      <label
                        className="form-check-label"
                        for="flexRadioDefault1"
                      >
                        40 hrs/week
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        value={30}
                        onChange={() => handleChangeAvailability(30)}
                        checked={availability === 30}
                      />
                      <label
                        className="form-check-label"
                        for="flexRadioDefault2"
                      >
                        30 hrs/week
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault3"
                        value={20}
                        onChange={() => handleChangeAvailability(20)}
                        checked={availability === 20}
                      />
                      <label
                        className="form-check-label"
                        for="flexRadioDefault3"
                      >
                        20 hrs/week
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault4"
                        value={10}
                        onChange={() => handleChangeAvailability(10)}
                        checked={availability === 10}
                      />
                      <label
                        className="form-check-label"
                        for="flexRadioDefault4"
                      >
                        10 hrs/week
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault5"
                        value={5}
                        onChange={() => handleChangeAvailability(5)}
                        checked={availability === 5}
                      />
                      <label
                        className="form-check-label"
                        for="flexRadioDefault5"
                      >
                        5 hrs/week
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault6"
                        value={0}
                        onChange={() => handleChangeAvailability(0)}
                        checked={availability === 0}
                      />
                      <label
                        className="form-check-label"
                        for="flexRadioDefault6"
                      >
                        0 hrs/week
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              {displayCloseButton()}
              {displaySubmitButton()}
            </div>

            <div className="d-block" ref={statusRef}>
              {displayStatusMessage()}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  };

  const displaySubmitButton = () => {
    return (
      <div className="d-block">
        <Button
          variant="primary"
          disabled={isButtonDisabled}
          onClick={handleFormSubmit}
          size="sm"
        >
          {buttonText}
        </Button>
      </div>
    );
  };

  const displayCloseButton = () => {
    return (
      <div className="d-block me-3">
        <Button
          variant="dark"
          disabled={isButtonDisabled}
          onClick={() => closeAddModal()}
          size="sm"
        >
          Close
        </Button>
      </div>
    );
  };

  const closeAddModal = () => {
    setShow(false);

    if (availability_details.availability > 0) {
      setAvailability(availability_details.availability);
    } else {
      setAvailability(0);
    }

    setHasSubmitError(false);
    setIsValidSubmit(false);
    setErrorMessage(false);
    setSuccessMessage(false);
  };

  const displayStatusMessage = () => {
    return (
      <>
        {displayErrorMessage()} {displaySuccessMessage()}
      </>
    );
  };

  const displayErrorMessage = () => {
    if (hasSubmitError) {
      return (
        <div className="d-block mt-4">
          <AlertDanger title={"Oops"} message={errorMessage} />
        </div>
      );
    }
  };

  const displaySuccessMessage = () => {
    if (isValidSubmit) {
      return (
        <div className="d-block mt-4">
          <AlertSuccess title={"Success"} message={successMessage} />
        </div>
      );
    }
  };

  return (
    <>
      <div className="card-custom">
        <div className="card-body">
          <div className="d-block">
            <div className="d-block">
              <HeaderXSm
                title={"Current Availability"}
                subText={null}
                borderBottom={true}
              />
            </div>
            <div className="d-flex align-items-center">
              <span className="text-dark-custom">
                I can currently work {displayAvailability()}
              </span>
            </div>
            <div className="d-flex mt-3 justify-content-end">
              {displayUpdateButton()}
            </div>
          </div>
        </div>
      </div>
      {showModal()}
    </>
  );
};

export default ResourceAvailabilityForm;
