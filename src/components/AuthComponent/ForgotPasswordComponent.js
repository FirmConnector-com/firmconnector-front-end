import React from "react";
import ForgotPasswordInputComponent from "./ForgotPasswordInputComponent";

//IMPORT CSS
import "./auth.css";

const ForgotPasswordComponent = () => {
  return (
    <div className="container-fluid bg-white-custom">
      <div className="container py-5">
        <div className="row">
          <ForgotPasswordInputComponent />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;
