import React, { useState, useEffect, useRef } from "react";
import HeaderXSm from "../../Headers/HeaderXSm";
import { Button, Modal } from "react-bootstrap";
import InputLebelComponent from "../../InputLebel/InputLebelComponent";
import { AlertDanger, AlertSuccess } from "../../Alerts/Alert";
import moment from "moment";
import saveEducationDetails from "../../../apis/saveEducationDetails";
import removeEducationDetails from "../../../apis/removeEducationDetails";
import getEducationDetails from "../../../apis/getEducationDetails";
import updateEducationDetails from "../../../apis/updateEducationDetails";

import Swal from "sweetalert2";
import swalWithBootstrapButtons from "sweetalert2-react-content";

const ResourceEducationBlock = (props) => {
  const { education_details, resourceSlug } = props;
  const MySwal = swalWithBootstrapButtons(Swal);

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [educationArray, setEducationArray] = useState(false);

  const [degreeName, setDegreeName] = useState("");
  const [subject, setSubject] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [passedOn, setPassedOn] = useState("");
  const [educationId, setEducationId] = useState(false);

  const [buttonText, setButtonText] = useState("Save Education Details");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [isValidSubmit, setIsValidSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const statusRef = useRef(null);
  const executeScroll = () => statusRef.current.scrollIntoView();

  useEffect(() => {
    setEducationArray(education_details);
  }, [education_details]);

  const handleDegreeNameChange = (e) => {
    setDegreeName(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleSchoolNameChange = (e) => {
    setSchoolName(e.target.value);
  };

  const handlePassedOnChange = (e) => {
    setPassedOn(e.target.value);
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

    if (degreeName.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Enter your degree name");
    }

    if (subject.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Enter your subject name");
    }

    if (schoolName.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Enter your school name");
    }

    if (!moment(passedOn, "YYYY-MM-DD").isValid()) {
      isInvalid = 1;
      errMessage.push("Enter your passing year");
    }

    if (isInvalid === 1) {
      executeScroll();
      setErrorMessage(errMessage);
      setHasSubmitError(true);
      setIsButtonDisabled(false);
      setButtonText("Save Education Details");
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    let errMessage = [];
    let succMessage = [];

    let formData = {
      resourceSlug: resourceSlug,
      degreeName: degreeName,
      subject: subject,
      schoolName: schoolName,
      passedOn: passedOn,
    };

    try {
      saveEducationDetails(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            succMessage.push(data.data.message);
            setSuccessMessage(succMessage);
            setIsValidSubmit(true);
            setHasSubmitError(false);
            setButtonText("Save Education Details");
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
            setButtonText("Save Education Details");
          } else {
            executeScroll();
            errMessage.push(
              "Error happened. Unable to save education information."
            );
            setErrorMessage(errMessage);
            setHasSubmitError(true);
            setIsButtonDisabled(false);
            setButtonText("Save Education Details");
          }
        } else {
          executeScroll();
          errMessage.push(
            "Error happened. Unable to save education information."
          );
          setErrorMessage(errMessage);
          setHasSubmitError(true);
          setIsButtonDisabled(false);
          setButtonText("Save Education Details");
        }
      });
    } catch (error) {
      executeScroll();
      errMessage.push("Error happened. Network error happened.");
      setErrorMessage(errMessage);
      setHasSubmitError(true);
      setIsButtonDisabled(false);
      setButtonText("Save Education Details");
    }
  };

  const handleFormUpdate = () => {
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

    if (degreeName !== null) {
      if (degreeName.trim().length === 0) {
        isInvalid = 1;
        errMessage.push("Enter your degree name");
      }
    } else {
      isInvalid = 1;
      errMessage.push("Enter your degree name");
    }

    if (subject !== null) {
      if (subject.trim().length === 0) {
        isInvalid = 1;
        errMessage.push("Enter your subject name");
      }
    } else {
      isInvalid = 1;
      errMessage.push("Enter your subject name");
    }

    if (schoolName !== null) {
      if (schoolName.trim().length === 0) {
        isInvalid = 1;
        errMessage.push("Enter your school name");
      }
    } else {
      isInvalid = 1;
      errMessage.push("Enter your school name");
    }

    if (passedOn !== null) {
      if (!moment(passedOn, "YYYY-MM-DD").isValid()) {
        isInvalid = 1;
        errMessage.push("Enter your passing year");
      }
    } else {
      isInvalid = 1;
      errMessage.push("Enter your passing year");
    }

    if (isInvalid === 1) {
      executeScroll();
      setErrorMessage(errMessage);
      setHasSubmitError(true);
      setIsButtonDisabled(false);
      setButtonText("Save Education Details");
    } else {
      updateForm();
    }
  };

  const updateForm = () => {
    let errMessage = [];
    let succMessage = [];

    let formData = {
      educationId: educationId,
      resourceSlug: resourceSlug,
      degreeName: degreeName,
      subject: subject,
      schoolName: schoolName,
      passedOn: passedOn,
    };

    try {
      updateEducationDetails(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            succMessage.push(data.data.message);
            setSuccessMessage(succMessage);
            setIsValidSubmit(true);
            setHasSubmitError(false);
            setButtonText("Save Education Details");
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
            setButtonText("Save Education Details");
          } else {
            executeScroll();
            errMessage.push(
              "Error happened. Unable to update education information."
            );
            setErrorMessage(errMessage);
            setHasSubmitError(true);
            setIsButtonDisabled(false);
            setButtonText("Save Education Details");
          }
        } else {
          executeScroll();
          errMessage.push(
            "Error happened. Unable to update education information."
          );
          setErrorMessage(errMessage);
          setHasSubmitError(true);
          setIsButtonDisabled(false);
          setButtonText("Save Education Details");
        }
      });
    } catch (error) {
      executeScroll();
      errMessage.push("Error happened. Network error happened.");
      setErrorMessage(errMessage);
      setHasSubmitError(true);
      setIsButtonDisabled(false);
      setButtonText("Save Education Details");
    }
  };

  const displayEducationHistory = () => {
    if (educationArray) {
      return (
        <>
          {educationArray.map((item, index) => {
            return displayEducationBlock(item, index);
          })}
        </>
      );
    } else {
      return (
        <span className="text-muted-custom">Education details not added!</span>
      );
    }
  };

  const displayDegreeName = (education) => {
    return (
      <span className="text-dark-custom fw-bold">
        {education.degree_name !== null ? (
          <span className="text-success-custom">{education.degree_name}</span>
        ) : (
          "Not available"
        )}{" "}
        in {education.subject !== null ? education.subject : "Not available"}
      </span>
    );
  };

  const displaySchoolName = (education) => {
    if (education.school_name !== "" && education.school_name !== null) {
      return (
        <span className="text-info-custom text-x-sm-custom fw-medium-custom">
          {education.school_name}
        </span>
      );
    } else {
      return (
        <span className="text-danger-custom text-x-sm-custom fw-medium-custom">
          Institute name not available
        </span>
      );
    }
  };

  const displayPassedOn = (passedOn) => {
    if (passedOn !== "" && passedOn !== null) {
      return (
        <span className="text-x-sm-custom fw-medium-custom">
          Passed on {passedOn}
        </span>
      );
    }
  };

  const handleClose = () => {
    setShow(false);
    window.location.reload(false);
  };

  const handleShow = () => setShow(true);

  const handleRemoveEducation = async (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "that you want to remove this education record",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      confirmButtonColor: "var(--danger)",
      cancelButtonColor: "var(--black)",
    }).then(async (result) => {
      if (result.isConfirmed) {
        removeSelectedDetails(id);
      } else {
        await setIsButtonDisabled(false);
      }
    });
  };

  const removeSelectedDetails = (id) => {
    let formData = {
      resourceSlug: resourceSlug,
      id: id,
    };

    try {
      removeEducationDetails(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            setEducationArray(
              educationArray.filter((item) => item.education_history_id !== id)
            );
          } else if (data.data.status === 0) {
            await MySwal.fire({
              title: <strong>Success</strong>,
              html: <i>{data.data.message}</i>,
              icon: "danger",
            });

            await setIsButtonDisabled(false);
          } else {
            await MySwal.fire({
              title: <strong>Success</strong>,
              html: <i>{data.data.status}</i>,
              icon: "danger",
            });

            await setIsButtonDisabled(false);
          }
        } else {
          await MySwal.fire({
            title: <strong>Success</strong>,
            html: <i>{data.data.message}</i>,
            icon: "danger",
          });

          await setIsButtonDisabled(false);
        }
      });
    } catch (error) {
      MySwal.fire({
        title: <strong>Success</strong>,
        html: <i>Something wrong happened!</i>,
        icon: "danger",
      });

      setIsButtonDisabled(false);
    }
  };

  const handleEditEducation = (id) => {
    let formData = {
      resourceSlug: resourceSlug,
      id: id,
    };

    try {
      getEducationDetails(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            await setDegreeName(data.data.education_details.degree_name);
            await setSchoolName(data.data.education_details.school_name);
            await setSubject(data.data.education_details.subject);
            await setPassedOn(data.data.education_details.passed_on);
            await setEducationId(
              data.data.education_details.education_history_id
            );
            await setShowEdit(true);
          } else {
            await MySwal.fire({
              title: <strong>Error</strong>,
              html: <i>{data.data.message}</i>,
              icon: "danger",
            });
          }
        } else {
          await MySwal.fire({
            title: <strong>Error</strong>,
            html: <i>{data.data.message}</i>,
            icon: "danger",
          });
        }
      });
    } catch (error) {
      MySwal.fire({
        title: <strong>Success</strong>,
        html: <i>Something wrong happened!</i>,
        icon: "danger",
      });

      setIsButtonDisabled(false);
    }
  };

  const displayAddEducationButton = () => {
    return (
      <div className="d-block justify-content-end">
        <Button variant="primary" size="sm" onClick={() => handleShow()}>
          Add New Education
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
                Add your education details
              </span>
            </div>
            <div className="d-block">
              <span className="text-muted-custom text-sm-custom">
                Please fill the form to save your education details
              </span>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form id="create-frm">
            <div className="d-block mb-4">
              <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
                <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Degree Name" />
                    <div className="d-block">
                      <input
                        type="text"
                        className="form-control-custom-sm"
                        id="degree-name"
                        placeholder="Enter degree name"
                        onChange={handleDegreeNameChange}
                        value={degreeName}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Subject" />
                    <div className="d-block">
                      <input
                        type="text"
                        className="form-control-custom-sm"
                        id="subject"
                        placeholder="Enter your subject"
                        onChange={handleSubjectChange}
                        value={subject}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
                <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Institute Name" />
                    <div className="d-block">
                      <div className="d-block">
                        <input
                          type="text"
                          className="form-control-custom-sm"
                          id="school"
                          placeholder="Enter your school name"
                          onChange={handleSchoolNameChange}
                          value={schoolName}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Passed On" />
                    <div className="d-block">
                      <div className="d-block">
                        <input
                          type="date"
                          className="form-control-custom-sm"
                          id="passed-on"
                          placeholder="Enter year of passing"
                          onChange={handlePassedOnChange}
                          value={passedOn}
                          autoComplete="off"
                          onKeyDown={(e) => {
                            e.preventDefault();
                          }}
                        />
                      </div>
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
    setDegreeName("");
    setSubject("");
    setSchoolName("");
    setPassedOn(false);

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

  //EDIT SECTION --------------------------------------------------------

  const handleCloseEditModal = async () => {
    await setDegreeName("");
    await setSchoolName("");
    await setSubject("");
    await setPassedOn("");
    await setEducationId(false);
    await setShowEdit(false);
  };

  const showEditModal = () => {
    return (
      <Modal
        show={showEdit}
        onHide={() => handleCloseEditModal()}
        scrollable={true}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="d-block">
            <div className="d-block">
              <span className="h5 fw-bold-custom">Edit education details</span>
            </div>
            <div className="d-block">
              <span className="text-muted-custom text-sm-custom">
                Please fill the form to save your education details
              </span>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form id="edit-frm">
            <div className="d-block mb-4">
              <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
                <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Degree Name" />
                    <div className="d-block">
                      <input
                        type="text"
                        className="form-control-custom-sm"
                        id="degree-name-edit"
                        placeholder="Enter degree name"
                        onChange={handleDegreeNameChange}
                        value={degreeName}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Subject" />
                    <div className="d-block">
                      <input
                        type="text"
                        className="form-control-custom-sm"
                        id="subject-edit"
                        placeholder="Enter your subject"
                        onChange={handleSubjectChange}
                        value={subject}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
                <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Institute Name" />
                    <div className="d-block">
                      <div className="d-block">
                        <input
                          type="text"
                          className="form-control-custom-sm"
                          id="school-edit"
                          placeholder="Enter your school name"
                          onChange={handleSchoolNameChange}
                          value={schoolName}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Passed On" />
                    <div className="d-block">
                      <div className="d-block">
                        <input
                          type="date"
                          className="form-control-custom-sm"
                          id="passed-on-edit"
                          placeholder="Enter year of passing"
                          onChange={handlePassedOnChange}
                          value={passedOn}
                          autoComplete="off"
                          onKeyDown={(e) => {
                            e.preventDefault();
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              {displayEditModalCloseButton()}
              {displayEditModalSubmitButton()}
            </div>

            <div className="d-block" ref={statusRef}>
              {displayStatusMessage()}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  };

  const displayEditModalSubmitButton = () => {
    return (
      <div className="d-block">
        <Button
          variant="primary"
          disabled={isButtonDisabled}
          onClick={handleFormUpdate}
          size="sm"
        >
          {buttonText}
        </Button>
      </div>
    );
  };

  const displayEditModalCloseButton = () => {
    return (
      <div className="d-block me-3">
        <Button
          variant="dark"
          disabled={isButtonDisabled}
          onClick={() => handleCloseEditModal()}
          size="sm"
        >
          Close
        </Button>
      </div>
    );
  };

  const displayEducationBlock = (education, key) => {
    return (
      <div
        data-id={education.education_history_id}
        key={key}
        className="col-12 mb-3"
      >
        <div className="d-block d-md-flex d-xl-flex d-lg-flex row align-items-center border-bottom-light mb-3">
          <div className="col-12 col-md-8 col-lg-8 col-xl-8 mb-3">
            <div className="d-block">{displayDegreeName(education)}</div>
            <div className="d-block">{displaySchoolName(education)}</div>
            <div className="d-block">
              {displayPassedOn(education.passed_on)}
            </div>
          </div>
          <div className="col-12 col-md-2 col-lg-2 col-xl-2 mb-3">
            <div className="d-flex justify-content-md-end justify-content-lg-end justify-content-xl-end justify-content-xxl-end justify-content-sm-start">
              <Button
                variant="success"
                disabled={isButtonDisabled}
                onClick={() =>
                  handleEditEducation(education.education_history_id)
                }
                size="sm"
              >
                Edit Item
              </Button>
            </div>
          </div>
          <div className="col-12 col-md-2 col-lg-2 col-xl-2 mb-3">
            <div className="d-flex justify-content-md-end justify-content-lg-end justify-content-xl-end justify-content-xxl-end justify-content-sm-start">
              <Button
                variant="danger"
                disabled={isButtonDisabled}
                onClick={() =>
                  handleRemoveEducation(education.education_history_id)
                }
                size="sm"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card-custom">
      <div className="card-body">
        <div className="d-block">
          <div className="d-block">
            <HeaderXSm
              title={"Education History"}
              subText={null}
              borderBottom={true}
            />
          </div>
          <div className="d-block mb-3">{displayAddEducationButton()}</div>
          <div className="d-block">{displayEducationHistory()}</div>
        </div>
        {showModal()}
        {showEditModal()}
      </div>
    </div>
  );
};

export default ResourceEducationBlock;
