import React from "react";

const HeaderLg = (props) => {
  const { title, subText } = props;

  return (
    <div className="header-holder">
      <div className="h1">{title}</div>
      <div className="d-block">
        <span className="text-muted-custom fw-medium-custom">{subText}</span>
      </div>
    </div>
  );
};

export default HeaderLg;
