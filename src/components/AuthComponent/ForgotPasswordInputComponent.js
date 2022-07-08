import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { AlertInfo, AlertSuccess } from "../Alerts/Alert";
import BlockHeader from "../Headers/BlockHeader";
import InputLebelComponent from "../InputLebel/InputLebelComponent";
import { Link } from "react-router-dom";

//import api
import forgotPassword from "../../apis/forgotPassword";

const ForgotPasswordInputComponent = () => {
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [loginButtonText, setLoginButtonText] = useState("Send reset link");
  const [hasLoginError, setHasLoginError] = useState(false);
  const [isValidLogin, setIsValidLogin] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const checkLogin = (e) => {
    //disable login button
    e.preventDefault();
    setIsButtonDisabled(true);

    //change login button text while processing
    setLoginButtonText("Processing, please wait...");

    //change alert block content
    setHasLoginError(false);
    setErrorMessage(false);
    setIsValidLogin(false);
    setSuccessMessage(false);

    //check for valid email
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let isInvalid = 0;
    let errMessage = [];

    if (!emailPattern.test(email)) {
      isInvalid = 1;
      errMessage.push("Enter a valid email address");
    }

    if (isInvalid === 1) {
      setErrorMessage(errMessage);
      setHasLoginError(true);
      setIsButtonDisabled(false);
      setLoginButtonText("Send reset link");
    } else {
      submitLoginCredential();
    }
  };

  const submitLoginCredential = () => {
    let errMessage = [];
    let succMessage = [];

    try {
      forgotPassword(email).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            succMessage.push(data.data.message);
            setSuccessMessage(succMessage);
            setIsValidLogin(true);
            setHasLoginError(false);
            setIsButtonDisabled(true);
            setEmail("");
            setLoginButtonText("Send reset link");
            setIsButtonDisabled(false);
          } else if (data.data.status === 0) {
            errMessage.push(data.data.message);
            setErrorMessage(errMessage);
            setEmail("");
            setHasLoginError(true);
            setIsButtonDisabled(false);
            setLoginButtonText("Send reset link");
          } else {
            errMessage.push(
              "Error happened. Unable to find your account details."
            );
            setEmail("");
            setErrorMessage(errMessage);
            setHasLoginError(true);
            setIsButtonDisabled(false);
            setLoginButtonText("Send reset link");
          }
        } else {
          errMessage.push(
            "Error happened. Unable to find your account details."
          );
          setEmail("");
          setErrorMessage(errMessage);
          setHasLoginError(true);
          setIsButtonDisabled(false);
          setLoginButtonText("Send reset link");
        }
      });
    } catch (error) {
      setEmail("");
      errMessage.push("Error happened. Network error happened.");
      setErrorMessage(errMessage);
      setHasLoginError(true);
      setIsButtonDisabled(false);
      setLoginButtonText("Send reset link");
    }
  };

  const displayErrorMessage = () => {
    if (hasLoginError) {
      return <AlertInfo title={"Oops"} message={errorMessage} />;
    }
  };

  const displaySuccessMessage = () => {
    if (isValidLogin) {
      return <AlertSuccess title={"Success"} message={successMessage} />;
    }
  };

  return (
    <div className="d-flex col-12 justify-content-center align-items-center">
      <div className="col-12 col-lg-5 col-xl-5 col-xxl-5">
        <div className="card bg-white-custom p-1">
          <form>
            <BlockHeader
              title={"Forgot Password!"}
              subText={
                "Please enter your registered email address to receive passord reset link"
              }
              borderBottom={true}
            />
            <div className="card-custom">
              <div className="card-body">
                <div className="form-input-holder">
                  <InputLebelComponent title="Email" />
                  <div className="d-block">
                    <input
                      type="email"
                      className="form-control"
                      id="forgot-email-address"
                      placeholder="Enter email address"
                      onChange={handleEmailChange}
                      value={email}
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="form-button-holder justify-content-end mt-4">
                  <Link to="/">
                    <Button
                      type="button"
                      variant="outline-dark"
                      onClick={(e) => checkLogin(e)}
                      disabled={isButtonDisabled}
                      className="me-2"
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    variant="primary"
                    onClick={(e) => checkLogin(e)}
                    disabled={isButtonDisabled}
                  >
                    {loginButtonText}
                  </Button>
                </div>
              </div>
            </div>

            <div className="d-block mt-4">
              {displayErrorMessage()} {displaySuccessMessage()}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordInputComponent;
