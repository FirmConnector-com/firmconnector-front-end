import React, { useState, useEffect, useRef } from "react";
import HeaderXSm from "../../Headers/HeaderXSm";
import { Button, Modal } from "react-bootstrap";
import InputLebelComponent from "../../InputLebel/InputLebelComponent";
import { AlertDanger, AlertSuccess } from "../../Alerts/Alert";
import IconContainer from "../../Iconcontainer/IconContainer";
import saveUploadedDocument from "../../../apis/saveUploadedDocument";
import removeDocument from "../../../apis/removeDocument";
import ReactTooltip from "react-tooltip";

import Swal from "sweetalert2";
import swalWithBootstrapButtons from "sweetalert2-react-content";

const ResourceDocumentForm = (props) => {
  const { document_details, resourceSlug } = props;
  const MySwal = swalWithBootstrapButtons(Swal);

  const [show, setShow] = useState(false);
  const [documentArray, setDocumentArray] = useState(false);

  const [documentTitle, setDocumentTitle] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const [buttonText, setButtonText] = useState("Upload Document");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [isValidSubmit, setIsValidSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const statusRef = useRef(null);
  const executeScroll = () => statusRef.current.scrollIntoView();

  useEffect(() => {
    setDocumentArray(document_details);
  }, [document_details]);

  const handleClose = () => {
    setShow(false);
    window.location.reload(false);
  };

  const handleShow = () => setShow(true);

  const handleDocumentTitleChange = (e) => {
    setDocumentTitle(e.target.value);
  };

  const handleDocument = (event) => {
    setHasSubmitError(false);
    setErrorMessage(false);
    setIsValidSubmit(false);
    setSuccessMessage(false);

    const fileUploaded = event.target.files[0];

    let isInvalid = 0;
    let errMessage = [];

    const allowedFormats = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/msword",
    ];

    if (fileUploaded.size > 3000000) {
      isInvalid = 1;
      errMessage.push("Document size should be less than 3MB.");
    }

    if (!allowedFormats.includes(fileUploaded.type)) {
      isInvalid = 1;
      errMessage.push(
        "Please upload a valid document format. Check the document format allowed."
      );
    }

    if (isInvalid === 1) {
      executeScroll();
      setErrorMessage(errMessage);
      setHasSubmitError(true);
      event.target.value = null;
      setUploadedFile(false);
    } else {
      setUploadedFile(fileUploaded);
    }
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

    let isInvalid = 0;
    let errMessage = [];

    if (documentTitle.trim().length === 0) {
      isInvalid = 1;
      errMessage.push("Enter document name");
    }

    if (!uploadedFile) {
      isInvalid = 1;
      errMessage.push("Upload a document");
    }

    if (isInvalid === 1) {
      executeScroll();
      setErrorMessage(errMessage);
      setHasSubmitError(true);
      setIsButtonDisabled(false);
      setButtonText("Upload Document");
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    let errMessage = [];
    let succMessage = [];

    let formData = {
      resourceSlug: resourceSlug,
      documentTitle: documentTitle,
      file: uploadedFile,
    };

    try {
      saveUploadedDocument(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            succMessage.push(data.data.message);
            setSuccessMessage(succMessage);
            setIsValidSubmit(true);
            setHasSubmitError(false);
            setButtonText("Upload Document");
            executeScroll();
            setTimeout(() => {
              setIsValidSubmit(false);
              setHasSubmitError(false);
              setErrorMessage(false);
              setSuccessMessage(false);
              window.location.reload(false);
            }, 1000);
          } else if (data.data.status === 0) {
            executeScroll();
            errMessage.push(data.data.message);
            setErrorMessage(errMessage);
            setHasSubmitError(true);
            setIsButtonDisabled(false);
            setButtonText("Upload Document");
          } else {
            executeScroll();
            errMessage.push(
              "Error happened. Unable to save document information."
            );
            setErrorMessage(errMessage);
            setHasSubmitError(true);
            setIsButtonDisabled(false);
            setButtonText("Upload Document");
          }
        } else {
          executeScroll();
          errMessage.push(
            "Error happened. Unable to save document information."
          );
          setErrorMessage(errMessage);
          setHasSubmitError(true);
          setIsButtonDisabled(false);
          setButtonText("Upload Document");
        }
      });
    } catch (error) {
      executeScroll();
      errMessage.push("Error happened. Network error happened.");
      setErrorMessage(errMessage);
      setHasSubmitError(true);
      setIsButtonDisabled(false);
      setButtonText("Upload Document");
    }
  };

  const displayAddDocumentnButton = () => {
    return (
      <div className="d-flex justify-content-end">
        <Button variant="primary" size="sm" onClick={() => handleShow()}>
          Add New Document
        </Button>
      </div>
    );
  };

  const displayDocumentTitle = (title) => {
    if (title.length > 20) {
      return title.replace(title.substring(10, title.length - 6), "~~~~~");
    } else {
      return title;
    }
  };

  const handleRemoveDocument = async (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "that you want to remove this document record",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      confirmButtonColor: "var(--danger)",
      cancelButtonColor: "var(--black)",
    }).then(async (result) => {
      if (result.isConfirmed) {
        removeSelectedDetails(id);
      } else {
        await setIsButtonDisabled(false);
      }
    });
  };

  const removeSelectedDetails = (id) => {
    let formData = {
      resourceSlug: resourceSlug,
      id: id,
    };

    try {
      removeDocument(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            setDocumentArray(
              documentArray.filter((item) => item.document_id !== id)
            );
          } else if (data.data.status === 0) {
            await MySwal.fire({
              title: <strong>Success</strong>,
              html: <i>{data.data.message}</i>,
              icon: "danger",
            });

            await setIsButtonDisabled(false);
          } else {
            await MySwal.fire({
              title: <strong>Success</strong>,
              html: <i>{data.data.status}</i>,
              icon: "danger",
            });

            await setIsButtonDisabled(false);
          }
        } else {
          await MySwal.fire({
            title: <strong>Success</strong>,
            html: <i>{data.data.message}</i>,
            icon: "danger",
          });

          await setIsButtonDisabled(false);
        }
      });
    } catch (error) {
      MySwal.fire({
        title: <strong>Success</strong>,
        html: <i>Something wrong happened!</i>,
        icon: "danger",
      });

      setIsButtonDisabled(false);
    }
  };

  const displayDocuments = () => {
    if (documentArray && documentArray.length > 0) {
      return (
        <div className="d-block">
          {documentArray.map(function (item, key) {
            return (
              <div
                className="d-flex border-dark col-12 py-1 px-3 rounded my-2 shadow-sm"
                key={key.toString()}
              >
                <div
                  className="col-8 d-flex align-items-center"
                  data-for={`documentTitle${key}`}
                >
                  <span className="text-sm-custom text-muted-custom">
                    {displayDocumentTitle(item.document_title)}
                  </span>
                  <ReactTooltip
                    id={`documentTitle${key}`}
                    place="top"
                    effect="solid"
                  >
                    {item.document_title}
                  </ReactTooltip>
                </div>
                <div className="col-4 d-flex justify-content-end align-items-end">
                  <div
                    className="icon-holder-sm icon-holder-danger cursor-pointer"
                    onClick={() => handleRemoveDocument(item.document_id)}
                  >
                    <IconContainer iconName={"FiTrash"} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <span className="text-muted-custom">No document uploaded!</span>;
    }
  };

  const showModal = () => {
    return (
      <Modal
        show={show}
        onHide={() => handleClose()}
        scrollable={true}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="d-block">
            <div className="d-block">
              <span className="h5 fw-bold-custom">
                Upload your professional document
              </span>
            </div>
            <div className="d-block">
              <span className="text-muted-custom text-sm-custom">
                Please fill the form to upload document
              </span>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form id="create-frm">
            <div className="d-block mb-4">
              <div className="d-block d-md-flex d-lg-flex d-xl-flex row">
                <div className="col-12 col-md-6 col-lg-6 col-xlg-6">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Degree Name" />
                    <div className="d-block">
                      <input
                        type="text"
                        className="form-control-custom-sm"
                        id="degree-name"
                        placeholder="Enter degree name"
                        onChange={handleDocumentTitleChange}
                        value={documentTitle}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-input-holder">
                    <InputLebelComponent title="Browse Document" />
                    <div className="d-block">
                      <input
                        type="file"
                        id="degree-name"
                        accept="application/msword, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
text/plain, application/pdf"
                        placeholder="Enter degree name"
                        onChange={handleDocument}
                        autoComplete="off"
                      />
                    </div>
                    <code>
                      Please Note: only .pdf, .doc, .docx, .xlsx, .txt files are
                      allowed to upload and document size should be less than
                      3MB.
                    </code>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              {displayCloseButton()}
              {displaySubmitButton()}
            </div>

            <div className="d-block" ref={statusRef}>
              {displayStatusMessage()}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  };

  const displaySubmitButton = () => {
    return (
      <div className="d-block">
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

  const displayCloseButton = () => {
    return (
      <div className="d-block me-3">
        <Button
          variant="dark"
          disabled={isButtonDisabled}
          onClick={() => closeAddModal()}
          size="sm"
        >
          Close
        </Button>
      </div>
    );
  };

  const closeAddModal = () => {
    setShow(false);
    setDocumentTitle("");
    setUploadedFile(false);
    setHasSubmitError(false);
    setIsValidSubmit(false);
    setErrorMessage(false);
    setSuccessMessage(false);
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
        <div className="d-block">
          <div className="d-block">
            <HeaderXSm
              title={"My Documents"}
              subText={null}
              borderBottom={true}
            />
          </div>
          <div className="d-block mb-3">{displayAddDocumentnButton()}</div>
          <div className="d-block">{displayDocuments()}</div>
        </div>
      </div>
      {showModal()}
    </div>
  );
};

export default ResourceDocumentForm;
