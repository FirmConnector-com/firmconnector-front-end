import React, { useEffect, useState } from "react";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";
import FirmLogoSm from "../../CommonComponent/FirmLogoSm";
import { BadgeLight } from "../../Badge/Badge";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import getFirmDetails from "../../../apis/getFirmDetails";

const FirmBlockSm = (props) => {
  const { user_slug } = props;

  const [isFirmLoading, setIsFirmLoading] = useState(true);
  const [firmDetails, setFirmDetails] = useState(false);

  useEffect(() => {
    Promise.all([getFirmDetails(user_slug)])
      .then(async ([data]) => {
        if (data?.data?.firmDetails) {
          setIsFirmLoading(false);
          setFirmDetails(data?.data?.firmDetails);
        } else {
          setIsFirmLoading(false);
        }
      })
      .catch((err) => {
        setIsFirmLoading(false);
        console.log(err);
      });
  }, [user_slug]);

  const displayMainContent = () => {
    if (isFirmLoading === true) {
      return displayLoadingBlock();
    } else {
      return displayFirmInformation();
    }
  };

  const displayLoadingBlock = () => {
    return <LoadingPageSm title={"Loading firm details..."} />;
  };

  const displayFirmEmail = () => {
    if (firmDetails.firm_email === "" && firmDetails.firm_email !== null) {
      return (
        <span className="text-info-light-custom">{firmDetails.firm_email}</span>
      );
    } else {
      return <span className="text-danger-custom">No email added</span>;
    }
  };

  const displayFirmInformation = () => {
    return (
      <>
        <div className="d-block">
          <FirmLogoSm imgSrc={firmDetails.firm_logo} />
        </div>
        <div className="d-block">
          <BadgeLight title={firmDetails.firm_type_title} />
        </div>
        <div className="d-block">
          <span className="h6 text-dark">{firmDetails.firm_name}</span>
        </div>
        <div className="d-block">{displayFirmEmail()}</div>
        <div className="d-block">
          <Link to={"edit-firm"}>
            <Button variant="primary" size="sm">
              Edit Firm Details
            </Button>
          </Link>
        </div>
      </>
    );
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-3 mb-md-2 mb-lg-0 mb-xlg-0 ">
      <div className="card-custom p-3 profile-static-card bg-white">
        <div className="card-body d-flex flex-column justify-content-around align-items-center">
          {displayMainContent()}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FirmBlockSm);
