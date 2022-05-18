import React from "react";
import LoginScreenLeftComponent from "./LoginScreenLeftComponent";
import LoginScreenRightComponent from "./LoginScreenRightComponent";

//IMPORT CSS
import "./auth.css";

const SignupComponent = () => {
  return (
    <div className="container-fluid bg-white-custom">
      <div className="container py-5">
        <div className="row">
          <LoginScreenLeftComponent />
          <LoginScreenRightComponent />
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
