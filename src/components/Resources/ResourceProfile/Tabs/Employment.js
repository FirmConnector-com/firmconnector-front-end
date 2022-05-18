import React, { useState, useEffect } from "react";
import EmploymentContent from "../../CommonComponents/EmploymentContent";

const Employment = (props) => {
  const { employmentDetails } = props;
  const [employmentArray, setEmploymentArray] = useState(false);

  useEffect(() => {
    if (employmentDetails) {
      console.log(employmentDetails);
      setEmploymentArray(employmentDetails);
    }
  }, [employmentDetails]);

  const displayEmploymentHistory = () => {
    if (employmentArray) {
      return (
        <>
          {employmentArray.map((item, index) => {
            return displayEmploymentBlock(item, index);
          })}
        </>
      );
    } else {
      return (
        <span className="text-muted-custom">Employment details not added!</span>
      );
    }
  };

  const displayEmploymentBlock = (employment, key) => {
    return (
      <div key={key} className="col-12 mb-3">
        <div className="card-custom">
          <div className="card-body">
            <EmploymentContent employmentDetails={employment} />
          </div>
        </div>
      </div>
    );
  };

  return <div className="d-block">{displayEmploymentHistory()}</div>;
};

export default Employment;
