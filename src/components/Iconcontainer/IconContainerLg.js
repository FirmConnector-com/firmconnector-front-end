import React from "react";
import * as Icons from "react-icons/fi";

const IconContainerLg = (props) => {
  const { iconName, color } = props;
  const icon = React.createElement(Icons[iconName]);

  return (
    <div
      style={{
        fontSize: "1.5rem",
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

export default IconContainerLg;
