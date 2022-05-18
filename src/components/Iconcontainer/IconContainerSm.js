import React from "react";
import * as Icons from "react-icons/fi";

const IconContainerSm = (props) => {
  const { iconName, color } = props;
  const icon = React.createElement(Icons[iconName]);

  return (
    <div
      style={{
        display: "flex",
        fontSize: "1rem",
        color: color,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icon}
    </div>
  );
};

export default IconContainerSm;
