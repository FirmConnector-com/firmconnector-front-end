import React from "react";
import contact_us from "../../assets/images/contact_us.svg";

const ContactScreenLeftBlock = () => {
  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-5">
      <div className="d-block mb-4">
        <div className="d-block">
          <span>Please get in touch. We'd love to hear from you.</span>
        </div>
        <div className="d-block">
          <span className="text-info-light-custom">info@firmconnector.com</span>
        </div>
      </div>
      <div className="d-block login-page-lg-image mb-4">
        <img src={contact_us} className="img-full-width" alt="..." />
      </div>
    </div>
  );
};

export default ContactScreenLeftBlock;
