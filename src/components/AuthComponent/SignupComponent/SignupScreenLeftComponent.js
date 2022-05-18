import React from "react";
import { Link } from "react-router-dom";
import signup_image from "../../../assets/images/sign_up.svg";

const SignupScreenLeftComponent = () => {
  return (
    <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 col-xxl-7 d-flex justify-content-lg-end d-none d-md-block d-lg-block d-xl-block d-xxl-block">
      <div className="d-block">
        <div>
          <span className="fst-normal text-muted-custom">
            Already have an account
          </span>
        </div>
        <div>
          <span>
            You can <Link to="sign-in">Login Here</Link>
          </span>
        </div>
      </div>
      <div className="d-block mt-4 login-page-lg-image">
        <img src={signup_image} className="img-full-width" alt="..." />
      </div>
    </div>
  );
};

export default SignupScreenLeftComponent;
