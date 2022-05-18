import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingPageSm = (props) => {
  const { title } = props;

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column">
      <div className="d-block mb-2">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
      <div className="d-block">
        <span>{title}</span>
      </div>
    </div>
  );
};

export default LoadingPageSm;
