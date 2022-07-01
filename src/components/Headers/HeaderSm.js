import React from "react";

const HeaderSm = (props) => {
  const { title, subText, borderBottom } = props;

  return (
    <div
      className={`d-block pb-1 mb-4 ${
        borderBottom ? "border-bottom-light" : null
      }`}
    >
      <div className="d-block">
        <span className="header-text-title-custom text-dark-custom">
          {title}
        </span>
      </div>
      <div className="d-block">
        <span className="text-muted">{subText}</span>
      </div>
    </div>
  );
};

export default HeaderSm;
