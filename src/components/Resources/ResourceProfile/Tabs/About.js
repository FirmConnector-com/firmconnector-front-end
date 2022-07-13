import React, { useState, useEffect } from "react";
import { AlertInfo } from "../../../Alerts/Alert";

const About = (props) => {
  const { profileDetails } = props;
  const [profileBio, setProfileBio] = useState("");

  useEffect(() => {
    if (profileDetails) {
      setProfileBio(profileDetails.profile_bio);
    }
  }, [profileDetails]);

  const displayProfileBio = () => {
    if (profileBio !== null && profileBio !== "") {
      return (
        <div className="card-custom">
          <div className="card-body">
            <span className="p-wrap">{profileBio}</span>
          </div>
        </div>
      );
    } else {
      return (
        <AlertInfo title={"Oops"} message={["Profile bio not available!"]} />
      );
    }
  };

  return displayProfileBio();
};

export default About;
