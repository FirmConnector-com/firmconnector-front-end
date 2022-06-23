import React from "react";

const HeaderLg = (props) => {
  const { title, subText } = props;

  return (
    <div className="header-holder">
      <h3 className="text-blue-dark-custom">{title}</h3>
      <div className="d-block">
        <span className="text-secondary">{subText}</span>
      </div>
    </div>
  );
};

export default HeaderLg;
