import React from "react";
import SignupScreenLeftComponent from "./SignupScreenLeftComponent";
import SignupScreenRightComponent from "./SignupScreenRightComponent";

//IMPORT CSS
import "../auth.css";

const SignupComponent = () => {
  return (
    <div className="container-fluid bg-white-custom">
      <div className="container py-5">
        <div className="row">
          <SignupScreenLeftComponent />
          <SignupScreenRightComponent />
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
