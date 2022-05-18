import React from "react";
import { BadgeSuccess } from "../../Badge/Badge";
import IconContainer from "../../Iconcontainer/IconContainerSm";

const EmploymentContent = (props) => {
  const { employmentDetails } = props;

  const jobTitle = (job_title) => {
    if (job_title !== null) {
      return <span className="text-info-custom">{job_title}</span>;
    } else {
      return <span className="text-info-custom">Not available!</span>;
    }
  };

  const employerName = (employer_name) => {
    if (employer_name !== "" && employer_name !== null) {
      return (
        <span className="text-dark-custom fs-6 fw-medium-custom">
          {employer_name}
        </span>
      );
    } else {
      return (
        <span className="text-muted-custom fs-6 fw-medium-custom">
          Employer name not available
        </span>
      );
    }
  };

  const displayDiscription = (discription) => {
    if (discription !== "" && discription !== null) {
      return (
        <span className="text-dark-custom text-sm-custom">{discription}</span>
      );
    } else {
      return (
        <span className="text-muted-custom text-sm-custom">
          Work summary not added!
        </span>
      );
    }
  };

  const displayLocation = (city, state, country) => {
    return (
      <span className="text-dark-custom">
        {city !== null ? city : ""}
        {state !== null ? ", " + state : ""}
        {country !== null ? ", " + country : ""}
      </span>
    );
  };

  const displayWorkYear = (start, end, is_current) => {
    if (is_current === "1") {
      return (
        <span className="text-muted-custom">
          From{" "}
          <span className="text-dark-custom fw-medium-custom">
            {start !== null ? start : "-"}
          </span>{" "}
          to <BadgeSuccess title={"Present"} />
        </span>
      );
    } else {
      return (
        <span className="text-muted-custom">
          From{" "}
          <span className="text-dark-custom fw-medium-custom">
            {start !== null ? start : "-"}
          </span>{" "}
          to{" "}
          <span className="text-dark-custom fw-medium-custom">
            {end !== null ? end : "-"}
          </span>
        </span>
      );
    }
  };

  const displayEmployementContent = (employment) => {
    return (
      <div className="d-block">
        <div className="d-block">{employerName(employment.employer_name)}</div>
        <div className="d-block">{jobTitle(employment.job_title)}</div>
        <div className="d-block">
          {displayLocation(
            employment.city,
            employment.province,
            employment.country_code
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="d-flex">
        <div className="icon-holder-sm icon-holder-info me-2">
          <IconContainer iconName={"FiBriefcase"} />
        </div>
        {displayEmployementContent(employmentDetails)}
      </div>
      <div className="d-block d-md-flex d-xl-flex d-lg-flex row align-items-center my-4">
        {displayDiscription(employmentDetails.description)}
      </div>
      <div className="d-flex justify-content-start">
        <div className="d-flex bg-light rounded-pill p-2 align-items-center">
          <div className="d-block me-2">
            <IconContainer iconName={"FiCalendar"} color="var(--warning)" />
          </div>
          {displayWorkYear(
            employmentDetails.start_date,
            employmentDetails.end_date,
            employmentDetails.is_current
          )}
        </div>
      </div>
    </>
  );
};

export default EmploymentContent;
