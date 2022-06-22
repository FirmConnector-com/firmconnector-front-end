import React, { useEffect, useState } from "react";
import About from "./Tabs/About";
import Education from "./Tabs/Education";
import Employment from "./Tabs/Employment";
import RecruiterNotes from "./Tabs/RecruiterNotes";
import { useAuthContext } from "../../../context/AuthContext";

const ProfileInfoTabSection = (props) => {
  const { displayView, profileDetails, educationDetails, employmentDetails } =
    props;
  const [selectedTab, setSelectedTab] = useState("about");
  const { userDetails } = useAuthContext();
  const firmType = JSON.parse(userDetails).firm_details?.firm_type;

  useEffect(() => {}, [selectedTab]);

  const displayTabContent = () => {
    if (selectedTab === "about") {
      return <About profileDetails={profileDetails} />;
    } else if (selectedTab === "education") {
      return <Education educationDetails={educationDetails} />;
    } else if (selectedTab === "employment") {
      return (
        <Employment
          employmentDetails={employmentDetails}
          displayView={displayView}
        />
      );
    } else if (selectedTab === "recruiterNotes") {
      return <RecruiterNotes educationDetails={educationDetails} />;
    }
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="col-12 col-xl-9 col-xxl-9 mb-3 profile-tab-section">
      <div>
        <div className="profile-tab-container px-3 rounded bg-light">
          <div
            className={`cursor-pointer my-2 mx-2 ${
              selectedTab === "about" ? "profile-tab-selected" : "profile-tab"
            }`}
            onClick={() => handleTabChange("about")}
          >
            <span className="fw-medium-custom">Summary</span>
          </div>
          {displayView === "client" ? (
            <div
              className={`cursor-pointer my-2 mx-2 ${
                selectedTab === "employment"
                  ? "profile-tab-selected"
                  : "profile-tab"
              }`}
              onClick={() => handleTabChange("employment")}
            >
              <span className="fw-medium-custom">Experience</span>
            </div>
          ) : null}
          {displayView === "default" ? (
            <>
              <div
                className={`cursor-pointer my-2 mx-2 ${
                  selectedTab === "employment"
                    ? "profile-tab-selected"
                    : "profile-tab"
                }`}
                onClick={() => handleTabChange("employment")}
              >
                <span className="fw-medium-custom">Experience</span>
              </div>
              <div
                className={`cursor-pointer my-2 mx-2 ${
                  selectedTab === "education"
                    ? "profile-tab-selected"
                    : "profile-tab"
                }`}
                onClick={() => handleTabChange("education")}
              >
                <span className="fw-medium-custom">Education</span>
              </div>
              {firmType === "1" ? (
                <></>
              ) : (
                <div
                  className={`cursor-pointer my-2 mx-2 ${
                    selectedTab === "recruiterNotes"
                      ? "profile-tab-selected"
                      : "profile-tab"
                  }`}
                  onClick={() => handleTabChange("recruiterNotes")}
                >
                  <span className="fw-medium-custom">Recruiter Notes</span>
                </div>
              )}
            </>
          ) : null}
        </div>
        <div className="col-12 pt-3">{displayTabContent()}</div>
      </div>
    </div>
  );
};

export default ProfileInfoTabSection;
