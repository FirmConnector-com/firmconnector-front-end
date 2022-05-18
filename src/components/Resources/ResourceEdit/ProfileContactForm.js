import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { AlertDanger, AlertSuccess } from "../../Alerts/Alert";

import InputLebelComponent from "../../InputLebel/InputLebelComponent";
import HeaderXSm from "../../Headers/HeaderXSm";

import updateProfileContactInfo from "../../../apis/updateProfileContactInfo";
import getAllState from "../../../apis/getAllState";
import getAllCity from "../../../apis/getAllCity";

const ProfileContactForm = (props) => {
  const { resourceDetails, resourceSlug } = props;

  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [officePhone, setOfficePhone] = useState("");

  const [userStreetAddress, setUserStreetAddress] = useState("");
  const [userAddressCityId, setUserAddressCityId] = useState(false);
  const [userAddressProvienceId, setUserAddressProvienceId] = useState(false);
  const [userAddressCountryId, setUserAddressCountryId] = useState(false);

  const [countryList, setCountryList] = useState(false);
  const [stateList, setStateList] = useState(false);
  const [cityList, setCityList] = useState(false);

  const [buttonText, setButtonText] = useState("Update Contact Details");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [isValidSubmit, setIsValidSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    setContactEmail(resourceDetails.contact_email);
    setPhone(resourceDetails.user_phone);
    setOfficePhone(resourceDetails.user_office_phone);

    setUserStreetAddress(resourceDetails.user_street_address);
    setUserAddressCityId(resourceDetails.user_address_city_id);
    setUserAddressProvienceId(resourceDetails.user_address_provience_id);
    setUserAddressCountryId(resourceDetails.user_address_country_id);

    setCountryList(resourceDetails.country_list);
    setStateList(resourceDetails.state_list);
    setCityList(resourceDetails.city_list);
  }, [resourceDetails]);

  useEffect(() => {}, [
    contactEmail,
    phone,
    officePhone,
    countryList,
    stateList,
    cityList,
    userStreetAddress,
    userAddressCityId,
    userAddressCountryId,
    userAddressProvienceId,
  ]);

  const handleContactEmailChange = (e) => {
    setContactEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleOfficePhoneChange = (e) => {
    setOfficePhone(e.target.value);
  };

  //////////////////////////////////////////////
  const handleStreetAddressChange = (e) => {
    setUserStreetAddress(e.target.value);
  };

  const handleCityChange = (e) => {
    setUserAddressCityId(e.target.value);
  };

  const handleProvienceChange = (e) => {
    setUserAddressProvienceId(e.target.value);
    getCityList(e.target.value);
  };

  const handleCountryChange = (e) => {
    setUserAddressCountryId(e.target.value);
    getStateList(e.target.value);
  };

  const getStateList = (id) => {
    setStateList(false);
    setCityList(false);

    let formData = {
      countryID: id,
    };

    try {
      getAllState(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            setStateList(data.data.list);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getCityList = (id) => {
    setCityList(false);

    let formData = {
      stateID: id,
    };

    try {
      getAllCity(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            setCityList(data.data.list);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  //////////////////////////////////////////////////

  const handleFormSubmit = () => {
    //disable signup button
    setIsButtonDisabled(true);

    //change signup button text while processing
    setButtonText("Processing, please wait...");

    //change alert block content
    setHasSubmitError(false);
    setErrorMessage(false);
    setIsValidSubmit(false);
    setSuccessMessage(false);

    //check for valid email
    const emailPattern =
      // /^([\w-.]+@(?!gmail\.com)(?!yahoo\.com)(?!hotmail\.com)(?!mail\.ru)(?!yandex\.ru)(?!mail\.com)([\w-]+.)+[\w-]{2,4})?$/;
      /^([\w-.]+@(?!mail\.ru)(?!yandex\.ru)(?!mail\.com)([\w-]+.)+[\w-]{2,4})?$/;

    const phonePattern =
      /^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/;

    let isInvalid = 0;
    let errMessage = [];

    if (!emailPattern.test(contactEmail)) {
      isInvalid = 1;
      errMessage.push("Enter a valid contact email address");
    }

    if (phone.trim().length > 0) {
      if (!phonePattern.test(phone)) {
        isInvalid = 1;
        errMessage.push("Enter a valid phone number");
      }
    }

    // if (userStreetAddress.trim().length === 0) {
    //   isInvalid = 1;
    //   errMessage.push("Enter a valid street address");
    // }

    if (userAddressCountryId === "0") {
      isInvalid = 1;
      errMessage.push("Select your country");
    }

    if (userAddressProvienceId === "0") {
      isInvalid = 1;
      errMessage.push("Select your provience");
    }

    if (userAddressCityId === "0") {
      isInvalid = 1;
      errMessage.push("Select your city");
    }

    if (isInvalid === 1) {
      setErrorMessage(errMessage);
      setHasSubmitError(true);
      setIsButtonDisabled(false);
      setButtonText("Update Contact Details");
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    let errMessage = [];
    let succMessage = [];

    let formData = {
      userSlug: resourceSlug,
      contactEmail: contactEmail,
      phone: phone,
      officePhone: officePhone,
      city: userAddressCityId,
      state: userAddressProvienceId,
      country: userAddressCountryId,
      streetAddress: userStreetAddress,
    };

    try {
      updateProfileContactInfo(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            succMessage.push(data.data.message);
            setSuccessMessage(succMessage);
            setIsValidSubmit(true);
            setHasSubmitError(false);
            setIsButtonDisabled(false);
            setButtonText("Update Contact Details");

            setTimeout(() => {
              setIsValidSubmit(false);
              setHasSubmitError(false);
              setErrorMessage(false);
              setSuccessMessage(false);
            }, 2000);
          } else if (data.data.status === 0) {
            errMessage.push(data.data.message);
            setErrorMessage(errMessage);
            setHasSubmitError(true);
            setIsButtonDisabled(false);
            setButtonText("Update Contact Details");
          } else {
            errMessage.push(
              "Error happened. Unable to update contact information."
            );
            setErrorMessage(errMessage);
            setHasSubmitError(true);
            setIsButtonDisabled(false);
            setButtonText("Update Contact Details");
          }
        } else {
          errMessage.push(
            "Error happened. Unable to update your contact information"
          );
          setErrorMessage(errMessage);
          setHasSubmitError(true);
          setIsButtonDisabled(false);
          setButtonText("Update Contact Details");
        }
      });
    } catch (error) {
      errMessage.push("Error happened. Network error happened.");
      setErrorMessage(errMessage);
      setHasSubmitError(true);
      setIsButtonDisabled(false);
      setButtonText("Update Contact Details");
    }
  };

  const displaySubmitButton = () => {
    return (
      <div className="d-flex justify-content-end">
        <Button
          variant="primary"
          disabled={isButtonDisabled}
          onClick={handleFormSubmit}
          size="sm"
        >
          {buttonText}
        </Button>
      </div>
    );
  };

  const displayStatusMessage = () => {
    return (
      <>
        {displayErrorMessage()} {displaySuccessMessage()}
      </>
    );
  };

  const displayErrorMessage = () => {
    if (hasSubmitError) {
      return (
        <div className="d-block mt-4">
          <AlertDanger title={"Oops"} message={errorMessage} />
        </div>
      );
    }
  };

  const displaySuccessMessage = () => {
    if (isValidSubmit) {
      return (
        <div className="d-block mt-4">
          <AlertSuccess title={"Success"} message={successMessage} />
        </div>
      );
    }
  };

  return (
    <div className="card-custom">
      <div className="card-body">
        <form id="create-frm">
          <div className="d-block">
            <div className="d-block">
              <HeaderXSm
                title={"Contact Informations"}
                subText={null}
                borderBottom={true}
              />
            </div>

            <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
              <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                <div className="form-input-holder">
                  <InputLebelComponent title="Contact Email" />
                  <div className="d-block">
                    <input
                      type="email"
                      className="form-control-custom-sm"
                      id="contact-email"
                      placeholder="Enter contact email"
                      onChange={handleContactEmailChange}
                      value={contactEmail}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                <div className="form-input-holder">
                  <InputLebelComponent title="Phone Number" />
                  <div className="d-block">
                    <input
                      type="text"
                      className="form-control-custom-sm"
                      id="phone-number"
                      placeholder="Enter phone number"
                      onChange={handlePhoneChange}
                      value={phone}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                <div className="form-input-holder">
                  <InputLebelComponent title="Office Phone" />
                  <div className="d-block">
                    <input
                      type="text"
                      className="form-control-custom-sm"
                      id="office-phone-number"
                      placeholder="Enter office phone number"
                      onChange={handleOfficePhoneChange}
                      value={officePhone}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="form-input-holder">
                  <InputLebelComponent title="Street address" />
                  <div className="d-block">
                    <input
                      type="text"
                      className="form-control-custom-sm"
                      id="street-address"
                      placeholder="Enter your street address"
                      onChange={handleStreetAddressChange}
                      value={userStreetAddress}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 col-lg-4 col-xlg-4">
                <div className="form-input-holder">
                  <InputLebelComponent title="Select Country" />
                  <div className="d-block">
                    <select
                      className="form-control-custom-sm"
                      aria-label="Country"
                      onChange={handleCountryChange}
                      value={userAddressCountryId}
                    >
                      <option value="">Select country</option>
                      {countryList ? (
                        <>
                          {countryList.map(function (item) {
                            return <option value={item.id}>{item.name}</option>;
                          })}
                        </>
                      ) : null}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 col-lg-4 col-xlg-4">
                <div className="form-input-holder">
                  <InputLebelComponent title="Select Provience/State" />
                  <div className="d-block">
                    <select
                      className="form-control-custom-sm"
                      aria-label="State"
                      onChange={handleProvienceChange}
                      value={userAddressProvienceId}
                    >
                      <option value="">Select provience</option>
                      {stateList ? (
                        <>
                          {stateList.map(function (item) {
                            return <option value={item.id}>{item.name}</option>;
                          })}
                        </>
                      ) : null}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 col-lg-4 col-xlg-4">
                <div className="form-input-holder">
                  <InputLebelComponent title="Select City" />
                  <div className="d-block">
                    <select
                      className="form-control-custom-sm"
                      aria-label="City"
                      onChange={handleCityChange}
                      value={userAddressCityId}
                    >
                      <option value="">Select city</option>
                      {cityList ? (
                        <>
                          {cityList.map(function (item) {
                            return <option value={item.id}>{item.name}</option>;
                          })}
                        </>
                      ) : null}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {displaySubmitButton()}
          {displayStatusMessage()}
        </form>
      </div>
    </div>
  );
};

export default ProfileContactForm;
