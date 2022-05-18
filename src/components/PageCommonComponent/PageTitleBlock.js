import React from "react";

const PageTitleBlock = (props) => {
  const { title, subText } = props;

  return (
    <div className="d-block">
      <div className="d-block">
        <span className="display-6 text-white">{title}</span>
      </div>

      <div className="d-block">
        <span className="lead text-white">{subText}</span>
      </div>
    </div>
  );
};

export default PageTitleBlock;
