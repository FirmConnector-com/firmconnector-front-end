import React, {useEffect, useState} from "react";
import {useAuthContext} from "../../context/AuthContext";
import HeaderSm from "../Headers/HeaderSm";
import InputLebelComponent from "../InputLebel/InputLebelComponent";
import {Button} from "react-bootstrap";
import {AlertDanger, AlertInfo, AlertSuccess} from "../Alerts/Alert";
import emailjs, {init} from "@emailjs/browser";
import {generator} from "generate-password";

//import API
import createClient from "../../apis/createClient";
import getMyClientListing from "../../apis/getMyClientListing";

const AddClientForm = () => {
    const {userDetails} = useAuthContext();
    const user_slug = JSON.parse(userDetails).user_slug;
    const user_primary_role = JSON.parse(userDetails).user_primary_role;
    const first_name = JSON.parse(userDetails).first_name;
    const last_name = JSON.parse(userDetails).last_name;
    const firm_name = JSON.parse(userDetails).firm_details?.firm_name;

    const [email, setEmail] = useState("");
    const [buttonText, setButtonText] = useState("Create Account");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [hasSubmitError, setHasSubmitError] = useState(false);
    const [isValidSubmit, setIsValidSubmit] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const [clientListing, setClientListing] = useState(false);

    useEffect(() => {
        if (user_slug !== undefined) {
            getClientListing();
        }
    }, [user_slug]);

    useEffect(() => {
        init("RJeAhiPxk5_q0SXcN");
    }, []);

    const getClientListing = () => {
        Promise.all([getMyClientListing(user_slug)])
            .then(async ([data]) => {
                if (data?.data?.status === 1) {
                    if (data?.data?.clientList) {
                        setClientListing(data?.data?.clientList);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const displayMainContent = () => {
        return displayFormBlock();
    };

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
            /^([\w-.]+@(?!mail\.ru)(?!yandex\.ru)(?!mail\.com)([\w-]+.)+[\w-]{2,4})?$/;

        let isInvalid = 0;
        let errMessage = [];

        if (email.trim().length === 0) {
            isInvalid = 1;
            errMessage.push("Enter email address");
        } else {
            if (!emailPattern.test(email)) {
                isInvalid = 1;
                errMessage.push("Enter a valid email address");
            }
        }

        if (isInvalid === 1) {
            setErrorMessage(errMessage);
            setHasSubmitError(true);
            setIsButtonDisabled(false);
            setButtonText("Create Account");
        } else {
            const isFound = clientListing?.find((client) => email === client.client_email)
            if (!isFound) {
                submitForm();
            }
            handleData(isFound ? true : false)
        }
    };

    const submitForm = () => {
        let errMessage = [];
        let succMessage = [];

        let formData = {
            user_slug: user_slug,
            email: email,
        };

        try {
            createClient(formData).then(async (data) => {
                if (data?.data) {
                    if (data.data.status === 1) {
                        succMessage.push(data.data.message);
                        setSuccessMessage(succMessage);
                        setIsValidSubmit(true);
                        setHasSubmitError(false);
                        setIsButtonDisabled(true);
                        setButtonText("Create Account");

                        setTimeout(() => {
                            window.location.replace("access-control");
                        }, 1000);
                    } else if (data.data.status === 0) {
                        errMessage.push(data.data.message);
                        setErrorMessage(errMessage);
                        setHasSubmitError(true);
                        setIsButtonDisabled(false);
                        setButtonText("Create Account");
                    } else {
                        errMessage.push("Error happened. Unable to create client account.");
                        setErrorMessage(errMessage);
                        setHasSubmitError(true);
                        setIsButtonDisabled(false);
                        setButtonText("Create Account");
                    }
                } else {
                    errMessage.push("Error happened. Unable to create client account");
                    setErrorMessage(errMessage);
                    setHasSubmitError(true);
                    setIsButtonDisabled(false);
                    setButtonText("Create Account");
                }
            });
        } catch (error) {
            errMessage.push("Error happened. Network error happened.");
            setErrorMessage(errMessage);
            setHasSubmitError(true);
            setIsButtonDisabled(false);
            setButtonText("Create Account");
        }
    };

    const handleData = (status) => {
        try {
            const pwd = generator.generate({
                length: 8,
                numbers: true,
                lowercase: false,
                uppercase: false,
                symbols: false
            });

            let templateParams = {
                email: email,
                password: pwd,
                first_name: first_name,
                last_name: last_name,
                firm_name: firm_name,
                user_slug: user_slug,
                from_to: email
            }
            if (status === true) {
                emailjs.send("service_ipdiryl", "template_k39cdfa", templateParams, "5jIvmb8qNtHaO73Nm")
                    .then((result) => {
                        alert("Message Sent Successfully");
                    }, (error) => console.log(error.text));
            } else {
                emailjs.send("service_ipdiryl", "template_k39cdfa", templateParams, "5jIvmb8qNtHaO73Nm")
                    .then((result) => {
                        alert("Message Sent Successfully");
                    }, (error) => console.log(error.text));
            }

        } catch (e) {
            console.log("oops!.Error during mail sending", e)
        }
    }

    const displayTopBlock = () => {
        return (
            <div className="d-flex flex-column">
                <span className="display-6">Create Client Access</span>
            </div>
        );
    };

    const displayForm = () => {
        return (
            <div className="d-block">
                <div className="card-custom">
                    <div className="card-body">
                        <form id="create-frm">
                            {displayLoginBlock()}
                            {displaySubmitButton()}
                            {displayStatusMessage()}
                        </form>
                    </div>
                </div>
            </div>
        );
    };

    const displayLoginBlock = () => {
        return (
            <div className="d-block mb-4">
                <div className="d-block">
                    <HeaderSm
                        title={"Add account information"}
                        subText={null}
                        borderBottom={true}
                    />
                </div>

                <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
                    <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                        <div className="form-input-holder">
                            <InputLebelComponent title="Email Address"/>
                            <div className="d-block">
                                <input
                                    type="text"
                                    className="form-control-custom"
                                    id="email"
                                    placeholder="Enter client email address"
                                    onChange={handleEmailChange}
                                    value={email}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const displaySubmitButton = () => {
        return (
            <div className="form-button-holder justify-content-end">
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
            <div className="d-block">
                {displayErrorMessage()} {displaySuccessMessage()}
            </div>
        );
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
                    message={"You do not have access to create Client"}
                />
            );
        }
    };

    return <div className="d-block">{displayMainContent()}</div>;
};

export default AddClientForm;
