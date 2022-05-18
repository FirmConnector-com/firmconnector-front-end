import React from "react";
import "./icon.css";

const ImageIconSmHolder = (props) => {
  const { imageUrl } = props;

  return (
    <div className="icon-sm">
      <img src={imageUrl} className="h-100 w-100" alt="Firmconnector" />
    </div>
  );
};

export default ImageIconSmHolder;
