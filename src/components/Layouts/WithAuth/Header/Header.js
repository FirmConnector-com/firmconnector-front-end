import React from "react";
import ProfileImageSmall from "../../../CommonComponent/ProfileImageSmall";
import { useAuthContext } from "../../../../context/AuthContext";
import Logo from "../../../../assets/images/Company_logo.png";

import "./header.css";

const Header = () => {
  const { userDetails } = useAuthContext();
  const user = JSON.parse(userDetails);

  return (
    <div className="container-fluid fixed-top header-dashboard d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="logo-top-sm">
              <img src={Logo} className="img-fluid" alt="Firmconnector" />
            </div>
          </div>
          <div className="col-6 d-flex justify-content-end align-items-center">
            <ProfileImageSmall
              imgSrc={user.profile_image_path}
              linkUrl={"/profile-settings"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
