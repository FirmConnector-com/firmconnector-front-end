import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import HeaderSm from "../Headers/HeaderSm";
import InputLebelComponent from "../InputLebel/InputLebelComponent";
import { Button } from "react-bootstrap";
import { AlertDanger, AlertSuccess, AlertInfo } from "../Alerts/Alert";

//import API
import createResource from "../../apis/createResource";
import createResourceFromResume from "../../apis/createResourceFromResume";

const AddResourceForm = () => {
  const history = useHistory();
  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;
  const user_primary_role = JSON.parse(userDetails).user_primary_role;
  const hiddenFileInput = React.useRef(null);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [bio, setBio] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [officePhone, setOfficePhone] = useState("");
  const [buttonText, setButtonText] = useState("Create Account");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [isValidSubmit, setIsValidSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [isResumeButtonDisabled, setIsResumeButtonDisabled] = useState(false);

  const [hasResumeUploadError, setHasResumeUploadError] = useState(false);
  const [isValidResumeUpload, setIsValidResumeUpload] = useState(false);
  const [errorResumeUploadMessage, setErrorResumeUploadMessage] =
    useState(false);
  const [successResumeUploadMessage, setSuccessResumeUploadMessage] =
    useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleJobRoleChange = (e) => {
    setJobRole(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleContactEmailChange = (e) => {
    setContactEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleOfficePhoneChange = (e) => {
    setOfficePhone(e.target.value);
  };

  const displayMainContent = () => {
    return displayFormBlock();
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

    //check for valid email
    const emailPattern =
      // /^([\w-.]+@(?!gmail\.com)(?!yahoo\.com)(?!hotmail\.com)(?!mail\.ru)(?!yandex\.ru)(?!mail\.com)([\w-]+.)+[\w-]{2,4})?$/;
      /^([\w-.]+@(?!mail\.ru)(?!yandex\.ru)(?!mail\.com)([\w-]+.)+[\w-]{2,4})?$/;

    //check for valid phone
    const phonePattern =
      /^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/;

    let isInvalid = 0;
    let errMessage = [];

    if (firstName.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Enter first name");
    }

    if (lastName.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Enter last name");
    }

    if (!emailPattern.test(email)) {
      isInvalid = 1;
      errMessage.push("Enter a valid business email address");
    }

    if (!emailPattern.test(contactEmail)) {
      isInvalid = 1;
      errMessage.push("Enter a valid contact email address");
    }

    if (phone.trim().length > 0) {
      if (!phonePattern.test(phone)) {
        isInvalid = 1;
        errMessage.push("Enter a valid phone number");
      }
    }

    if (isInvalid === 1) {
      setErrorMessage(errMessage);
      setHasSubmitError(true);
      setIsButtonDisabled(false);
      setButtonText("Create Account");
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    let errMessage = [];
    let succMessage = [];

    let formData = {
      user_slug: user_slug,
      email: email,
      firstName: firstName,
      lastName: lastName,
      jobRole: jobRole,
      profileBio: bio,
      contactEmail: contactEmail,
      phone: phone,
      officePhone: officePhone,
    };

    try {
      createResource(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            succMessage.push(data.data.message);
            setSuccessMessage(succMessage);
            setIsValidSubmit(true);
            setHasSubmitError(false);
            setIsButtonDisabled(true);
            setButtonText("Create Account");

            setTimeout(() => {
              window.location.replace(
                "resources/edit-resource/" + data.data.resource_slug
              );
            }, 1000);
          } else if (data.data.status === 0) {
            errMessage.push(data.data.message);
            setErrorMessage(errMessage);
            setHasSubmitError(true);
            setIsButtonDisabled(false);
            setButtonText("Create Account");
          } else {
            errMessage.push(
              "Error happened. Unable to create profile information."
            );
            setErrorMessage(errMessage);
            setHasSubmitError(true);
            setIsButtonDisabled(false);
            setButtonText("Create Account");
          }
        } else {
          errMessage.push(
            "Error happened. Unable to create your profile information"
          );
          setErrorMessage(errMessage);
          setHasSubmitError(true);
          setIsButtonDisabled(false);
          setButtonText("Create Account");
        }
      });
    } catch (error) {
      errMessage.push("Error happened. Network error happened.");
      setErrorMessage(errMessage);
      setHasSubmitError(true);
      setIsButtonDisabled(false);
      setButtonText("Create Account");
    }
  };

  const displayTopBlock = () => {
    return (
      <div className="d-block">
        <div className="d-flex flex-column">
          <span className="display-6">Create Resource Profile</span>
        </div>
        <div className="d-block">
          <p className="text-muted-custom">
            Create a resource profile within your firm
          </p>
        </div>
      </div>
    );
  };

  const displayResumeUpload = () => {
    return (
      <>
        <div className="d-block">
          <form id="create-frm-by-resume">
            <div className="form-button-holder mt-4 mb-4">
              {/* <Button
                variant="primary"
                disabled={isResumeButtonDisabled}
                onClick={handleResumeUpload}
              >
                Upload Resume
              </Button> */}
              <div className="form-group file">
                <label>Upload Resume </label>
                <input
                  type="file"
                  className="form-control"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  accept="application/pdf,application/msword,
            application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />
              </div>

              {isResumeButtonDisabled ? (
                <div className="ms-2 d-flex justify-content-center align-items-center">
                  <span className="text-success-custom">
                    uploading, please wait...
                  </span>
                </div>
              ) : null}
            </div>
            {/* <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: "none" }}
              accept="application/pdf,application/msword,
            application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            /> */}
          </form>
        </div>
        <div className="d-block mt-2">{displayResumeUploadStatusMessage()}</div>
      </>
    );
  };

  const handleResumeUpload = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    uploadResume(fileUploaded);
  };

  const uploadResume = (fileUploaded) => {
    setIsResumeButtonDisabled(true);

    let errMessage = [];
    let succMessage = [];

    let formData = {
      user_slug: user_slug,
      file: fileUploaded,
    };

    try {
      createResourceFromResume(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 0) {
            errMessage.push(data.data.message);
            setErrorResumeUploadMessage(errMessage);
            setHasResumeUploadError(true);
          } else {
            succMessage.push(data.data.message);
            setSuccessResumeUploadMessage(succMessage);
            setIsValidResumeUpload(true);
            setIsResumeButtonDisabled(false);

            setTimeout(() => {
              history.push("resources/details/" + data.data.resource_slug);
            }, 1500);
          }
        } else {
          setErrorResumeUploadMessage(
            "Something wrong happened. Please try again later."
          );
          setHasResumeUploadError(true);
          setIsResumeButtonDisabled(false);

          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const displayForm = () => {
    return (
      <>
        <div className="d-block">
          <p>
            <strong>Please Note</strong>{" "}
            <span className="text-info-light-custom">
              ***Fill up all fields to create a Resource account
            </span>
          </p>
        </div>
        <div className="d-block">
          <div className="card-custom p-3 h-100 bg-white">
            <div className="card-body">
              <form id="create-frm">
                {displayloginBlock()}
                {displayprofileBlock()}
                {displayContactBlock()}
                {displaySubmitButton()}
                {displayStatusMessage()}
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };

  const displayloginBlock = () => {
    return (
      <div className="d-block mb-4">
        <div className="d-block">
          <HeaderSm
            title={"Add login informations"}
            subText={"These informations will be used while login"}
            borderBottom={true}
          />
        </div>

        <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
          <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
            <div className="form-input-holder">
              <InputLebelComponent title="Email Address" />
              <div className="d-block">
                <input
                  type="email"
                  className="form-control-custom"
                  id="email-address"
                  placeholder="Enter email address"
                  onChange={handleEmailChange}
                  value={email}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const displayprofileBlock = () => {
    return (
      <div className="d-block mb-4">
        <div className="d-block">
          <HeaderSm
            title={"Add profile informations"}
            subText={"These informations will be used in profile view"}
            borderBottom={true}
          />
        </div>

        <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
          <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
            <div className="form-input-holder">
              <InputLebelComponent title="First Name" />
              <div className="d-block">
                <input
                  type="text"
                  className="form-control-custom"
                  id="first-name"
                  placeholder="Enter first name"
                  onChange={handleFirstNameChange}
                  value={firstName}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
            <div className="form-input-holder">
              <InputLebelComponent title="Last Name" />
              <div className="d-block">
                <input
                  type="text"
                  className="form-control-custom"
                  id="last-name"
                  placeholder="Enter last name"
                  onChange={handleLastNameChange}
                  value={lastName}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
            <div className="form-input-holder">
              <InputLebelComponent title="Job Role" />
              <div className="d-block">
                <input
                  type="text"
                  className="form-control-custom"
                  id="last-name"
                  placeholder="Enter job role"
                  onChange={handleJobRoleChange}
                  value={jobRole}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-12 col-xlg-12">
            <div className="form-input-holder">
              <InputLebelComponent title="Profile Bio" />
              <div className="d-block">
                <textarea
                  type="textarea"
                  className="form-control-textarea"
                  id="job-role"
                  placeholder="Enter your bio"
                  onChange={handleBioChange}
                  value={bio}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const displayContactBlock = () => {
    return (
      <div className="d-block">
        <div className="d-block">
          <HeaderSm
            title={"Add contact informations"}
            subText={"These informations will be used in profile"}
            borderBottom={true}
          />
        </div>

        <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
          <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
            <div className="form-input-holder">
              <InputLebelComponent title="Contact Email" />
              <div className="d-block">
                <input
                  type="email"
                  className="form-control-custom"
                  id="contact-email"
                  placeholder="Enter contact email"
                  onChange={handleContactEmailChange}
                  value={contactEmail}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
            <div className="form-input-holder">
              <InputLebelComponent title="Phone Number" />
              <div className="d-block">
                <input
                  type="text"
                  className="form-control-custom"
                  id="phone-number"
                  placeholder="Enter phone number"
                  onChange={handlePhoneChange}
                  value={phone}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
            <div className="form-input-holder">
              <InputLebelComponent title="Office Phone" />
              <div className="d-block">
                <input
                  type="text"
                  className="form-control-custom"
                  id="office-phone-number"
                  placeholder="Enter office phone number"
                  onChange={handleOfficePhoneChange}
                  value={officePhone}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const displaySubmitButton = () => {
    return (
      <div className="form-button-holder justify-content-end mt-4">
        <Button
          variant="primary"
          disabled={isButtonDisabled}
          onClick={handleFormSubmit}
        >
          {buttonText}
        </Button>
      </div>
    );
  };

  const displayStatusMessage = () => {
    return (
      <div className="d-block mt-4">
        {displayErrorMessage()} {displaySuccessMessage()}
      </div>
    );
  };

  const displayErrorMessage = () => {
    if (hasSubmitError) {
      return <AlertDanger title={"Oops"} message={errorMessage} />;
    }
  };

  const displaySuccessMessage = () => {
    if (isValidSubmit) {
      return <AlertSuccess title={"Success"} message={successMessage} />;
    }
  };

  const displayResumeUploadStatusMessage = () => {
    return (
      <div className="d-block mt-4">
        {displayResumeUploadErrorMessage()}{" "}
        {displayResumeUploadSuccessMessage()}
      </div>
    );
  };

  const displayResumeUploadErrorMessage = () => {
    if (hasResumeUploadError) {
      return <AlertDanger title={"Oops"} message={errorResumeUploadMessage} />;
    }
  };

  const displayResumeUploadSuccessMessage = () => {
    if (isValidResumeUpload) {
      return (
        <AlertSuccess title={"Success"} message={successResumeUploadMessage} />
      );
    }
  };

  const displayFormBlock = () => {
    if (user_primary_role === "2") {
      return (
        <>
          {displayTopBlock()}
          {displayResumeUpload()}
          {displayForm()}
        </>
      );
    } else {
      return (
        <AlertInfo
          title={"Note"}
          message={"You do not have access to create Resource"}
        />
      );
    }
  };

  return <div className="d-block">{displayMainContent()}</div>;
};

export default AddResourceForm;
