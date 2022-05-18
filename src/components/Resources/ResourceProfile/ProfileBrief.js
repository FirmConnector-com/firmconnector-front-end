import React, { useEffect, useState } from "react";
import ProfileImageLg from "../../CommonComponent/ProfileImageLg";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";

const ProfileBrief = (props) => {
  const { displayView, profileDetails, contactDetails } = props;
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  useEffect(() => {
    setIsProfileLoading(false);
  }, [profileDetails, contactDetails]);

  const displayProfileName = () => {
    if (
      profileDetails.profile_name !== null &&
      profileDetails.profile_name !== ""
    ) {
      return profileDetails.profile_name;
    } else {
      return <span className="text-muted">No name</span>;
    }
  };

  const displayProfileRole = () => {
    if (
      profileDetails.user_profile_role !== null &&
      profileDetails.user_profile_role !== ""
    ) {
      return profileDetails.user_profile_role;
    } else {
      return <span className="text-muted">Profile role not available!</span>;
    }
  };

  const displayLocation = () => {
    if (
      contactDetails.user_address_city_id > 0 &&
      contactDetails.user_address_provience_id > 0 &&
      contactDetails.user_address_country_id > 0
    ) {
      return (
        <span className="text-x-sm-custom text-center">
          {contactDetails.city_name}, {contactDetails.state_name},{" "}
          {contactDetails.country_name}
        </span>
      );
    } else {
      return (
        <span className="fw-bold-custom text-sm-custom text-muted-custom">
          Location not available!
        </span>
      );
    }
  };

  const displayBlockContent = () => {
    if (isProfileLoading) {
      return <LoadingPageSm />;
    } else {
      return (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="profile-img-lg-holder">
            <div className="profile-img-lg">
              <ProfileImageLg
                imgSrc={
                  displayView === "default"
                    ? profileDetails.profile_image_path
                    : "assets/uploads/profile/default/default.png"
                }
              />
            </div>
          </div>

          <div className="d-flex flex-column mb-3 justify-content-center align-items-center">
            <div className="profile-name-lg-holder">
              {displayView === "default" ? (
                <span className="h5 fw-bold-custom">
                  {displayProfileName()}
                </span>
              ) : null}
            </div>

            <div className="role-lg-holder">
              <span className="text-muted fw-bold text-center">
                {displayProfileRole()}
              </span>
            </div>

            <div className="address-lg-holder">{displayLocation()}</div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mb-3 top-card-section">
      <div className="card-custom h-100 d-flex flex-column align-items-center">
        <div className="card-body row w-100">{displayBlockContent()}</div>
      </div>
    </div>
  );
};

export default ProfileBrief;
