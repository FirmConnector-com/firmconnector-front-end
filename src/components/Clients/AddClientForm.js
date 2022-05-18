import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import HeaderSm from "../Headers/HeaderSm";
import InputLebelComponent from "../InputLebel/InputLebelComponent";
import { Button } from "react-bootstrap";
import { AlertDanger, AlertSuccess, AlertInfo } from "../Alerts/Alert";

//import API
import createClient from "../../apis/createClient";

const AddClientForm = () => {
  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;
  const user_primary_role = JSON.parse(userDetails).user_primary_role;

  const [email, setEmail] = useState("");
  const [buttonText, setButtonText] = useState("Create Account");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [isValidSubmit, setIsValidSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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
      /^([\w-.]+@(?!mail\.ru)(?!yandex\.ru)(?!mail\.com)([\w-]+.)+[\w-]{2,4})?$/;

    let isInvalid = 0;
    let errMessage = [];

    if (email.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Enter email address");
    } else {
      if (!emailPattern.test(email)) {
        isInvalid = 1;
        errMessage.push("Enter a valid email address");
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
    };

    try {
      createClient(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            succMessage.push(data.data.message);
            setSuccessMessage(succMessage);
            setIsValidSubmit(true);
            setHasSubmitError(false);
            setIsButtonDisabled(true);
            setButtonText("Create Account");

            setTimeout(() => {
              window.location.replace("access-control");
            }, 1000);
          } else if (data.data.status === 0) {
            errMessage.push(data.data.message);
            setErrorMessage(errMessage);
            setHasSubmitError(true);
            setIsButtonDisabled(false);
            setButtonText("Create Account");
          } else {
            errMessage.push("Error happened. Unable to create client account.");
            setErrorMessage(errMessage);
            setHasSubmitError(true);
            setIsButtonDisabled(false);
            setButtonText("Create Account");
          }
        } else {
          errMessage.push("Error happened. Unable to create client account");
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
          <span className="display-6">Create Client Profile Access</span>
        </div>
        <div className="d-block">
          <p>
            <strong>Note</strong>{" "}
            <span className="text-danger-custom">
              ***Fill up all fields to create a client account
            </span>
          </p>
        </div>
      </div>
    );
  };

  const displayForm = () => {
    return (
      <div className="d-block">
        <div className="card-custom">
          <div className="card-body">
            <form id="create-frm">
              {displayloginBlock()}
              {displaySubmitButton()}
              {displayStatusMessage()}
            </form>
          </div>
        </div>
      </div>
    );
  };

  const displayloginBlock = () => {
    return (
      <div className="d-block mb-4">
        <div className="d-block">
          <HeaderSm
            title={"Add account informations"}
            subText={null}
            borderBottom={true}
          />
        </div>

        <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
          <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
            <div className="form-input-holder">
              <InputLebelComponent title="Email Accress" />
              <div className="d-block">
                <input
                  type="text"
                  className="form-control-custom"
                  id="email"
                  placeholder="Enter client email address"
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

  const displaySubmitButton = () => {
    return (
      <div className="form-button-holder justify-content-end">
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
      <div className="d-block">
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

  const displayFormBlock = () => {
    if (user_primary_role === "2") {
      return (
        <>
          {displayTopBlock()}
          {displayForm()}
        </>
      );
    } else {
      return (
        <AlertInfo
          title={"Note"}
          message={"You do not have access to create Client"}
        />
      );
    }
  };

  return <div className="d-block">{displayMainContent()}</div>;
};

export default AddClientForm;
