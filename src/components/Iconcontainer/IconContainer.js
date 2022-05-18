import React from "react";
import * as Icons from "react-icons/fi";

const IconContainer = (props) => {
  const { iconName, color } = props;
  const icon = React.createElement(Icons[iconName]);

  return (
    <div
      style={{
        fontSize: "1.1rem",
        color: color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icon}
    </div>
  );
};

export default IconContainer;
