import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import StaticPageHeaderComponent from "../PageCommonComponent/StaticPageHeaderComponent";

const AboutComponent = () => {
  const firstData = [
    "Sign up",
    "Create employee profiles through an automated process",
    "Give employees access to manage their profiles",
    "Search for skillsets and availability within your company",
  ];

  const secondData = [
    "Request FirmConnector access from your trusted vendors",
    "Connect with the people you need across your network quickly and easily",
  ];

  const displayFirstData = () => {
    return (
      <>
        {firstData.map((item) => {
          return (
            <div className="pt-1">
              <span>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-success-custom"
                />{" "}
                {item}
              </span>
            </div>
          );
        })}
      </>
    );
  };

  const displaySecondData = () => {
    return (
      <>
        {secondData.map((item) => {
          return (
            <div className="pt-1">
              <span>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-success-custom"
                />
                {"  "}
                {item}
              </span>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="d-block bg-white-custom">
      <StaticPageHeaderComponent
        title="About Firmconnector"
        description_sm={""}
      />
      <div className="container bg-white-custom py-5">
        <div className="row">
          <div className="col-md-12">
            <p className="display-6 fw-bold">
              So how exactly does{" "}
              <span className="text-warning">FirmConnector</span> work?
            </p>
            <div className="mt-4">
              <p className="fw-bold">Get the most from your workforce:</p>
              {displayFirstData()}
            </div>

            <div className="mt-4">
              <p className="fw-bold">Maximize the value of your network:</p>
              {displaySecondData()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
