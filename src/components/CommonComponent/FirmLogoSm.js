import React from "react";
import { FIRM_IMAGE_BASE } from "../../config/env";

const FirmLogoSm = (props) => {
  const { imgSrc } = props;

  return (
    <div className="firm-logo-sm">
      <img className="img-fluid" src={FIRM_IMAGE_BASE + imgSrc} alt="" />
    </div>
  );
};

export default FirmLogoSm;
