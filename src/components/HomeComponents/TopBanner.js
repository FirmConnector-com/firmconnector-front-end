import React from "react";

import banner_image from "../../assets/images/banner_left.svg";
import ButtonLg from "../Buttons/ButtonLg";
import "./home.css";

const TopBannerComponent = () => {
  return (
    <div className="jumbotron bg-black-custom top-banner py-5">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-7 col-lg-7">
            <div className="d-block mb-4">
              <h1 className="display-4 text-white fw-bold">
                Maximize the value of your network
              </h1>
            </div>
            <div className="d-block mb-4">
              <p className="lead text-white-custom mb-4">
                FirmConnector is software as a service that can provide your
                organization with quick, easy access to the skillsets and
                availability of your entire talent network both your in-house
                workforce and through trusted vendors and partners.
              </p>
            </div>
            {/* <div className="d-block">
              <ButtonLg
                className="btn-success-custom"
                role="button"
                title="Click here to learn more"
                type="button"
                to="sign-in"
              />
            </div> */}
          </div>
          <div className="col-sm-12 col-md-5 col-lg-5 d-flex justify-content-lg-end d-none d-md-block d-lg-block d-xl-block d-xxl-block">
            <img src={banner_image} className="img-fluid" alt="..." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBannerComponent;
