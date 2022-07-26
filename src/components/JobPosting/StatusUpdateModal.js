import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import InputLebelComponent from "../InputLebel/InputLebelComponent";

import getJobCandidateStatus from "../../apis/getJobCandidateStatus";
import updateCandidateStatusForJob from "../../apis/updateCandidateStatusForJob";

const StatusUpdateModal = (props) => {
  const {
    userSlug,
    autoId,
    open,
    handleClose,
    selectedStatusId,
    onNewStatusChange,
  } = props;
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [apiStatusMessage, setApiStatusMessage] = useState(false);
  const [Data, setData] = useState(false);
  const [note, setNote] = useState("");

  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedId, setSelectedId] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState("Update Status");

  useEffect(() => {
    if (open) {
      setisLoading(true);
      setShowModal(true);
      setHasData(false);
      setSelectedId(selectedStatusId);
      setNote("");
      getNotes();
    } else {
      setisLoading(true);
      setShowModal(false);
      setHasData(false);
      setSelectedId(false);
      setNote("");
    }
  }, [open]);

  const getNotes = () => {
    try {
      getJobCandidateStatus().then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            setisLoading(false);
            setData(data.data.status_list);
            setHasData(true);
          } else {
            setHasData(false);
            setisLoading(false);
            setApiStatusMessage(data.data.message);
          }
        } else {
          setHasData(false);
          setisLoading(false);
          setApiStatusMessage("No status to display");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClose = () => {
    handleClose();
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handelStatusChange = (e) => {
    setSelectedId(e.target.value);
  };

  const updateCandidateJobStatus = async () => {
    if (selectedId && selectedId !== "") {
      setIsUpdating(true);
      setSubmitButtonText("Updating, please wait...");

      let formData = {
        user_slug: userSlug,
        id: autoId,
        status: selectedId,
        note: note,
      };

      try {
        updateCandidateStatusForJob(formData).then(async (data) => {
          if (data?.data) {
            setIsUpdating(false);
            setSubmitButtonText("Update Status");
            await onNewStatusChange(
              autoId,
              data.data.candidate_status,
              data.data.status_title
            );
            setNote("");
            handleModalClose();
          } else {
            setIsUpdating(false);
            setSubmitButtonText("Update Status");
          }
        });
      } catch (error) {
        setIsUpdating(false);
        setSubmitButtonText("Update Status");
      }
    }
  };

  const displayStatus = () => {
    if (isLoading) {
      return (
        <div className="justify-content-center align-items-center d-flex">
          <Spinner animation="grow" role="status" />
        </div>
      );
    } else {
      if (hasData) {
        return displayItems();
      } else {
        return displayNoDataBlock();
      }
    }
  };

  const displayNoDataBlock = () => {
    return (
      <Alert key={"info"} variant={"info"}>
        {apiStatusMessage}
      </Alert>
    );
  };

  const displayItems = () => {
    return (
      <>
        <div className="form-input-holder">
          <InputLebelComponent title="Select a status" />
          <div className="d-block">
            <select
              class="form-select"
              aria-label="candidate status"
              onChange={handelStatusChange}
              value={selectedId}
            >
              <option value="">Please select a status</option>
              {Data.map(function (item) {
                return (
                  <option
                    value={item.status_id}
                    checked={selectedId === item.status_id ? "checked" : ""}
                  >
                    {item.title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        {selectedId === "3" ? (
          <div className="form-input-holder">
            <InputLebelComponent title="Add Note (optional)" />
            <div className="d-block">
              <textarea
                type="textarea"
                className="form-control"
                id="note"
                placeholder="Enter your note"
                onChange={handleNoteChange}
                value={note}
                autoComplete="off"
                rows={3}
              />
            </div>
          </div>
        ) : null}
      </>
    );
  };

  return (
    <Modal
      show={showModal}
      onHide={() => handleModalClose()}
      scrollable={true}
      backdrop="static"
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <div className="d-block">
          <div className="d-block">
            <span className="h5 fw-bold-custom">
              Change Candidate Status on This Job
            </span>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body className="bg-light">{displayStatus()}</Modal.Body>

      <Modal.Footer>
        <Button
          variant="dark"
          size={"sm"}
          onClick={() => handleClose()}
          disabled={isUpdating || isLoading}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          size={"sm"}
          onClick={() => updateCandidateJobStatus()}
          disabled={isUpdating || isLoading || selectedId === ""}
        >
          {isUpdating ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              &nbsp;
            </>
          ) : null}
          {submitButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(StatusUpdateModal);
