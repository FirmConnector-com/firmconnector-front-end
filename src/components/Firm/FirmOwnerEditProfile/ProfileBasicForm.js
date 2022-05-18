import React, { useState, useEffect } from "react";
import { Button, Modal, Image } from "react-bootstrap";
import { AlertDanger, AlertSuccess } from "../../Alerts/Alert";

import InputLebelComponent from "../../InputLebel/InputLebelComponent";
import HeaderXSm from "../../Headers/HeaderXSm";
import { PROFILE_IMAGE_BASE } from "../../../config/env";

import updateProfileBasicInfo from "../../../apis/updateProfileBasicInfo";
import userAvatarUpload from "../../../apis/userAvatarUpload";

const ProfileBasicForm = (props) => {
  const { userDetails, userSlug } = props;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [bio, setBio] = useState("");
  const [buttonText, setButtonText] = useState("Update Profile Informations");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [isValidSubmit, setIsValidSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [hasFileToUpload, setHasFileToUpload] = useState(null);
  const [selectedFilePath, setSelectedFilePath] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [fileUploadErrorMessage, setFileUploadErrorMessage] = useState(false);
  const [modalButtonDisabled, setModalButtonDisabled] = useState(false);

  useEffect(() => {
    if (userDetails) {
      setFirstName(userDetails.first_name);
      setLastName(userDetails.last_name);
      setJobRole(userDetails.user_profile_role);
      setBio(userDetails.profile_bio);
      setFile(PROFILE_IMAGE_BASE + userDetails.profile_image_path);
      setUploadedFile(PROFILE_IMAGE_BASE + userDetails.profile_image_path);
    }
  }, [userDetails]);

  useEffect(() => {}, [firstName, lastName]);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  // const handleJobRoleChange = (e) => {
  //   setJobRole(e.target.value);
  // };

  // const handleBioChange = (e) => {
  //   setBio(e.target.value);
  // };

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

    if (firstName.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Enter first name");
    }

    if (lastName.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Enter last name");
    }

    if (isInvalid === 1) {
      setErrorMessage(errMessage);
      setHasSubmitError(true);
      setIsButtonDisabled(false);
      setButtonText("Update Profile Informations");
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    let errMessage = [];
    let succMessage = [];

    let formData = {
      userSlug: userSlug,
      firstName: firstName,
      lastName: lastName,
      jobRole: jobRole,
      bio: bio,
    };

    try {
      updateProfileBasicInfo(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            succMessage.push(data.data.message);
            setSuccessMessage(succMessage);
            setIsValidSubmit(true);
            setHasSubmitError(false);
            setModalButtonDisabled(false);
            setButtonText("Update Profile Informations");

            setTimeout(() => {
              setIsValidSubmit(false);
              setHasSubmitError(false);
              setErrorMessage(false);
              setSuccessMessage(false);
              setIsButtonDisabled(false);
            }, 2000);
          } else if (data.data.status === 0) {
            errMessage.push(data.data.message);
            setErrorMessage(errMessage);
            setHasSubmitError(true);
            setIsButtonDisabled(false);
            setButtonText("Update Profile Informations");
          } else {
            errMessage.push(
              "Error happened. Unable to update profile information."
            );
            setErrorMessage(errMessage);
            setHasSubmitError(true);
            setIsButtonDisabled(false);
            setButtonText("Update Profile Informations");
          }
        } else {
          errMessage.push(
            "Error happened. Unable to update your profile information"
          );
          setErrorMessage(errMessage);
          setHasSubmitError(true);
          setIsButtonDisabled(false);
          setButtonText("Update Profile Informations");
        }
      });
    } catch (error) {
      errMessage.push("Error happened. Network error happened.");
      setErrorMessage(errMessage);
      setHasSubmitError(true);
      setIsButtonDisabled(false);
      setButtonText("Update Profile Informations");
    }
  };

  const displaySubmitButton = () => {
    return (
      <div className="d-flex justify-content-end">
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

  const handleClose = () => {
    setShow(false);
    setHasFileToUpload(false);
    setUploadedFile(file);
    setSelectedFilePath(false);
    setFileUploadError(false);
    setFileUploadErrorMessage(false);
  };
  const handleShow = () => setShow(true);

  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setHasFileToUpload(true);
    setUploadedFile(URL.createObjectURL(fileUploaded));
    setSelectedFilePath(fileUploaded);
  };

  const handleSubmitImageUpload = () => {
    setFileUploadError(false);
    setFileUploadErrorMessage(false);

    if (selectedFilePath === null && hasFileToUpload === null) {
      setFileUploadError(false);
    } else {
      setModalButtonDisabled(true);
      uploadAvatar();
    }
  };

  const uploadAvatar = () => {
    let errMessage = [];

    let formData = {
      userSlug: userSlug,
      file: selectedFilePath,
    };

    try {
      userAvatarUpload(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            setShow(false);
            setHasFileToUpload(false);
            setUploadedFile(file);
            setSelectedFilePath(false);
            setFileUploadError(false);
            setFileUploadErrorMessage(false);
            setFile(data.data.profile_image_path);
            setUploadedFile(data.data.profile_image_path);
            setModalButtonDisabled(false);
          } else if (data.data.status === 0) {
            setFileUploadError(true);
            errMessage.push(data.data.message);
            setFileUploadErrorMessage(errMessage);
            setModalButtonDisabled(false);
          } else {
            setFileUploadError(true);
            errMessage.push("Network error happened. Please try again later");
            setFileUploadErrorMessage(errMessage);
            setModalButtonDisabled(false);
          }
        } else {
          setFileUploadError(true);
          errMessage.push("Network error happened. Please try again later");
          setFileUploadErrorMessage(errMessage);
          setModalButtonDisabled(false);
        }
      });
    } catch (error) {}
  };

  const displayImageUploadModal = () => {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <form name="image-upload-frm">
          <Modal.Header>
            <Modal.Title>Change Profile Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="profile-image-upload-holder">
                <Image
                  className="profile-image-upload-holder-image"
                  src={uploadedFile}
                />
              </div>
              <div className="d-block mb-4 mt-2">
                <Button variant="warning" size="sm" onClick={handleClick}>
                  Upload Profile Image
                </Button>
                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  accept="image/*"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleClose}
              type="reset"
              disabled={modalButtonDisabled}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmitImageUpload}
              disabled={modalButtonDisabled}
            >
              Save Changes
            </Button>
            {displayImageUploadStatusMessage()}
          </Modal.Footer>
        </form>
      </Modal>
    );
  };

  const displayImageUploadStatusMessage = () => {
    return <>{displayImageUploadErrorMessage()}</>;
  };

  const displayImageUploadErrorMessage = () => {
    if (fileUploadError) {
      return (
        <div className="d-block mt-4 w-100">
          <AlertDanger title={"Oops"} message={fileUploadErrorMessage} />
        </div>
      );
    }
  };

  return (
    <div className="card-custom">
      <div className="card-body">
        <form id="create-frm">
          <div className="d-block">
            <div className="d-block">
              <HeaderXSm
                title={"Profile Informations"}
                subText={null}
                borderBottom={true}
              />
            </div>

            <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
              <div className="col-12">
                <InputLebelComponent title="Profile Image" />
                <div className="profile-image-upload-holder">
                  <Image
                    className="profile-image-upload-holder-image"
                    src={file}
                  />
                </div>
                <div className="d-block mb-4 mt-2">
                  <Button variant="primary" size="sm" onClick={handleShow}>
                    Upload Profile Image
                  </Button>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                <div className="form-input-holder">
                  <InputLebelComponent title="First Name" />
                  <div className="d-block">
                    <input
                      type="text"
                      className="form-control-custom-sm"
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
                      className="form-control-custom-sm"
                      id="last-name"
                      placeholder="Enter last name"
                      onChange={handleLastNameChange}
                      value={lastName}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              {/* <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                <div className="form-input-holder">
                  <InputLebelComponent title="Job Role" />
                  <div className="d-block">
                    <input
                      type="text"
                      className="form-control-custom-sm"
                      id="job-role"
                      placeholder="Enter job role"
                      onChange={handleJobRoleChange}
                      value={jobRole}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div> */}
              {/* <div className="col-12 col-md-12 col-lg-12 col-xlg-12">
                <div className="form-input-holder">
                  <InputLebelComponent title="Profile Bio" />
                  <div className="d-block">
                    <textarea
                      type="textarea"
                      className="form-control-textarea-custom"
                      id="job-role"
                      placeholder="Enter your bio"
                      onChange={handleBioChange}
                      value={bio}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          {displaySubmitButton()}
          {displayStatusMessage()}
          {displayImageUploadModal()}
        </form>
      </div>
    </div>
  );
};

export default ProfileBasicForm;
