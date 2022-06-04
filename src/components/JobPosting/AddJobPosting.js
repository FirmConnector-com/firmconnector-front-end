import React, {useEffect, useState} from "react";
import {useAuthContext} from "../../context/AuthContext";
import InputLebelComponent from "../InputLebel/InputLebelComponent";
import {Button} from "react-bootstrap";
import {AlertDanger, AlertInfo, AlertSuccess} from "../Alerts/Alert";

//import API
import createResource from "../../apis/createResource";
import {FIRM_IMAGE_BASE} from "../../config/env";
import getFirmAccessList from "../../apis/getFirmAccessList";
import HeaderSm from "../Headers/HeaderSm";

const AddJobPosting = () => {
    const {userDetails} = useAuthContext();
    const user_slug = JSON.parse(userDetails).user_slug;
    const user_primary_role = JSON.parse(userDetails).user_primary_role;

    const [roleTitle, setRoleTitle] = useState("");
    const [firmList, setFirmList] = useState(false);
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [isFirmListLoading, setIsFirmListLoading] = useState(true);
    const [selectedFirmList, setSelectedFirmList] = useState([]);

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

    const displayFirmList = () => {
        if (firmList) {
            return (<>
                {firmList.map(function (item, index) {
                    return (
                        <div key={item.firm_id} className="my-2 d-flex">
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
                                        backgroundImage: `url("${FIRM_IMAGE_BASE + item.firm_logo}")`,
                                        backgroundSize: "contain",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                </div>
                            </div>
                        </div>
                    );
                })}
            </>);
        }
    };

    const displayLoadingBlock = () => {
        return (<div>
            <span>Loading related firm list</span>
        </div>);
    };

    const handleRoleTitleChange = (e) => {
        setRoleTitle(e.target.value);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
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

        if (location.trim().length === 0) {
            isInvalid = 1;
            errMessage.push("Enter location");
        }

        if (description.trim().length === 0) {
            isInvalid = 1;
            errMessage.push("Enter description");
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
            roleTitle: roleTitle,
            location: location,
            description: description,
        };

        try {
            createResource(formData).then(async (data) => {
                if (data?.data) {
                    if (data.data.status === 1) {
                        succMessage.push(data.data.message);
                        setSuccessMessage(succMessage);
                        setIsValidSubmit(true);
                        setHasSubmitError(false);
                        setIsButtonDisabled(true);
                        setButtonText("Create Post");

                    } else if (data.data.status === 0) {
                        errMessage.push(data.data.message);
                        setErrorMessage(errMessage);
                        setHasSubmitError(true);
                        setIsButtonDisabled(false);
                        setButtonText("Create Post");
                    } else {
                        errMessage.push("Error happened. Unable to create profile information.");
                        setErrorMessage(errMessage);
                        setHasSubmitError(true);
                        setIsButtonDisabled(false);
                        setButtonText("Create Post");
                    }
                } else {
                    errMessage.push("Error happened. Unable to create your profile information");
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

    const displayTopBlock = () => {
        return (<div className="d-block">
            <div className="d-flex flex-column">
                <span className="display-6">Create New Posting</span>
            </div>
            <div className="d-block">
                <p className="text-muted-custom">
                    Create a posting within your firm
                </p>
            </div>
        </div>);
    };

    const displayForm = () => {
        return (<>
            <div className="d-block">
                <p>
                    <strong>Please Note</strong>{" "}
                    <span className="text-info-light-custom">
                            ***Fill up all fields to create a Posting
                        </span>
                </p>
            </div>
            <div className="d-block">
                <div className="card-custom h-100 bg-white">
                    <div className="card-body">
                        <form id="create-frm">
                            {displayJobBlock()}
                            {displayRelatedFirms()}
                            {displaySubmitButton()}
                            {displayStatusMessage()}
                        </form>
                    </div>
                </div>
            </div>
        </>);
    };

    const displayJobBlock = () => {
        return (
            <div className="d-block mb-4">
                <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
                    <div className="d-block">
                        <HeaderSm
                            title={"Add job posting informations"}
                            subText={"These informations will be used for posting a job"}
                            borderBottom={true}
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                        <div className="form-input-holder">
                            <InputLebelComponent title="Role Title"/>
                            <div className="d-block">
                                <input
                                    type="text"
                                    className="form-control-custom"
                                    id="role-title"
                                    placeholder="Enter Role Title"
                                    onChange={handleRoleTitleChange}
                                    value={roleTitle}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
                    <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                        <div className="form-input-holder">
                            <InputLebelComponent title="Location"/>
                            <div className="d-block">
                                <input
                                    type="text"
                                    className="form-control-custom"
                                    id="location"
                                    placeholder="Enter Location"
                                    onChange={handleLocationChange}
                                    value={location}
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
                                <InputLebelComponent title="Description"/>
                                <div className="d-block">
                                <textarea
                                    type="textarea"
                                    className="form-control-textarea"
                                    id="description"
                                    placeholder="Enter Post Description"
                                    onChange={handleDescriptionChange}
                                    value={description}
                                    autoComplete="off"
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    };

    const displaySubmitButton = () => {
        return (<div className="form-button-holder justify-content-end mt-4">
            <Button
                variant="primary"
                disabled={isButtonDisabled}
                onClick={handleFormSubmit}
            >
                {buttonText}
            </Button>
        </div>);
    };

    const displayStatusMessage = () => {
        return (<div className="d-block mt-4">
            {displayErrorMessage()} {displaySuccessMessage()}
        </div>);
    };

    const displayErrorMessage = () => {
        if (hasSubmitError) {
            return <AlertDanger title={"Oops"} message={errorMessage}/>;
        }
    };

    const displaySuccessMessage = () => {
        if (isValidSubmit) {
            return <AlertSuccess title={"Success"} message={successMessage}/>;
        }
    };
    const displayFormBlock = () => {
        if (user_primary_role === "2") {
            return (<>
                {displayTopBlock()}
                {displayForm()}
            </>);
        } else {
            return (<AlertInfo
                title={"Note"}
                message={"You do not have access to create Resource"}
            />);
        }
    };

    return <div className="d-block">{displayMainContent()}</div>;
};


export default AddJobPosting;