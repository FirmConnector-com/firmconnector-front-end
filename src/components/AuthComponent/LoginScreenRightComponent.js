import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AlertDanger, AlertSuccess } from "../Alerts/Alert";
import BlockHeader from "../Headers/BlockHeader";
import InputLebelComponent from "../InputLebel/InputLebelComponent";
import { insertLoginResponseData } from "../../config/LocalStorageInsert";
import { useAuthContext } from "../../context/AuthContext";

//import api
import checkLoginCredential from "../../apis/login";

const LoginScreenRightComponent = () => {
  const { signIn } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [loginButtonText, setLoginButtonText] = useState("Proceed to login");
  const [hasLoginError, setHasLoginError] = useState(false);
  const [isValidLogin, setIsValidLogin] = useState(false);

  // useEffect(() => {
  //   //Update email, password, errorMessage state on change
  // }, [email, password, errorMessage]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const checkLogin = (e) => {
    //disable login button
    e.preventDefault();
    setIsLoginButtonDisabled(true);

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

    if (password.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Enter valid password");
    }

    if (isInvalid === 1) {
      setErrorMessage(errMessage);
      setHasLoginError(true);
      setIsLoginButtonDisabled(false);
      setLoginButtonText("Proceed to login");
    } else {
      submitLoginCredential();
    }
  };

  const submitLoginCredential = () => {
    let errMessage = [];
    let succMessage = [];

    try {
      checkLoginCredential(email, password).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            succMessage.push(data.data.message);
            setSuccessMessage(succMessage);
            setIsValidLogin(true);
            setHasLoginError(false);
            setIsLoginButtonDisabled(true);
            setLoginButtonText("Proceed to login");
            await insertLoginResponseData(data.data.userDetails);
            signIn();
          } else if (data.data.status === 0) {
            errMessage.push(data.data.message);
            setErrorMessage(errMessage);
            setHasLoginError(true);
            setIsLoginButtonDisabled(false);
            setLoginButtonText("Proceed to login");
          } else {
            errMessage.push(
              "Error happened. Unable to find your account details."
            );
            setErrorMessage(errMessage);
            setHasLoginError(true);
            setIsLoginButtonDisabled(false);
            setLoginButtonText("Proceed to login");
          }
        } else {
          errMessage.push(
            "Error happened. Unable to find your account details."
          );
          setErrorMessage(errMessage);
          setHasLoginError(true);
          setIsLoginButtonDisabled(false);
          setLoginButtonText("Proceed to login");
        }
      });
    } catch (error) {
      errMessage.push("Error happened. Network error happened.");
      setErrorMessage(errMessage);
      setHasLoginError(true);
      setIsLoginButtonDisabled(false);
      setLoginButtonText("Proceed to login");
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
    <div className="col-sm-12 col-md-5 col-lg-5">
      <div className="card bg-white-custom p-1">
        <form>
          <BlockHeader
            title={"Login to Your Account!"}
            subText={"Use your Firmconnector account credentials"}
            borderBottom={true}
          />
          <div className="form-input-holder">
            <InputLebelComponent title="Email" />
            <div className="d-block">
              <input
                type="email"
                className="form-control"
                id="email-address"
                placeholder="Enter email address"
                onChange={handleEmailChange}
                value={email}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="form-input-holder">
            <InputLebelComponent title="Password" />
            <div className="d-block">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter account password"
                onChange={handlePasswordChange}
                value={password}
                autoComplete="off"
              />
            </div>
          </div>
          <p className="text-end">
            forgot password?
            <Link to="forgot-password"> click here</Link>
          </p>

          <div className="form-button-holder justify-content-end mt-4">
            <Button
              type="submit"
              variant="primary"
              onClick={(e) => checkLogin(e)}
              disabled={isLoginButtonDisabled}
            >
              {loginButtonText}
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

export default LoginScreenRightComponent;
