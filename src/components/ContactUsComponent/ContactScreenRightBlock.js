import React from "react";
import ButtonLg from "../Buttons/ButtonLg";
import HeaderXSm from "../Headers/HeaderXSm";
import InputLebelComponent from "../InputLebel/InputLebelComponent";

const ContactScreenRightBlock = () => {
  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-5">
      <div className="card d-block p-4 rounded shadow-lg">
        <form>
          <HeaderXSm
            title={"Get in touch"}
            subText={
              "Have any queries or some feedback for us? Fill out the form below to contact our team."
            }
            borderBottom={true}
          />
          <div className="form-input-holder">
            <InputLebelComponent title="Your Name" />
            <div className="d-block">
              <input
                type="text"
                className="form-control"
                id="full-name"
                placeholder="Enter your full name"
              />
            </div>
          </div>
          <div className="form-input-holder">
            <InputLebelComponent title="Email" />
            <div className="d-block">
              <input
                type="email"
                className="form-control"
                id="email-address"
                placeholder="Enter email address"
              />
            </div>
          </div>
          <div className="form-input-holder">
            <InputLebelComponent title="Phone" />
            <div className="d-block">
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Enter your mobile number"
              />
            </div>
          </div>

          <div className="form-input-holder">
            <InputLebelComponent title="Message" />
            <div className="d-block">
              <textarea
                type="text"
                className="form-control"
                id="message"
                placeholder="Write something about your query"
                rows={3}
              />
            </div>
          </div>

          <div className="form-button-holder justify-content-end mt-4">
            <ButtonLg
              className="btn-info w-100"
              role="button"
              title="Send Query"
              type="button"
              to={"#"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactScreenRightBlock;
