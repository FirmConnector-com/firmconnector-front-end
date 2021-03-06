import React from "react";

const HeaderSm = (props) => {
  const { title, subText, borderBottom } = props;

  return (
    <div
      className={`header-holder mb-3 px-3 py-2 ${
        borderBottom ? "border-bottom-light" : null
      }`}
    >
      <div className="d-block">
        <span className="fw-bold-custom">{title}</span>
      </div>
      <div className="d-block">
        <span className="text-muted-custom">{subText}</span>
      </div>
    </div>
  );
};

export default HeaderSm;
