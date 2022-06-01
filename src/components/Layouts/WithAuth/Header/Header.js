import React from "react";
import ProfileImageSmall from "../../../CommonComponent/ProfileImageSmall";
import { useAuthContext } from "../../../../context/AuthContext";
import { Link } from "react-router-dom";
import Logo from "../../../../assets/images/Company_logo.png";

import "./header.css";

const Header = () => {
  const { userDetails } = useAuthContext();
  const loggedinUserDetails = JSON.parse(userDetails);

  return (
    <div className="header-dashboard pb-2 pt-2">
      <div className="container d-flex">
        <div className="col-8 d-flex align-items-center">
          <Link to="/">
            <div className="logo-top-sm">
              <img src={Logo} className="img-fluid" alt="Firmconnector" />
            </div>
          </Link>
        </div>
        <div className="col-4 d-flex justify-content-end align-items-center">
          <div>
            <ProfileImageSmall
              imgSrc={loggedinUserDetails.profile_image_path}
              linkUrl={"/profile-settings"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
