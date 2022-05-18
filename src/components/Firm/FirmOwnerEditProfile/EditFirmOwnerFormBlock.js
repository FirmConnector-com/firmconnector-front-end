import React from "react";
import AccountLoginDetailsForm from "./AccountLoginDetailsForm";
import ProfileBasicForm from "./ProfileBasicForm";

const EditFirmOwnerFormBlock = (props) => {
  const { userDetails, userSlug } = props;

  return (
    <>
      <div className="d-flex flex-column">
        <span className="display-6">Edit Profile</span>
      </div>
      <div className="d-block">
        <p>
          <strong>Note</strong>{" "}
          <span className="text-danger-custom">
            ***Please fill up all fields
          </span>
        </p>
      </div>
      <div className="col-12 col-lg-8 col-xl-8">
        <div className="d-block mb-4">
          <AccountLoginDetailsForm
            userDetails={userDetails.login_details}
            userSlug={userSlug}
          />
        </div>
        <div className="d-block mb-4">
          <ProfileBasicForm
            userDetails={userDetails.profile_details}
            userSlug={userSlug}
          />
        </div>
      </div>
    </>
  );
};

export default EditFirmOwnerFormBlock;
