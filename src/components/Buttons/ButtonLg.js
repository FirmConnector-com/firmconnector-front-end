import React from "react";
import { Link } from "react-router-dom";

import "../../assets/css/button.css";

const ButtonLg = (props) => {
  const { title, className, to, type } = props;

  if (to === null) {
    return (
      <button className={`btn-custom btn-lg-custom ${className}`} type={type}>
        <span>{title}</span>
      </button>
    );
  } else {
    return (
      <Link to={to} className="w-100">
        <button className={`btn-custom btn-lg-custom ${className}`} type={type}>
          <span>{title}</span>
        </button>
      </Link>
    );
  }
};

export default ButtonLg;
