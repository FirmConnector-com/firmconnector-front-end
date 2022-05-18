import React from "react";
import AccountLoginDetailsForm from "./AccountLoginDetailsForm";
import ProfileBasicForm from "./ProfileBasicForm";
import ProfileContactForm from "./ProfileContactForm";

const EditResourceManagerFormBlock = (props) => {
  const { resourceManagerDetails, resourceManagerSlug } = props;

  console.log(resourceManagerDetails);

  return (
    <div className="row">
      <div className="col-12 col-lg-8 col-xl-8 col-xxl-8">
        <div className="d-block mb-4">
          <AccountLoginDetailsForm
            resourceManagerDetails={resourceManagerDetails.login_details}
            resourceManagerSlug={resourceManagerSlug}
          />
        </div>
        <div className="d-block mb-4">
          <ProfileBasicForm
            resourceManagerDetails={resourceManagerDetails.profile_details}
            resourceManagerSlug={resourceManagerSlug}
          />
        </div>
      </div>
      <div className="col-12 col-lg-4 col-xl-4 col-xxl-4">
        <div className="d-block">
          <ProfileContactForm
            resourceManagerDetails={resourceManagerDetails.contact_details}
            resourceManagerSlug={resourceManagerSlug}
          />
        </div>
      </div>
    </div>
  );
};

export default EditResourceManagerFormBlock;
