import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import ProfileImageLg from "../../CommonComponent/ProfileImageLg";
import { BadgeSuccess } from "../../Badge/Badge";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";

import getUserProfileDetails from "../../../apis/getUserProfileDetails";

const ProfileSection = (props) => {
  const { user_slug } = props;

  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [profileDetails, setProfileDetails] = useState(false);

  useEffect(() => {
    Promise.all([getUserProfileDetails(user_slug)])
      .then(async ([data]) => {
        if (data?.data?.profileDetails) {
          setIsProfileLoading(false);
          setProfileDetails(data?.data?.profileDetails);
        } else {
          setIsProfileLoading(false);
        }
      })
      .catch((err) => {
        setIsProfileLoading(false);
        console.log(err);
      });
  }, []);

  const displayMainContent = () => {
    if (isProfileLoading === true) {
      return displayLoadingBlock();
    } else {
      return displayProfileInformation();
    }
  };

  const displayLoadingBlock = () => {
    return <LoadingPageSm title={"Loading profile information..."} />;
  };

  const displayProfileInformation = () => {
    return (
      <>
        <div className="d-block">
          <ProfileImageLg imgSrc={profileDetails.profile_image_path} />
        </div>
        <div className="d-block">
          <BadgeSuccess title={profileDetails.user_role_title} />
        </div>
        <div className="d-block">
          <span className="h6">
            {profileDetails.first_name} {profileDetails.last_name}
          </span>
        </div>
        <div className="d-block">
          <span className="text-info-light-custom">
            {profileDetails.user_email}
          </span>
        </div>
        <div className="d-block">
          <Link to={"edit-firm-owner-profile"}>
            <Button variant="primary" size="sm">
              Edit Profile
            </Button>
          </Link>
        </div>
      </>
    );
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-3 mb-md-2 mb-lg-0 mb-xlg-0 ">
      <div className="card-custom p-3 profile-static-card">
        <div className="card-body justify-content-around align-items-center d-flex flex-column">
          {displayMainContent()}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfileSection);
