import React from "react";
import "./style.css";

const BadgeSuccess = (props) => {
  const { title, alt } = props;

  return (
    <div className="badge-custom bg-success-custom w-auto d-inline-block justify-content-center align-items-center">
      <span className="text-x-sm-custom fw-medium-custom" title={alt}>
        {title}
      </span>
    </div>
  );
};

const BadgeLight = (props) => {
  const { title } = props;

  return (
    <div className="badge-custom bg-light w-auto d-inline-block justify-content-center align-items-center">
      <span className="text-x-sm-custom text-dark">{title}</span>
    </div>
  );
};

const BadgeInfo = (props) => {
  const { title } = props;

  return (
    <div className="badge-custom bg-info-custom w-auto d-inline-block justify-content-center align-items-center">
      <span className="text-x-sm-custom text-badge-info-custom">{title}</span>
    </div>
  );
};

export { BadgeSuccess, BadgeLight, BadgeInfo };
