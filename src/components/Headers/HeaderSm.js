import React from "react";

const HeaderSm = (props) => {
  const { title, subText, borderBottom } = props;

  return (
    <div
      className={`header-holder ${borderBottom ? "border-bottom-light" : null}`}
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
