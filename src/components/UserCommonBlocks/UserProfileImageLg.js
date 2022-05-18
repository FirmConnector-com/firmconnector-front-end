import React from "react";
import { Link } from "react-router-dom";

const HeaderTopUserBlock = (props) => {
  const { userDetails, length } = props;
  const loggedinUserDetails = JSON.parse(userDetails);
  const profileName = `${loggedinUserDetails.first_name} ${loggedinUserDetails.last_name}`;

  const displayProfileName = () => {
    if (profileName.length > length) {
      return `${profileName.substring(0, length)} ...`;
    } else {
      return profileName;
    }
  };

  return (
    <Link to={"dashboard"}>
      <div className="d-flex align-items-center">
        <div className="d-block me-2">
          <span className="text-white">{displayProfileName()}</span>
        </div>
        <div className="profile-image-sm-rounded">
          <img
            className="img-fluid"
            src={loggedinUserDetails.profile_image_path}
            alt={profileName}
          />
        </div>
      </div>
    </Link>
  );
};

export default HeaderTopUserBlock;
