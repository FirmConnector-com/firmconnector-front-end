import React from "react";
import "./alert.css";

const AlertDanger = (props) => {
  const { title, message } = props;

  const splitMessage = () => {
    if (message.length > 0) {
      return (
        <div>
          {message.map((item, index) => {
            return (
              <div key={index}>
                <span className="text-danger-custom">{item}</span>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="alert-custom alert-danger-custom w-100">
      <div>
        <span className="text-danger-custom fw-bold">{title}</span>
      </div>
      {splitMessage()}
    </div>
  );
};

const AlertSuccess = (props) => {
  const { title, message } = props;

  return (
    <div className="alert-custom alert-success-custom w-100">
      <div>
        <span className="text-success-custom fw-bold">{title}</span>
      </div>
      <div>
        <span className="text-success-custom">{message}</span>
      </div>
    </div>
  );
};

const AlertInfo = (props) => {
  const { title, message } = props;

  return (
    <div className="alert-custom alert-info-custom w-100">
      <div>
        <span className="text-info-custom fw-bold">{title}</span>
      </div>
      <div>
        <span className="text-info-custom">{message}</span>
      </div>
    </div>
  );
};

const AlertWarning = (props) => {
  const { title, message } = props;

  return (
    <div className="alert-custom alert-warning-custom">
      <div>
        <span className="text-info-custom fw-bold">{title}</span>
      </div>
      <div>
        <span className="text-info-custom">{message}</span>
      </div>
    </div>
  );
};

export { AlertDanger, AlertSuccess, AlertInfo, AlertWarning };
