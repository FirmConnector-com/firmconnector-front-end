import React from "react";

const HeaderLg = (props) => {
  const { title, subText } = props;

  return (
    <div className="header-holder">
      <div className="display-6 fw-bold">{title}</div>
      <div className="d-block">
        <span className="text-muted-custom">{subText}</span>
      </div>
    </div>
  );
};

export default HeaderLg;
