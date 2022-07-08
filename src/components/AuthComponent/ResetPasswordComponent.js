import React from "react";
import ResetPasswordInputComponent from "./ResetPasswordInputComponent";

//IMPORT CSS
import "./auth.css";

const ResetPasswordComponent = (props) => {
  const { resetLink } = props;

  return (
    <div className="container-fluid bg-white-custom">
      <div className="container py-5">
        <div className="row">
          <ResetPasswordInputComponent resetLink={resetLink} />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordComponent;
