import React from "react";
import ProfileBasicForm from "./ProfileBasicForm";

const EditFirmFormBlock = (props) => {
  const { firmDetails, userSlug } = props;

  return (
    <>
      <div className="d-flex flex-column">
        <span className="display-6">Edit Firm Details</span>
      </div>
      <div className="d-block">
        <p>
          <strong>Note</strong>{" "}
          <span className="text-danger-custom">
            ***Please fill up all fields
          </span>
        </p>
      </div>
      <div className="d-block col-12 col-lg-8 col-xl-8">
        <ProfileBasicForm firmDetails={firmDetails} userSlug={userSlug} />
      </div>
    </>
  );
};

export default EditFirmFormBlock;
