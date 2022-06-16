import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import InputLebelComponent from "../InputLebel/InputLebelComponent";
import { Button } from "react-bootstrap";
import { AlertDanger, AlertInfo, AlertSuccess } from "../Alerts/Alert";
import { Link } from "react-router-dom";

//import API
import updateJob from "../../apis/updateJob";
import { FIRM_IMAGE_BASE } from "../../config/env";
import getFirmAccessList from "../../apis/getFirmAccessList";
import getJobEditDetails from "../../apis/getJobEditDetails";
import LoadingPageSm from "../CommonComponent/LoadingPageSm";

import BlockHeader from "../Headers/BlockHeader";

const EditJobPosting = (props) => {
  const { jobSlug } = props;

  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;
  const user_primary_role = JSON.parse(userDetails).user_primary_role;

  const [roleTitle, setRoleTitle] = useState("");
  const [firmList, setFirmList] = useState(false);
  const [description, setDescription] = useState("");
  const [isFirmListLoading, setIsFirmListLoading] = useState(true);
  const [selectedFirmList, setSelectedFirmList] = useState([]);
  const [selectedJobSlug, setSelectedJobSlug] = useState("");

  const [buttonText, setButtonText] = useState("Save Changes");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [isValidSubmit, setIsValidSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const [isJobDetailsLoading, setIsJobDetailsLoading] = useState(true);

  useEffect(() => {
    if (jobSlug !== undefined && user_slug !== undefined) {
      getJobDetails();
    }
  }, [jobSlug, user_slug]);

  const getJobDetails = () => {
    Promise.all([getJobEditDetails(user_slug, jobSlug)])
      .then(async ([data]) => {
        if (data?.data?.job_details) {
          await setRoleTitle(data.data.job_details.job_title);
          await setDescription(data.data.job_details.job_description);

          const firmArray = data.data.job_details.job_firm_access.split(",");
          await setSelectedFirmList(firmArray);

          await setSelectedJobSlug(data.data.job_details.job_slug);

          await getFirmList();
          setIsJobDetailsLoading(false);
        } else {
          setIsJobDetailsLoading(false);
        }
      })
      .catch((err) => {
        setIsJobDetailsLoading(false);
      });
  };

  const getFirmList = () => {
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
  };

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
      job_slug: selectedJobSlug,
    };

    try {
      updateJob(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            succMessage.push(data.data.message);
            setSuccessMessage(succMessage);
            setIsValidSubmit(true);
            setHasSubmitError(false);
            setIsButtonDisabled(true);
            setButtonText("Save Changes");
            setTimeout(() => {
              window.location.replace("/job/my-jobs");
            }, 500);
          } else if (data.data.status === 0) {
            errMessage.push(data.data.message);
            setErrorMessage(errMessage);
            setHasSubmitError(true);
            setIsButtonDisabled(false);
            setButtonText("Save Changes");
          } else {
            errMessage.push("Error happened. Unable to Save Changes.");
            setErrorMessage(errMessage);
            setHasSubmitError(true);
            setIsButtonDisabled(false);
            setButtonText("Create Post");
          }
        } else {
          errMessage.push("Error happened. Unable to Save Changes");
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
        <div className="d-flex">
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
                    checked={
                      selectedFirmList.includes(item.firm_id) ? true : false
                    }
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
        title={"Edit Job Details Informations"}
        subText={"Edit a posting within your firm"}
      />
    );
  };

  const displayForm = () => {
    return (
      <>
        <div className="d-block">
          <p>
            <strong>Please Note</strong>{" "}
            <span className="text-info-light-custom">
              ***Fill up all fields to create a new job
            </span>
          </p>
        </div>
        {isJobDetailsLoading ? (
          <LoadingPageSm title={"Loading job details..."} />
        ) : (
          <div className="d-block mb-5">
            <div className="card-custom bg-white">
              <div className="card-body">
                <form id="create-frm">
                  {displayJobBlock()}
                  {displayRelatedFirms()}
                  {displayStatusMessage()}

                  <div className="d-flex justify-content-end">
                    {displayCancelButton()}
                    {displaySubmitButton()}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const displayJobBlock = () => {
    return (
      <div className="d-block mb-4">
        <div className="d-block">
          <div className="form-input-holder">
            <InputLebelComponent title="Job Title" />
            <div className="d-block">
              <input
                type="text"
                className="form-control-custom"
                id="role-title"
                placeholder="Enter job title"
                onChange={handleRoleTitleChange}
                value={roleTitle}
                autoComplete="off"
              />
            </div>
          </div>
        </div>
        <div className="d-block">
          <div className="form-input-holder">
            <InputLebelComponent title="Job Description" />
            <div className="d-block">
              <textarea
                type="textarea"
                className="form-control-textarea"
                id="description"
                placeholder="Enter job description"
                onChange={handleDescriptionChange}
                value={description}
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const displaySubmitButton = () => {
    return (
      <Button
        variant="primary"
        disabled={isButtonDisabled}
        onClick={handleFormSubmit}
      >
        {buttonText}
      </Button>
    );
  };

  const displayCancelButton = () => {
    return (
      <Link to="/job/my-jobs">
        <Button
          variant="secondary"
          disabled={isButtonDisabled}
          className="me-3"
        >
          Cancel
        </Button>
      </Link>
    );
  };

  const displayStatusMessage = () => {
    return (
      <div className="d-block my-4">
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
          message={"You do not have access to update job details"}
        />
      );
    }
  };

  return <div className="d-block">{displayMainContent()}</div>;
};

export default EditJobPosting;
