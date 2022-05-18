import React from "react";
import { Link } from "react-router-dom";
import banner_image from "../../assets/images/login.svg";

const LoginScreenLeftComponent = () => {
  return (
    <div className="col-sm-12 col-md-7 col-lg-7 d-flex justify-content-lg-end d-none d-md-block d-lg-block d-xl-block d-xxl-block">
      <div className="d-block">
        <div>
          <span className="fst-normal">If you don't have an account</span>
        </div>
        <div>
          <span>Please contact Firmconnector Admin</span>
        </div>
      </div>
      <div className="d-block mt-4 login-page-lg-image">
        <img src={banner_image} className="img-full-width" alt="..." />
      </div>
    </div>
  );
};

export default LoginScreenLeftComponent;
