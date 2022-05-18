import React from "react";

const Breadcrumb = (props) => {
  const { title } = props;

  return (
    <div>
      <span>{title}</span>
    </div>
  );
};

export default Breadcrumb;
