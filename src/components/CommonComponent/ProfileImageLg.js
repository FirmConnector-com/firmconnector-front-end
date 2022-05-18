import React from "react";
import { PROFILE_IMAGE_BASE } from "../../config/env";

const ProfileImageLg = (props) => {
  const { imgSrc } = props;
  return (
    <div className="profile-image-lg-rounder">
      <img className="img-fluid" src={PROFILE_IMAGE_BASE + imgSrc} alt="" />
    </div>
  );
};

export default ProfileImageLg;
