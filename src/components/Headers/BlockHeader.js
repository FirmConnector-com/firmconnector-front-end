import React from "react";

const HeaderLg = (props) => {
  const { title, subText } = props;

  return (
    <div className="d-block mb-5">
      <p className="mb-0 fw-bold display-6">{title}</p>
      <div className="d-block">
        <span className="text-secondary bd-lead">{subText}</span>
      </div>
    </div>
  );
};

export default HeaderLg;
