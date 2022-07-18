import React from "react";

const HeaderXSm = (props) => {
  const { title, subText, borderBottom } = props;

  return (
    <div
      className={`header-holder bg-light mb-3 px-3 py-2 ${
        borderBottom ? "border-bottom-light" : null
      }`}
    >
      <div className="d-block">
        <span className="h5 fw-bold">{title}</span>
      </div>
      <div className="d-block">
        <span className="text-muted-custom">{subText}</span>
      </div>
    </div>
  );
};

export default HeaderXSm;
