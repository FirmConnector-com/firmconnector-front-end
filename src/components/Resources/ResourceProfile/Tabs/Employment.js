import React, { useState, useEffect } from "react";
import EmploymentContent from "../../CommonComponents/EmploymentContent";
import moment from "moment";
import Alert from "react-bootstrap/Alert";

const Employment = (props) => {
  const { employmentDetails, displayView } = props;
  const [employmentArray, setEmploymentArray] = useState(false);

  useEffect(() => {
    if (employmentDetails) {
      const sortedDetails = employmentDetails.sort((a, b) => {
        const date1 = moment(a?.start_date, "MM-DD-YYYY");
        const date2 = moment(b?.start_date, "MM-DD-YYYY");
        return date2 - date1;
      });
      setEmploymentArray(sortedDetails);
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
        <Alert key={"info"} variant={"info"}>
          Employment details not available!
        </Alert>
      );
    }
  };

  const displayEmploymentBlock = (employment, key) => {
    return (
      <div key={key} className="col-12 mb-3">
        <div className="card-custom">
          <div className="card-body">
            <EmploymentContent
              employmentDetails={employment}
              displayView={displayView}
            />
          </div>
        </div>
      </div>
    );
  };

  return <div className="d-block">{displayEmploymentHistory()}</div>;
};

export default Employment;
