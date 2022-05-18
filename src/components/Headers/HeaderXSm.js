import React from "react";

const HeaderXSm = (props) => {
  const { title, subText, borderBottom } = props;

  return (
    <div
      className={`header-holder ${borderBottom ? "border-bottom-light" : null}`}
    >
      <div className="d-block">
        <span className="text-md-custom fw-bold-custom">{title}</span>
      </div>
      <div className="d-block">
        <span className="text-muted-custom">{subText}</span>
      </div>
    </div>
  );
};

export default HeaderXSm;
