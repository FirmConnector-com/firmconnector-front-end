import React, { useState, useEffect } from "react";
import moment from "moment";
import Alert from "react-bootstrap/Alert";

const Education = (props) => {
  const { educationDetails } = props;
  const [educationArray, setEducationArray] = useState(false);

  useEffect(() => {
    if (educationDetails) {
      const sortedDetails = educationDetails.sort((a, b) => {
        const date1 = moment(a?.passed_on, "MM-DD-YYYY");
        const date2 = moment(b?.passed_on, "MM-DD-YYYY");
        return date2 - date1;
      });
      setEducationArray(sortedDetails);
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
        <Alert key={"info"} variant={"info"}>
          Education details not available!
        </Alert>
      );
    }
  };

  const degreeName = (education) => {
    return (
      <span className="fw-medium-custom">
        {education.degree_name !== null ? (
          <span className="text-success-custom">{education.degree_name}</span>
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
        <span className="text-info-custom fw-medium-custom">
          {education.school_name}
        </span>
      );
    } else {
      return (
        <span className="text-muted-custom fw-medium-custom">
          Institute name not available
        </span>
      );
    }
  };

  const displayPassedOn = (passedOn) => {
    if (passedOn !== "" && passedOn !== null) {
      return <span className="fw-medium-custom">Passed on {passedOn}</span>;
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
