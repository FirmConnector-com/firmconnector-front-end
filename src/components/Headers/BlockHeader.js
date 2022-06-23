import React from "react";

const HeaderLg = (props) => {
  const { title, subText } = props;

  return (
    <div className="d-block mb-4 py-2">
      <div className="d-block">
        <span className="fs-3 fw-bolder text-blue-dark-custom">{title}</span>
      </div>
      <div className="d-block">
        <span className="text-dark fst-normal fs-6">{subText}</span>
      </div>
    </div>
  );
};

export default HeaderLg;
