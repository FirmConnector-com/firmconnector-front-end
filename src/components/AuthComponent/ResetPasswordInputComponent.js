import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { AlertDanger, AlertSuccess } from "../Alerts/Alert";
import BlockHeader from "../Headers/BlockHeader";
import InputLebelComponent from "../InputLebel/InputLebelComponent";
import { Link } from "react-router-dom";

//import api
import resetPassword from "../../apis/resetPassword";

const ResetPasswordInputComponent = (props) => {
  const { resetLink } = props;
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [loginButtonText, setLoginButtonText] = useState("Reset Password");
  const [hasLoginError, setHasLoginError] = useState(false);
  const [isValidLogin, setIsValidLogin] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlecPasswordChange = (e) => {
    setcPassword(e.target.value);
  };

  const checkPassword = (e) => {
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

    let isInvalid = 0;
    let errMessage = [];

    if (password.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Enter valid password");
    } else if (cpassword.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Enter valid confirm password");
    } else if (password !== cpassword) {
      isInvalid = 1;
      errMessage.push("New password and confirm password should be same");
    }

    if (isInvalid === 1) {
      setErrorMessage(errMessage);
      setHasLoginError(true);
      setIsButtonDisabled(false);
      setLoginButtonText("Reset Password");
    } else {
      submitCredential();
    }
  };

  const submitCredential = () => {
    let errMessage = [];
    let succMessage = [];

    try {
      resetPassword(password, cpassword, resetLink).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            succMessage.push(data.data.message);
            setSuccessMessage(succMessage);
            setIsValidLogin(true);
            setHasLoginError(false);
            setIsButtonDisabled(true);
            setPassword("");
            setcPassword("");
            setLoginButtonText("Reset Password");
            setIsButtonDisabled(false);

            setTimeout(() => {
              setErrorMessage(false);
              setSuccessMessage(false);
              window.location.replace("/sign-in");
            }, 2000);
          } else if (data.data.status === 0) {
            errMessage.push(data.data.message);
            setErrorMessage(errMessage);
            setPassword("");
            setcPassword("");
            setHasLoginError(true);
            setIsButtonDisabled(false);
            setLoginButtonText("Reset Password");

            setTimeout(() => {
              setErrorMessage(false);
              setSuccessMessage(false);
            }, 2000);
          } else {
            errMessage.push(
              "Error happened. Unable to find your account details."
            );
            setPassword("");
            setcPassword("");
            setErrorMessage(errMessage);
            setHasLoginError(true);
            setIsButtonDisabled(false);
            setLoginButtonText("Reset Password");

            setTimeout(() => {
              setErrorMessage(false);
              setSuccessMessage(false);
            }, 2000);
          }
        } else {
          errMessage.push(
            "Error happened. Unable to find your account details."
          );
          setPassword("");
          setcPassword("");
          setErrorMessage(errMessage);
          setHasLoginError(true);
          setIsButtonDisabled(false);
          setLoginButtonText("Reset Password");

          setTimeout(() => {
            setErrorMessage(false);
            setSuccessMessage(false);
          }, 2000);
        }
      });
    } catch (error) {
      setPassword("");
      setcPassword("");
      errMessage.push("Error happened. Network error happened.");
      setErrorMessage(errMessage);
      setHasLoginError(true);
      setIsButtonDisabled(false);
      setLoginButtonText("Reset Password");

      setTimeout(() => {
        setErrorMessage(false);
        setSuccessMessage(false);
      }, 2000);
    }
  };

  const displayErrorMessage = () => {
    if (hasLoginError) {
      return <AlertDanger title={"Oops"} message={errorMessage} />;
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
              title={"Reset Password!"}
              subText={"Please set your new password"}
              borderBottom={true}
            />
            <div className="card-custom">
              <div className="card-body">
                <div className="form-input-holder">
                  <InputLebelComponent title="New Password" />
                  <div className="d-block">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter new password"
                      onChange={handlePasswordChange}
                      value={password}
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="form-input-holder">
                  <InputLebelComponent title="Confirm Password" />
                  <div className="d-block">
                    <input
                      type="password"
                      className="form-control"
                      id="c-password"
                      placeholder="Enter confirm password"
                      onChange={handlecPasswordChange}
                      value={cpassword}
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="form-button-holder justify-content-end mt-4">
                  <Link to="/">
                    <Button
                      type="button"
                      variant="outline-dark"
                      disabled={isButtonDisabled}
                      className="me-2"
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    variant="primary"
                    onClick={(e) => checkPassword(e)}
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

export default ResetPasswordInputComponent;
