import React from "react";

const InputLebelComponent = (props) => {
  const { title } = props;

  return (
    <div className="form-input-header">
      <span className="fw-medium-custom">{title}</span>
    </div>
  );
};

export default InputLebelComponent;
