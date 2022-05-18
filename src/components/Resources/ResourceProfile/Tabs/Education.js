import React, { useState, useEffect } from "react";

const Education = (props) => {
  const { educationDetails } = props;
  const [educationArray, setEducationArray] = useState(false);

  useEffect(() => {
    if (educationDetails) {
      setEducationArray(educationDetails);
    }
  }, [educationDetails]);

  const displayEducationHistory = () => {
    if (educationArray) {
      return (
        <>
          {educationArray.map((item, index) => {
            return displayEducationBlock(item, index);
          })}
        </>
      );
    } else {
      return (
        <span className="text-muted-custom">Education details not added!</span>
      );
    }
  };

  const degreeName = (education) => {
    return (
      <span className="text-dark-custom text-sm-custom fw-medium-custom">
        {education.degree_name !== null ? (
          <span className="text-success-custom text-md-custom">
            {education.degree_name}
          </span>
        ) : (
          "Not available"
        )}{" "}
        in {education.subject !== null ? education.subject : "Not available"}
      </span>
    );
  };

  const displaySchoolName = (education) => {
    if (education.school_name !== "" && education.school_name !== null) {
      return (
        <span className="text-info-custom text-x-sm-custom fw-medium-custom">
          {education.school_name}
        </span>
      );
    } else {
      return (
        <span className="text-muted-custom text-x-sm-custom fw-medium-custom">
          Institute name not available
        </span>
      );
    }
  };

  const displayPassedOn = (passedOn) => {
    if (passedOn !== "" && passedOn !== null) {
      return (
        <span className="text-dark-custom text-x-x-sm-custom fw-medium-custom">
          Passed on {passedOn}
        </span>
      );
    }
  };

  const displayEducationBlock = (education, key) => {
    return (
      <div key={key} className="col-12 mb-3">
        <div className="card-custom">
          <div className="card-body">
            <div className="d-block d-md-flex d-xl-flex d-lg-flex row align-items-center">
              {degreeName(education)}
            </div>
            <div className="d-block d-md-flex d-xl-flex d-lg-flex row align-items-center">
              {displaySchoolName(education)}
            </div>
            <div className="d-block d-md-flex d-xl-flex d-lg-flex row align-items-center mt-2">
              {displayPassedOn(education.passed_on)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <div className="d-block">{displayEducationHistory()}</div>;
};

export default Education;
