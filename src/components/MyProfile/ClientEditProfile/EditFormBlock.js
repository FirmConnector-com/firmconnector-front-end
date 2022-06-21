import React from "react";
import AccountLoginDetailsForm from "./AccountLoginDetailsForm";
import ProfileBasicForm from "./ProfileBasicForm";
import ProfileContactForm from "./ProfileContactForm";

const EditFormBlock = (props) => {
  const { userDetails, userSlug } = props;

  return (
    <div className="row">
      <div className="col-12 col-lg-8 col-xl-8 col-xxl-8">
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
      <div className="col-12 col-lg-4 col-xl-4 col-xxl-4">
        <div className="d-block">
          <ProfileContactForm
            userDetails={userDetails.contact_details}
            userSlug={userSlug}
          />
        </div>
      </div>
    </div>
  );
};

export default EditFormBlock;
