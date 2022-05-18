import React, { useState, useEffect } from "react";
import InputLebelComponent from "../../InputLebel/InputLebelComponent";
import HeaderXSm from "../../Headers/HeaderXSm";

const AccountLoginDetailsForm = (props) => {
  const { resourceManagerDetails } = props;

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (resourceManagerDetails) {
      setEmail(resourceManagerDetails.user_email);
    }
  }, [resourceManagerDetails]);

  return (
    <div className="card-custom">
      <div className="card-body">
        <form id="create-frm">
          <div className="d-block">
            <div className="d-block">
              <HeaderXSm
                title={"Login Information"}
                subText={null}
                borderBottom={true}
              />
            </div>

            <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
              <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                <div className="form-input-holder">
                  <InputLebelComponent title="Login Email Address" />
                  <div className="d-block">
                    <input
                      type="email"
                      className="form-control-custom-sm"
                      id="email-address"
                      placeholder="Enter email address"
                      value={email}
                      autoComplete="off"
                      disabled="disabled"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountLoginDetailsForm;
