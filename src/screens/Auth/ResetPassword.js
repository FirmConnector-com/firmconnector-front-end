import React, { useState, useEffect } from "react";

//Import component
import ResetPasswordComponent from "../../components/AuthComponent/ResetPasswordComponent";
import Layout from "../../components/Layouts/WithoutAuth/Layout";
import LoadingPageSm from "../../components/CommonComponent/LoadingPageSm";
import getResetLink from "../../apis/getResetLink";
import { AlertInfo } from "../../components/Alerts/Alert";

const ResetPassword = (props) => {
  const { resetLink } = props.match.params;
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [linkValid, setLinkValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);

  useEffect(() => {
    if (resetLink) {
      checkLinkIsValid();
    }
  }, [resetLink]);

  const checkLinkIsValid = () => {
    try {
      getResetLink(resetLink).then(async (data) => {
        if (data?.data) {
          if (data?.data.status === 0) {
            setLinkValid(false);
            setIsPageLoading(false);
            let message = [];

            message.push(data?.data.message);
            setErrorMessage(message);
          } else {
            setLinkValid(true);
            setIsPageLoading(false);
          }
        } else {
          setLinkValid(false);
          setIsPageLoading(false);

          let message = [];

          message.push("Something went wrong. Please try again later.");
          setErrorMessage(message);
        }
      });
    } catch (error) {}
  };

  return (
    <Layout pageTitle={"Firmconnector :: Reset Password"}>
      <div className="container-fluid bg-white-custom">
        <div className="container py-5">
          <div className="row">
            {isPageLoading ? (
              <div className="d-flex col-12 justify-content-center align-items-center py-5">
                <LoadingPageSm title={"Please wait..."} />
              </div>
            ) : linkValid ? (
              <ResetPasswordComponent resetLink={resetLink} />
            ) : (
              <AlertInfo title={"Oops"} message={errorMessage} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
