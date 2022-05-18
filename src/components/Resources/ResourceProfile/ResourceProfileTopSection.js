import React, { useEffect } from "react";

import ProfileBrief from "./ProfileBrief";
import GeneralInfo from "./GeneralInfo";
import SkillSet from "./SkillSet";

import "./profile.css";

const ResourceProfileTopSection = (props) => {
  const { displayView, resourceDetails } = props;

  useEffect(() => {}, [resourceDetails]);

  return (
    <div className="row">
      {resourceDetails ? (
        <>
          <ProfileBrief
            displayView={displayView}
            profileDetails={resourceDetails.profile_details}
            contactDetails={resourceDetails.contact_details}
          />
          <GeneralInfo
            displayView={displayView}
            resourceDetails={resourceDetails.profile_details}
            contactDetails={resourceDetails.contact_details}
          />
          <SkillSet
            skillDetails={resourceDetails.skill_details}
            skillCount={resourceDetails.skill_count}
            skillFormattedSet={resourceDetails.skill_formatted_set}
          />
        </>
      ) : null}
    </div>
  );
};

export default ResourceProfileTopSection;
