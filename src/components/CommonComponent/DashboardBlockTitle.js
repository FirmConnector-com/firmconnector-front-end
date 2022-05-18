import React from "react";

const DashboardBlockTitle = (props) => {
  const { title, subTitle } = props;

  return (
    <div className="block-title">
      <div className="d-block">
        <div className="card-title-custom">
          <span>{title}</span>
        </div>
      </div>
      <div className="d-block" style={{ lineHeight: "1rem" }}>
        <span className="text-muted-custom ">{subTitle}</span>
      </div>
    </div>
  );
};

export default DashboardBlockTitle;
