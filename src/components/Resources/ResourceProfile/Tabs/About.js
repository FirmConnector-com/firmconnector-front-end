import React, { useState, useEffect } from "react";

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
      return profileBio;
    } else {
      return <span className="text-muted">Profile bio not available!</span>;
    }
  };

  return (
    <div className="card-custom">
      <div className="card-body">
        <span className="p-wrap">{displayProfileBio()}</span>
      </div>
    </div>
  );
};

export default About;
