import React from "react";
import StaticPageHeaderComponent from "../PageCommonComponent/StaticPageHeaderComponent";
import ContactScreenLeftBlock from "./ContactScreenLeftBlock";
import ContactScreenRightBlock from "./ContactScreenRightBlock";

const ContactComponent = () => {
  return (
    <div className="d-block bg-white-custom">
      <StaticPageHeaderComponent
        title="Contact Us"
        description_sm={"For any type of queries contact our support team."}
      />
      <div className="container py-5">
        <div className="row">
          <ContactScreenLeftBlock />
          <div className="col-md-2 col-lg-2 d-flex justify-content-lg-end d-none d-md-block d-lg-block d-xl-block d-xxl-block"></div>
          <ContactScreenRightBlock />
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;
