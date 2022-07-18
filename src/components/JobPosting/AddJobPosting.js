import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import InputLebelComponent from "../InputLebel/InputLebelComponent";
import { Button } from "react-bootstrap";
import { AlertDanger, AlertInfo, AlertSuccess } from "../Alerts/Alert";
import HeaderXSm from "../Headers/HeaderXSm";

//import API
import createJob from "../../apis/createJob";
import { FIRM_IMAGE_BASE } from "../../config/env";
import getFirmAccessList from "../../apis/getFirmAccessList";
import BlockHeader from "../Headers/BlockHeader";

const AddJobPosting = () => {
  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;
  const user_primary_role = JSON.parse(userDetails).user_primary_role;

  const [roleTitle, setRoleTitle] = useState("");
  const [firmList, setFirmList] = useState(false);
  const [description, setDescription] = useState("");
  const [isFirmListLoading, setIsFirmListLoading] = useState(true);
  const [selectedFirmList, setSelectedFirmList] = useState([]);

  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [language, setLanguage] = useState("");

  const [buttonText, setButtonText] = useState("Create Job");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [isValidSubmit, setIsValidSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (user_slug !== undefined) {
      Promise.all([getFirmAccessList(user_slug)])
        .then(async ([data]) => {
          if (data?.data?.firmList) {
            setIsFirmListLoading(false);
            setFirmList(data.data.firmList);

            var firmCheckedIds = [];

            data.data.firmList.map((item) => {
              return firmCheckedIds.push(item.firm_id);
            });
          } else {
            setIsFirmListLoading(false);
          }
        })
        .catch((err) => {
          setIsFirmListLoading(false);
          console.log(err);
        });
    }
  }, [user_slug]);

  const displayRelatedFirms = () => {
    if (isFirmListLoading) {
      return displayLoadingBlock();
    } else {
      return displayFirmList();
    }
  };

  const updateSelectedFirmIds = (id) => {
    let ids = [...selectedFirmList];
    const index = selectedFirmList.indexOf(id);

    if (index > -1) {
      for (let i = 0; i < ids.length; i++) {
        if (ids[i] === id) {
          ids.splice(i, 1);
        }
      }
    } else {
      ids.push(id);
    }
    setSelectedFirmList(ids);
  };

  const handleRoleTitleChange = (e) => {
    setRoleTitle(e.target.value);
  };

  const handleSkillChange = (e) => {
    setSkills(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const displayMainContent = () => {
    return displayFormBlock();
  };

  const handleFormSubmit = () => {
    //disable button
    setIsButtonDisabled(true);

    //change button text while processing
    setButtonText("Processing, please wait...");

    //change alert block content
    setHasSubmitError(false);
    setErrorMessage(false);
    setIsValidSubmit(false);
    setSuccessMessage(false);

    let isInvalid = 0;
    let errMessage = [];

    if (roleTitle.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Enter role title");
    }

    if (description.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Enter description");
    }

    if (selectedFirmList.length === 0) {
      isInvalid = 1;
      errMessage.push("Select at least one firm");
    }

    if (isInvalid === 1) {
      setErrorMessage(errMessage);
      setHasSubmitError(true);
      setIsButtonDisabled(false);
      setButtonText("Create Post");
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    let errMessage = [];
    let succMessage = [];

    let formData = {
      user_slug: user_slug,
      job_title: roleTitle,
      job_description: description,
      firm_ids: selectedFirmList,
      required_skill_set: skills,
      experience_required: experience,
      preffered_language: language,
    };

    try {
      createJob(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            succMessage.push(data.data.message);
            setSuccessMessage(succMessage);
            setIsValidSubmit(true);
            setHasSubmitError(false);
            setIsButtonDisabled(true);
            setButtonText("Create Job");
            setTimeout(() => {
              window.location.replace("/job/my-jobs");
            }, 500);
          } else if (data.data.status === 0) {
            errMessage.push(data.data.message);
            setErrorMessage(errMessage);
            setHasSubmitError(true);
            setIsButtonDisabled(false);
            setButtonText("Create Job");
          } else {
            errMessage.push("Error happened. Unable to create job.");
            setErrorMessage(errMessage);
            setHasSubmitError(true);
            setIsButtonDisabled(false);
            setButtonText("Create Post");
          }
        } else {
          errMessage.push("Error happened. Unable to create job");
          setErrorMessage(errMessage);
          setHasSubmitError(true);
          setIsButtonDisabled(false);
          setButtonText("Create Post");
        }
      });
    } catch (error) {
      errMessage.push("Error happened. Network error happened.");
      setErrorMessage(errMessage);
      setHasSubmitError(true);
      setIsButtonDisabled(false);
      setButtonText("Create Post");
    }
  };

  const displayFirmList = () => {
    if (firmList) {
      return (
        <div className="d-block">
          <InputLebelComponent title="Select firms to be notified of opportunity" />
          <div className="d-flex mt-2">
            {firmList.map(function (item) {
              return (
                <div
                  key={item.firm_id}
                  className="d-block me-4 border border-info rounded p-2"
                >
                  <div className="form-check mt-1 d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={item.firm_id}
                      onChange={() => updateSelectedFirmIds(item.firm_id)}
                      id={"firm-id-" + item.firm_id}
                    />
                    <div
                      className="firm-logo-sm-custom ms-2"
                      alt={item.firm_name}
                      style={{
                        backgroundImage: `url("${
                          FIRM_IMAGE_BASE + item.firm_logo
                        }")`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };

  const displayLoadingBlock = () => {
    return (
      <div>
        <span>Loading related firm list</span>
      </div>
    );
  };

  const displayTopBlock = () => {
    return (
      <BlockHeader
        title={"Create a new job posting"}
        subText={
          "Populate information below and select which firms to help find candidates"
        }
      />
    );
  };

  const displayForm = () => {
    return (
      <div className="d-block">
        <div className="card-custom">
          <HeaderXSm
            title={"Note:"}
            subText={
              "Job posting details from this form will be shared with the selected firms below in order to streamline your recruitment process"
            }
            borderBottom={true}
          />
          <div className="card-body">
            {displayJobBlock()}
            {displayRelatedFirms()}
            {displayStatusMessage()}
            {displaySubmitButton()}
          </div>
        </div>
      </div>
    );
  };

  const displayJobBlock = () => {
    return (
      <div className="d-block mb-4">
        <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
          <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
            <div className="form-input-holder">
              <InputLebelComponent title="Job Title" />
              <div className="d-block">
                <input
                  type="text"
                  className="form-control"
                  id="role-title"
                  placeholder="Enter job title"
                  onChange={handleRoleTitleChange}
                  value={roleTitle}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-block mb-4">
          <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
            <div className="col-12 col-md-12 col-lg-12 col-xlg-12">
              <div className="form-input-holder">
                <InputLebelComponent title="Job Description" />
                <div className="d-block">
                  <textarea
                    type="textarea"
                    className="form-control"
                    id="description"
                    placeholder="Enter job description"
                    onChange={handleDescriptionChange}
                    value={description}
                    autoComplete="off"
                    rows={6}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
            <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
              <div className="form-input-holder">
                <InputLebelComponent title="Skills Required (optional)" />
                <div className="d-block">
                  <input
                    type="text"
                    className="form-control"
                    id="skills"
                    placeholder="Enter required skill set"
                    autocomplete="off"
                    value={skills}
                    onChange={handleSkillChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
              <div className="form-input-holder">
                <InputLebelComponent title="Experience Required (optional)" />
                <div className="d-block">
                  <input
                    type="text"
                    className="form-control"
                    id="experience"
                    placeholder="Enter experience required for this post"
                    autocomplete="off"
                    value={experience}
                    onChange={handleExperienceChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
            <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
              <div className="form-input-holder">
                <InputLebelComponent title="Preferred Language (optional)" />
                <div className="d-block">
                  <input
                    type="text"
                    className="form-control"
                    id="preffered-language"
                    placeholder="Enter preferred language if any"
                    autocomplete="off"
                    value={language}
                    onChange={handleLanguageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const displaySubmitButton = () => {
    return (
      <div className="form-button-holder justify-content-end mt-4">
        <Button
          variant="primary"
          disabled={isButtonDisabled}
          onClick={handleFormSubmit}
        >
          {buttonText}
        </Button>
      </div>
    );
  };

  const displayStatusMessage = () => {
    return (
      <div className="d-block mt-4">
        {displayErrorMessage()} {displaySuccessMessage()}
      </div>
    );
  };

  const displayErrorMessage = () => {
    if (hasSubmitError) {
      return <AlertDanger title={"Oops"} message={errorMessage} />;
    }
  };

  const displaySuccessMessage = () => {
    if (isValidSubmit) {
      return <AlertSuccess title={"Success"} message={successMessage} />;
    }
  };
  const displayFormBlock = () => {
    if (user_primary_role === "2") {
      return (
        <>
          {displayTopBlock()}
          {displayForm()}
        </>
      );
    } else {
      return (
        <AlertInfo
          title={"Note"}
          message={"You do not have access to create Resource"}
        />
      );
    }
  };

  return <div className="d-block">{displayMainContent()}</div>;
};

export default AddJobPosting;
