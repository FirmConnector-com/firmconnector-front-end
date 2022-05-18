import React from "react";
import IconContainer from "../../Iconcontainer/IconContainer";
import { ASSETS_BASE } from "../../../config/env";

const DocumentHolderSm = (props) => {
  const { title, path } = props;

  const displayFileName = () => {
    if (title.length > 20) {
      return title.replace(title.substring(10, title.length - 6), "~~~~~");
    } else {
      return title;
    }
  };

  return (
    <div className="d-flex shadow-sm p-2 mb-3 cursor-pointer document-box-sm">
      <IconContainer iconName={"FiFileText"} color="var(--black)" />
      <a
        href={ASSETS_BASE + "uploads/resume/" + path}
        download
        className="text-dark-custom"
      >
        <div className="d-block ms-2">
          <span>{displayFileName()}</span>
        </div>
      </a>
    </div>
  );
};

export default DocumentHolderSm;
