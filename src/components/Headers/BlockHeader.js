import React from "react";

const HeaderLg = (props) => {
  const { title, subText } = props;

  return (
    <div className="header-holder">
      <div className="display-6 fw-medium-custom mb-2">{title}</div>
      <div className="d-block">
        <span className="lead text-dark">{subText}</span>
      </div>
    </div>
  );
};

export default HeaderLg;
