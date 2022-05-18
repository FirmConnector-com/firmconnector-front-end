import React from "react";
import { useAuthContext } from "../../../context/AuthContext";

import ProfileSection from "./ProfileSection";
import FirmResourceCount from "./FirmResourceCount";

const TopProfileSection = () => {
  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;

  return (
    <div className="d-sm-flex d-md-flex d-lg-flex d-xl-flex mb-3 row d-block">
      <ProfileSection user_slug={user_slug} />
      <FirmResourceCount user_slug={user_slug} />
    </div>
  );
};

export default TopProfileSection;
