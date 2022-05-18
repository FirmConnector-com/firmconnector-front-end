import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import HeaderSm from "../../Headers/HeaderSm";
import InputLebelComponent from "../../InputLebel/InputLebelComponent";
import { AlertDanger, AlertSuccess } from "../../Alerts/Alert";

import createOrganization from "../../../apis/signup";

const SignupScreenRightComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [organizationType, setOrganizationType] = useState(1);
  const [isSignUpButtonDisabled, setIsSignUpButtonDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [signUpButtonText, setSignUpButtonText] = useState("Create Account");
  const [hasSignUpError, setHasSignUpError] = useState(false);
  const [isValidSignUp, setIsValidSignUp] = useState(false);

  const handleOrganizationNameChange = (e) => {
    setOrganizationName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleOrganizationTypeChange = (type) => {
    setOrganizationType(type);
  };

  const checkSignupData = () => {
    //disable signup button
    setIsSignUpButtonDisabled(true);

    //change signup button text while processing
    setSignUpButtonText("Processing, please wait...");

    //change alert block content
    setHasSignUpError(false);
    setErrorMessage(false);
    setIsValidSignUp(false);
    setSuccessMessage(false);

    //check for valid email
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let isInvalid = 0;
    let errMessage = [];

    if (organizationName.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Enter your organization name");
    }

    if (!emailPattern.test(email)) {
      isInvalid = 1;
      errMessage.push("Enter a valid email address");
    }

    if (firstName.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Enter first name");
    }

    if (lastName.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Enter last name");
    }

    if (password.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Enter valid password");
    }

    if (isInvalid === 1) {
      setErrorMessage(errMessage);
      setHasSignUpError(true);
      setIsSignUpButtonDisabled(false);
      setSignUpButtonText("Create Account");
    } else {
      submitSignUpCredential();
    }
  };

  const submitSignUpCredential = () => {
    let errMessage = [];
    let succMessage = [];

    let formData = {
      organizationName: organizationName,
      organizationType: organizationType,
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    };

    try {
      createOrganization(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            succMessage.push(data.data.message);
            setSuccessMessage(succMessage);
            setIsValidSignUp(true);
            setHasSignUpError(false);
            setIsSignUpButtonDisabled(true);
            setSignUpButtonText("Create Account");

            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else if (data.data.status === 0) {
            errMessage.push(data.data.message);
            setErrorMessage(errMessage);
            setHasSignUpError(true);
            setIsSignUpButtonDisabled(false);
            setSignUpButtonText("Create Account");
          } else {
            errMessage.push(
              "Error happened. Unable to create your profile information."
            );
            setErrorMessage(errMessage);
            setHasSignUpError(true);
            setIsSignUpButtonDisabled(false);
            setSignUpButtonText("Create Account");
          }
        } else {
          errMessage.push(
            "Error happened. Unable to create your profile information"
          );
          setErrorMessage(errMessage);
          setHasSignUpError(true);
          setIsSignUpButtonDisabled(false);
          setSignUpButtonText("Create Account");
        }
      });
    } catch (error) {
      errMessage.push("Error happened. Network error happened.");
      setErrorMessage(errMessage);
      setHasSignUpError(true);
      setIsSignUpButtonDisabled(false);
      setSignUpButtonText("Create Account");
    }
  };

  const displayErrorMessage = () => {
    if (hasSignUpError) {
      return <AlertDanger title={"Oops"} message={errorMessage} />;
    }
  };

  const displaySuccessMessage = () => {
    if (isValidSignUp) {
      return <AlertSuccess title={"Success"} message={successMessage} />;
    }
  };

  return (
    <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
      <div className="card bg-white-custom p-1">
        <form>
          <HeaderSm
            title={"Create Organization"}
            subText={
              "Please fill up your profile details below. You are one step behind to get started."
            }
            borderBottom={true}
          />
          <div className="form-input-holder">
            <InputLebelComponent title={"Organization Name"} />
            <div className="d-block">
              <input
                type="text"
                className="form-control-custom"
                id="contact_name"
                placeholder="Enter organization name"
                autoComplete="off"
                onChange={handleOrganizationNameChange}
                value={organizationName}
              />
            </div>
          </div>
          <div className="form-input-holder">
            <InputLebelComponent title={"Organization Type"} />
            <div className="d-flex">
              <div
                className={
                  organizationType === 1
                    ? "d-block me-3 selection-selected"
                    : "d-block me-3 selection-muted"
                }
                onClick={() => handleOrganizationTypeChange(1)}
              >
                <span>Professional Services</span>
              </div>
              <div
                className={
                  organizationType === 2
                    ? "d-block selection-selected"
                    : "d-block selection-muted"
                }
                onClick={() => handleOrganizationTypeChange(2)}
              >
                <span>Staffing</span>
              </div>
            </div>
          </div>
          <div className="form-input-holder">
            <InputLebelComponent title={"Email"} />
            <div className="d-block">
              <input
                type="email"
                className="form-control-custom"
                id="email_address"
                placeholder="Enter email address"
                autoComplete="off"
                onChange={handleEmailChange}
                value={email}
              />
            </div>
          </div>
          <div className="form-input-holder">
            <InputLebelComponent title={"First Name"} />
            <div className="d-block">
              <input
                type="text"
                className="form-control-custom"
                id="first_name"
                placeholder="Enter your first name"
                autoComplete="off"
                onChange={handleFirstNameChange}
                value={firstName}
              />
            </div>
          </div>
          <div className="form-input-holder">
            <InputLebelComponent title={"Last Name"} />
            <div className="d-block">
              <input
                type="text"
                className="form-control-custom"
                id="last_name"
                placeholder="Enter your last name"
                autoComplete="off"
                onChange={handleLastNameChange}
                value={lastName}
              />
            </div>
          </div>
          <div className="form-input-holder">
            <InputLebelComponent title={"Password"} />
            <div className="d-block">
              <input
                type="password"
                className="form-control-custom"
                id="password"
                placeholder="Enter account password"
                onChange={handlePasswordChange}
                value={password}
              />
            </div>
          </div>

          <div className="form-button-holder justify-content-end mt-4">
            <Button
              variant="primary"
              disabled={isSignUpButtonDisabled}
              onClick={checkSignupData}
            >
              {signUpButtonText}
            </Button>
          </div>

          <div className="d-block mt-4">
            {displayErrorMessage()} {displaySuccessMessage()}
          </div>
        </form>
        <div className="d-block mt-3">
          <hr />
        </div>
        <div>
          <span>
            By signing in you are agreeing to our -{" "}
            <Link>
              <span>Terms of Use & Privacy Policy</span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupScreenRightComponent;
