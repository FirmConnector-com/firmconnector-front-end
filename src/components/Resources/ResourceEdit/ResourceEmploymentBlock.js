import React, { useState, useEffect, useRef } from "react";
import HeaderXSm from "../../Headers/HeaderXSm";
import { Button, Modal } from "react-bootstrap";
import InputLebelComponent from "../../InputLebel/InputLebelComponent";
import { AlertDanger, AlertSuccess } from "../../Alerts/Alert";
import moment from "moment";
import saveEmploymentDetails from "../../../apis/saveEmploymentDetails";
import updateEmploymentDetails from "../../../apis/updateEmploymentDetails";
import removeEmploymentDetails from "../../../apis/removeEmploymentDetails";
import getEmploymentDetails from "../../../apis/getEmploymentDetails";
import EmploymentContent from "../CommonComponents/EmploymentContent";

import Swal from "sweetalert2";
import swalWithBootstrapButtons from "sweetalert2-react-content";

const ResourceEmploymentBlock = (props) => {
  const { employment_details, resourceSlug } = props;
  const MySwal = swalWithBootstrapButtons(Swal);

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [employmentArray, setEmploymentArray] = useState(false);

  const [employerName, setEmployerName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [isCurrent, setIsCurrent] = useState(2);
  const [isEndDateInputDisabled, setIsEndDateInputDisabled] = useState(false);
  const [employmentId, setEmploymentId] = useState(false);

  const [buttonText, setButtonText] = useState("Save Employment Details");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [isValidSubmit, setIsValidSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const statusRef = useRef(null);
  const executeScroll = () => statusRef.current.scrollIntoView();

  useEffect(() => {
    setEmploymentArray(employment_details);
  }, [employment_details]);

  const handleEmployerNameChange = (e) => {
    setEmployerName(e.target.value);
  };

  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
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

    if (employerName.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Enter your employer name");
    }

    if (jobTitle.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Enter job title");
    }

    if (jobType !== 1 && jobType !== 2) {
      isInvalid = 1;
      errMessage.push("Select your job type");
    }

    if (!moment(startDate, "YYYY-MM-DD").isValid()) {
      isInvalid = 1;
      errMessage.push("Enter valid start date");
    }

    if (isCurrent === 2) {
      if (!moment(endDate, "YYYY-MM-DD").isValid()) {
        isInvalid = 1;
        errMessage.push("Enter valid end date");
      }

      if (moment(endDate, "YYYY-MM-DD") < moment(startDate, "YYYY-MM-DD")) {
        isInvalid = 1;
        errMessage.push("End date should be grater than start date");
      }
    }

    if (description.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Enter job description");
    }

    if (countryCode.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Select country");
    }

    if (province.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Select province");
    }

    if (city.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Select city");
    }

    if (isInvalid === 1) {
      executeScroll();
      setErrorMessage(errMessage);
      setHasSubmitError(true);
      setIsButtonDisabled(false);
      setButtonText("Save Employment Details");
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    let errMessage = [];
    let succMessage = [];

    let formData = {
      resourceSlug: resourceSlug,
      employer_name: employerName,
      job_title: jobTitle,
      job_type: jobType,
      start_date: startDate,
      end_date: endDate,
      description: description,
      country_code: countryCode,
      province: province,
      city: city,
      is_current: isCurrent,
    };

    try {
      saveEmploymentDetails(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            succMessage.push(data.data.message);
            setSuccessMessage(succMessage);
            setIsValidSubmit(true);
            setHasSubmitError(false);
            setButtonText("Save Employment Details");
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
            setButtonText("Save Employment Details");
          } else {
            executeScroll();
            errMessage.push(
              "Error happened. Unable to save employment information."
            );
            setErrorMessage(errMessage);
            setHasSubmitError(true);
            setIsButtonDisabled(false);
            setButtonText("Save Employment Details");
          }
        } else {
          executeScroll();
          errMessage.push(
            "Error happened. Unable to save employment information."
          );
          setErrorMessage(errMessage);
          setHasSubmitError(true);
          setIsButtonDisabled(false);
          setButtonText("Save Employment Details");
        }
      });
    } catch (error) {
      executeScroll();
      errMessage.push("Error happened. Network error happened.");
      setErrorMessage(errMessage);
      setHasSubmitError(true);
      setIsButtonDisabled(false);
      setButtonText("Save Employment Details");
    }
  };

  const handleFormSubmitEdit = () => {
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

    if (employerName !== null) {
      if (employerName.trim().length === 0) {
        isInvalid = 1;
        errMessage.push("Enter your employer name");
      }
    } else {
      isInvalid = 1;
      errMessage.push("Enter your employer name");
    }

    if (jobTitle !== null) {
      if (jobTitle.trim().length === 0) {
        isInvalid = 1;
        errMessage.push("Enter job title");
      }
    } else {
      isInvalid = 1;
      errMessage.push("Enter job title");
    }

    if (jobType !== null) {
      if (jobType !== 1 && jobType !== 2) {
        isInvalid = 1;
        errMessage.push("Select your job type");
      }
    } else {
      isInvalid = 1;
      errMessage.push("Select your job type");
    }

    if (startDate !== null) {
      if (!moment(startDate, "YYYY-MM-DD").isValid()) {
        isInvalid = 1;
        errMessage.push("Enter valid start date");
      }
    } else {
      isInvalid = 1;
      errMessage.push("Enter valid start date");
    }

    if (isCurrent === 2) {
      if (endDate !== null) {
        if (!moment(endDate, "YYYY-MM-DD").isValid()) {
          isInvalid = 1;
          errMessage.push("Enter valid end date");
        }
      } else {
        isInvalid = 1;
        errMessage.push("Enter valid end date");
      }

      if (moment(endDate, "YYYY-MM-DD") < moment(startDate, "YYYY-MM-DD")) {
        isInvalid = 1;
        errMessage.push("End date should be grater than start date");
      }
    }

    if (description !== null) {
      if (description.trim().length === 0) {
        isInvalid = 1;
        errMessage.push("Enter job description");
      }
    } else {
      isInvalid = 1;
      errMessage.push("Enter job description");
    }

    if (countryCode !== null) {
      if (countryCode.trim().length === 0) {
        isInvalid = 1;
        errMessage.push("Select country");
      }
    } else {
      isInvalid = 1;
      errMessage.push("Select country");
    }

    if (province !== null) {
      if (province.trim().length === 0) {
        isInvalid = 1;
        errMessage.push("Select province");
      }
    } else {
      isInvalid = 1;
      errMessage.push("Select province");
    }

    if (city !== null) {
      if (city.trim().length === 0) {
        isInvalid = 1;
        errMessage.push("Select city");
      }
    } else {
      isInvalid = 1;
      errMessage.push("Select city");
    }

    if (isInvalid === 1) {
      executeScroll();
      setErrorMessage(errMessage);
      setHasSubmitError(true);
      setIsButtonDisabled(false);
      setButtonText("Save Employment Details");
    } else {
      submitEditForm();
    }
  };

  const submitEditForm = () => {
    let errMessage = [];
    let succMessage = [];

    let formData = {
      employmentId: employmentId,
      resourceSlug: resourceSlug,
      employer_name: employerName,
      job_title: jobTitle,
      job_type: jobType,
      start_date: startDate,
      end_date: endDate,
      description: description,
      country_code: countryCode,
      province: province,
      city: city,
      is_current: isCurrent,
    };

    try {
      updateEmploymentDetails(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            succMessage.push(data.data.message);
            setSuccessMessage(succMessage);
            setIsValidSubmit(true);
            setHasSubmitError(false);
            setButtonText("Save Employment Details");
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
            setButtonText("Save Employment Details");
          } else {
            executeScroll();
            errMessage.push(
              "Error happened. Unable to save employment information."
            );
            setErrorMessage(errMessage);
            setHasSubmitError(true);
            setIsButtonDisabled(false);
            setButtonText("Save Employment Details");
          }
        } else {
          executeScroll();
          errMessage.push(
            "Error happened. Unable to save employment information."
          );
          setErrorMessage(errMessage);
          setHasSubmitError(true);
          setIsButtonDisabled(false);
          setButtonText("Save Employment Details");
        }
      });
    } catch (error) {
      executeScroll();
      errMessage.push("Error happened. Network error happened.");
      setErrorMessage(errMessage);
      setHasSubmitError(true);
      setIsButtonDisabled(false);
      setButtonText("Save Employment Details");
    }
  };

  const displayEmploymentHistory = () => {
    if (employmentArray) {
      return (
        <>
          {employmentArray.map((item, index) => {
            return displayEmploymentBlock(item, index);
          })}
        </>
      );
    } else {
      return (
        <span className="text-muted-custom">Employment details not added!</span>
      );
    }
  };

  const handleClose = () => {
    setShow(false);
    window.location.reload(false);
  };

  const handleShow = () => setShow(true);

  const handleRemoveEmployment = async (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "that you want to remove this employment record",
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
      removeEmploymentDetails(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            setEmploymentArray(
              employmentArray.filter(
                (item) => item.employment_history_id !== id
              )
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

  const handleEditEmployment = async (id) => {
    let formData = {
      resourceSlug: resourceSlug,
      id: id,
    };

    try {
      getEmploymentDetails(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            await setEmployerName(data.data.employment_details.employer_name);
            await setJobTitle(data.data.employment_details.job_title);
            await setJobType(parseInt(data.data.employment_details.job_type));
            await setStartDate(data.data.employment_details.start_date);

            await setDescription(data.data.employment_details.description);
            await setCountryCode(data.data.employment_details.country_code);
            await setProvince(data.data.employment_details.province);
            await setCity(data.data.employment_details.city);
            await setIsCurrent(
              parseInt(data.data.employment_details.is_current)
            );
            await setEmploymentId(
              data.data.employment_details.employment_history_id
            );

            if (parseInt(data.data.employment_details.is_current) === 1) {
              await setIsEndDateInputDisabled(true);
            }
            if (parseInt(data.data.employment_details.is_current) === 1) {
              await setEndDate(false);
            } else {
              await setEndDate(data.data.employment_details.end_date);
            }

            await setShowEdit(true);
          } else if (data.data.status === 0) {
            await MySwal.fire({
              title: <strong>Success</strong>,
              html: <i>{data.data.message}</i>,
              icon: "danger",
            });

            await setIsButtonDisabled(false);
          } else {
            await MySwal.fire({
              title: <strong>Error</strong>,
              html: <i>{data.data.status}</i>,
              icon: "danger",
            });

            await setIsButtonDisabled(false);
          }
        } else {
          await MySwal.fire({
            title: <strong>Error</strong>,
            html: <i>{data.data.message}</i>,
            icon: "danger",
          });

          await setIsButtonDisabled(false);
        }
      });
    } catch (error) {
      MySwal.fire({
        title: <strong>Error</strong>,
        html: <i>Something wrong happened!</i>,
        icon: "danger",
      });

      setIsButtonDisabled(false);
    }
  };

  const displayAddEmploymentButton = () => {
    return (
      <div className="d-block justify-content-end">
        <Button variant="primary" size="sm" onClick={() => handleShow()}>
          Add Employment Details
        </Button>
      </div>
    );
  };

  const handleChangeIsCurrentlyWorkingHere = async () => {
    if (isCurrent === 1) {
      await setIsCurrent(2);
      await setIsEndDateInputDisabled(false);
    } else {
      await setIsCurrent(1);
      await setIsEndDateInputDisabled(true);
      await setEndDate("");
    }
  };

  const handleChangeEmploymentType = async (type) => {
    await setJobType(type);
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
                Add your employment details
              </span>
            </div>
            <div className="d-block">
              <span>Please fill the form to save your employment details</span>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form id="create-frm">
            <div className="d-block mb-4">
              <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
                <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Your Organization" />
                    <div className="d-block">
                      <input
                        type="text"
                        className="form-control-custom-sm"
                        id="employer-name"
                        placeholder="Enter organization name"
                        onChange={handleEmployerNameChange}
                        value={employerName}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Your Designation" />
                    <div className="d-block">
                      <input
                        type="text"
                        className="form-control-custom-sm"
                        id="job-title"
                        placeholder="Enter your job role"
                        onChange={handleJobTitleChange}
                        value={jobTitle}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
                <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Employment Type" />
                    <div className="d-flex">
                      <div
                        className={
                          jobType === 1
                            ? "job-type-radio-button-active me-3"
                            : "job-type-radio-button-inactive me-3"
                        }
                        onClick={() => handleChangeEmploymentType(1)}
                      >
                        <span className="text-x-sm-custom fw-medium-custom">
                          Permanent
                        </span>
                      </div>
                      <div
                        className={
                          jobType === 2
                            ? "job-type-radio-button-active me-3"
                            : "job-type-radio-button-inactive"
                        }
                        onClick={() => handleChangeEmploymentType(2)}
                      >
                        <span className="text-x-sm-custom fw-medium-custom">
                          Part-time
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Is this your current company?" />
                    <div className="d-flex">
                      <div
                        className={
                          isCurrent === 1
                            ? "currently-working-button-active"
                            : "currently-working-button-inactive"
                        }
                        onClick={() => handleChangeIsCurrentlyWorkingHere()}
                      >
                        <span className="text-x-sm-custom fw-medium-custom">
                          Yes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
                <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Start Date" />
                    <div className="d-block">
                      <div className="d-block">
                        <input
                          type="date"
                          className="form-control-custom-sm"
                          id="start-date"
                          placeholder="Enter start date"
                          onChange={handleStartDateChange}
                          value={startDate}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                  <div className="form-input-holder">
                    <InputLebelComponent title="End Date" />
                    <div className="d-block">
                      <div className="d-block">
                        <input
                          type="date"
                          className="form-control-custom-sm"
                          id="end-date"
                          placeholder="Enter end date"
                          onChange={handleEndDateChange}
                          value={endDate}
                          autoComplete="off"
                          disabled={isEndDateInputDisabled}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-block">
                <div className="col-12">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Describe your Job Profile" />
                    <div className="d-block">
                      <textarea
                        type="text"
                        className="form-control-textarea-custom-sm"
                        id="job-description"
                        placeholder="Enter job description"
                        onChange={handleDescriptionChange}
                        value={description}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
                <div className="col-12 col-md-4 col-lg-4 col-xlg-4">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Select Country" />
                    <div className="d-block">
                      <input
                        type="text"
                        className="form-control-custom-sm"
                        id="country"
                        placeholder="Select Country"
                        onChange={handleCountryCodeChange}
                        value={countryCode}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 col-lg-4 col-xlg-4">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Select Provience" />
                    <div className="d-block">
                      <input
                        type="text"
                        className="form-control-custom-sm"
                        id="provience"
                        placeholder="Select Provience"
                        onChange={handleProvinceChange}
                        value={province}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 col-lg-4 col-xlg-4">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Select City" />
                    <div className="d-block">
                      <input
                        type="text"
                        className="form-control-custom-sm"
                        id="city"
                        placeholder="Select City"
                        onChange={handleCityChange}
                        value={city}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="d-flex justify-content-end">
            {displayCloseButton()}
            {displaySubmitButton()}
          </div>
          <div className="d-block" ref={statusRef}>
            {displayStatusMessage()}
          </div>
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

    setEmployerName("");
    setJobTitle("");
    setJobType(1);
    setStartDate("");
    setEndDate("");
    setDescription("");
    setCountryCode("");
    setProvince("");
    setCity("");
    setIsCurrent(2);
    setIsEndDateInputDisabled(false);

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

  const handleCloseEditModal = async () => {
    await setEmployerName("");
    await setJobTitle("");
    await setJobType(1);
    await setStartDate(false);
    await setEndDate(false);
    await setDescription("");
    await setCountryCode("");
    await setProvince("");
    await setCity("");
    await setIsCurrent(2);
    await setEmploymentId(false);
    await setIsEndDateInputDisabled(false);
    setShowEdit(false);
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
              <span className="h5 fw-bold-custom">
                Edit your employment details
              </span>
            </div>
            <div className="d-block">
              <span>
                Please fill the form to update your employment details
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
                    <InputLebelComponent title="Your Organization" />
                    <div className="d-block">
                      <input
                        type="text"
                        className="form-control-custom-sm"
                        id="employer-name"
                        placeholder="Enter organization name"
                        onChange={handleEmployerNameChange}
                        value={employerName}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Your Designation" />
                    <div className="d-block">
                      <input
                        type="text"
                        className="form-control-custom-sm"
                        id="job-title"
                        placeholder="Enter your job role"
                        onChange={handleJobTitleChange}
                        value={jobTitle}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
                <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Employment Type" />
                    <div className="d-flex">
                      <div
                        className={
                          jobType === 1
                            ? "job-type-radio-button-active me-3"
                            : "job-type-radio-button-inactive me-3"
                        }
                        onClick={() => handleChangeEmploymentType(1)}
                      >
                        <span className="text-x-sm-custom fw-medium-custom">
                          Permanent
                        </span>
                      </div>
                      <div
                        className={
                          jobType === 2
                            ? "job-type-radio-button-active me-3"
                            : "job-type-radio-button-inactive"
                        }
                        onClick={() => handleChangeEmploymentType(2)}
                      >
                        <span className="text-x-sm-custom fw-medium-custom">
                          Part-time
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Is this your current company?" />
                    <div className="d-flex">
                      <div
                        className={
                          isCurrent === 1
                            ? "currently-working-button-active"
                            : "currently-working-button-inactive"
                        }
                        onClick={() => handleChangeIsCurrentlyWorkingHere()}
                      >
                        <span className="text-x-sm-custom fw-medium-custom">
                          Yes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
                <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Start Date" />
                    <div className="d-block">
                      <div className="d-block">
                        <input
                          type="date"
                          className="form-control-custom-sm"
                          id="start-date"
                          placeholder="Enter start date"
                          onChange={handleStartDateChange}
                          value={startDate}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                  <div className="form-input-holder">
                    <InputLebelComponent title="End Date" />
                    <div className="d-block">
                      <div className="d-block">
                        <input
                          type="date"
                          className="form-control-custom-sm"
                          id="end-date"
                          placeholder="Enter end date"
                          onChange={handleEndDateChange}
                          value={endDate}
                          autoComplete="off"
                          disabled={isEndDateInputDisabled}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-block">
                <div className="col-12">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Describe your Job Profile" />
                    <div className="d-block">
                      <textarea
                        type="text"
                        className="form-control-textarea-custom-sm"
                        id="job-description"
                        placeholder="Enter job description"
                        onChange={handleDescriptionChange}
                        value={description}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
                <div className="col-12 col-md-4 col-lg-4 col-xlg-4">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Select Country" />
                    <div className="d-block">
                      <input
                        type="text"
                        className="form-control-custom-sm"
                        id="country"
                        placeholder="Enter Country"
                        onChange={handleCountryCodeChange}
                        value={countryCode}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 col-lg-4 col-xlg-4">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Enter State / Province" />
                    <div className="d-block">
                      <input
                        type="text"
                        className="form-control-custom-sm"
                        id="provience"
                        placeholder="State / Province"
                        onChange={handleProvinceChange}
                        value={province}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4 col-lg-4 col-xlg-4">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Select City" />
                    <div className="d-block">
                      <input
                        type="text"
                        className="form-control-custom-sm"
                        id="city"
                        placeholder="Enter City"
                        onChange={handleCityChange}
                        value={city}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="d-flex justify-content-end">
            {displayCloseButtonEditModal()}
            {displaySubmitButtonEditModal()}
          </div>
          <div className="d-block" ref={statusRef}>
            {displayStatusMessage()}
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  const displaySubmitButtonEditModal = () => {
    return (
      <div className="d-block">
        <Button
          variant="primary"
          disabled={isButtonDisabled}
          onClick={handleFormSubmitEdit}
          size="sm"
        >
          {buttonText}
        </Button>
      </div>
    );
  };

  const displayCloseButtonEditModal = () => {
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

  const displayEmploymentBlock = (employment, key) => {
    return (
      <div className="d-block d-md-flex d-xl-flex d-lg-flex row align-items-center border-bottom-light mb-3">
        <div className="col-12 col-md-8 col-lg-8 col-xl-8 mb-3">
          <EmploymentContent employmentDetails={employment} />
        </div>
        <div className="col-12 col-md-2 col-lg-2 col-xl-2 mb-3">
          <div className="d-flex justify-content-md-end justify-content-lg-end justify-content-xl-end justify-content-xxl-end justify-content-sm-start">
            <Button
              variant="success"
              disabled={isButtonDisabled}
              onClick={() =>
                handleEditEmployment(employment.employment_history_id)
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
                handleRemoveEmployment(employment.employment_history_id)
              }
              size="sm"
            >
              Remove
            </Button>
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
              title={"Employment History"}
              subText={null}
              borderBottom={true}
            />
          </div>
          <div className="d-block mb-3">{displayAddEmploymentButton()}</div>
          <div className="d-block">{displayEmploymentHistory()}</div>
        </div>
        {showModal()}
        {showEditModal()}
      </div>
    </div>
  );
};

export default ResourceEmploymentBlock;
