import React from "react";
import { Link } from "react-router-dom";
import { PROFILE_IMAGE_BASE } from "../../config/env";

const ProfileImageSmall = (props) => {
  const { linkUrl, imgSrc } = props;

  return (
    <Link to={linkUrl}>
      <div className="profile-image-sm-rounded">
        <img className="img-fluid" src={PROFILE_IMAGE_BASE + imgSrc} alt="" />
      </div>
    </Link>
  );
};

export default ProfileImageSmall;
