import React from "react";
import { Link } from "react-router-dom";

import "../../assets/css/button.css";

const ButtonSm = (props) => {
  const { title, className, to, type } = props;

  return (
    <Link to={to}>
      <div className={`btn-custom ${className}`} type={type}>
        <span>{title}</span>
      </div>
    </Link>
  );
};

export default ButtonSm;
