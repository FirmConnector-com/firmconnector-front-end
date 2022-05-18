import React, { useEffect, useState } from "react";
import ImageIconSmHolder from "../../Iconcontainer/ImageIconSmHolder";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";

import envelope from "../../../assets/images/email.svg";
import mobile from "../../../assets/images/mobile.svg";
import phone from "../../../assets/images/phone.svg";
import user from "../../../assets/images/user.svg";

import { FIRM_IMAGE_BASE } from "../../../config/env";

const GeneralInfo = (props) => {
  const { displayView, contactDetails, resourceDetails } = props;
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  useEffect(() => {
    setIsProfileLoading(false);
  }, [contactDetails, resourceDetails]);

  const displayGeneralInfoBlock = () => {
    return (
      <div className="profile-info-block-holder">
        <div className="d-flex align-items-center">
          <div className="info-icon-holder">
            <ImageIconSmHolder imageUrl={envelope} />
          </div>
          <div className="d-block pb-1 pt-1">{displayEmail()}</div>
        </div>
        <div className="row mt-4">
          <div className="col-12 col-lg-6 col-xl-6 col-xxl-6 mb-4">
            <div className="d-flex align-items-center">
              <div className="info-icon-holder">
                <ImageIconSmHolder imageUrl={mobile} />
              </div>
              <div className="d-block pb-1 pt-1">{displayMobile()}</div>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xl-6 col-xxl-6 mb-4">
            <div className="d-flex align-items-center">
              <div className="info-icon-holder">
                <ImageIconSmHolder imageUrl={phone} />
              </div>
              <div className="d-block pb-1 pt-1">{displayOfficePhone()}</div>
            </div>
          </div>
        </div>
        {displayReportTo()}
      </div>
    );
  };

  const displayEmail = () => {
    if (
      contactDetails.user_email !== null &&
      contactDetails.user_email !== ""
    ) {
      return <span>{contactDetails.user_email}</span>;
    } else {
      return <span className="text-muted">Email not available!</span>;
    }
  };

  const displayMobile = () => {
    if (contactDetails.mobile !== null && contactDetails.mobile !== "") {
      return <span>{contactDetails.mobile}</span>;
    } else {
      return <span className="text-muted">Not available!</span>;
    }
  };

  const displayOfficePhone = () => {
    if (
      contactDetails.office_phone !== null &&
      contactDetails.office_phone !== ""
    ) {
      return <span>{contactDetails.office_phone}</span>;
    } else {
      return <span className="text-muted">Not available!</span>;
    }
  };

  const displayReportTo = () => {
    if (resourceDetails.firm_type === "1") {
      if (resourceDetails.report_to_user_email) {
        return (
          <div className="d-flex align-items-center">
            <div className="info-icon-holder">
              <ImageIconSmHolder imageUrl={envelope} />
            </div>
            <div className="d-block">
              <div className="">
                <span className="fw-medium-custom text-x-x-custom">
                  Report to
                </span>
              </div>
              <div className="">
                <span className="text-dark text-sm-custom">
                  {resourceDetails.report_to_user_email}
                </span>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="d-flex align-items-center">
            <div className="info-icon-holder">
              <ImageIconSmHolder imageUrl={user} />
            </div>
            <div className="d-block">
              <div className="">
                <span className="fw-medium-custom text-x-x-custom">
                  Report to
                </span>
              </div>
              <div className="">
                <span className="text-secondary text-x-sm-custom">
                  Nothing found!
                </span>
              </div>
            </div>
          </div>
        );
      }
    }
  };

  const inquireView = () => {
    return (
      <div className="profile-info-block-holder">
        <form className="g-3">
          <div className="mb-2">
            <textarea
              className="form-control"
              id="inquire-text"
              rows="3"
              placeholder="Ask a question to their recruiter"
            ></textarea>
          </div>

          <div>
            <div className="d-flex justify-content-end">
              <button type="button" className="btn-custom btn-primary-custom">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  const displayBlockContent = () => {
    if (isProfileLoading) {
      return <LoadingPageSm />;
    } else {
      return (
        <div className="d-block">
          {displayView === "default"
            ? displayGeneralInfoBlock()
            : inquireView()}
          <div className="d-flex justify-content-center align-items-center mt-4">
            <div
              className="firm-logo-lg"
              style={{
                backgroundImage: `url("${
                  FIRM_IMAGE_BASE + resourceDetails.firm_logo
                }")`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="col-12 col-lg-5 col-xl-5 col-xxl-5 mb-3 top-card-section">
      <div className="card-custom h-100">
        <div className="card-body">{displayBlockContent()}</div>
      </div>
    </div>
  );
};

export default GeneralInfo;
