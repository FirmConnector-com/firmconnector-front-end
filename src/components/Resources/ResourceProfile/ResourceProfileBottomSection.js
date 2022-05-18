import React from "react";
import DocumentBox from "./DocumentBox";
import ProfileInfoTabSection from "./ProfileInfoTabSection";
import AvailabilityHolder from "./AvailabilityHolder";

const ResourceProfileBottomSection = (props) => {
  const { displayView, resourceDetails } = props;

  return (
    <div className="row">
      <ProfileInfoTabSection
        displayView={displayView}
        profileDetails={resourceDetails.profile_details}
        educationDetails={resourceDetails.education_details}
        employmentDetails={resourceDetails.employment_details}
      />
      <div className="col-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 mb-3">
        <AvailabilityHolder
          availabilityDetails={resourceDetails.availability_details}
        />
        {displayView === "default" ? (
          <DocumentBox documentDetails={resourceDetails.document_details} />
        ) : null}
      </div>
    </div>
  );
};

export default ResourceProfileBottomSection;
