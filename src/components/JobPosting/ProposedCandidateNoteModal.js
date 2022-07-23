import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ProfileImageSmall from "../../components/CommonComponent/ProfileImageSmall";

import getCandidateJobNotes from "../../apis/getCandidateJobNotes";

const ProposedCandidateNoteModal = (props) => {
  const { resourceSlug, jobId, open, handleClose } = props;
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [apiStatusMessage, setApiStatusMessage] = useState(false);
  const [Data, setData] = useState(false);

  useEffect(() => {
    if (open) {
      setisLoading(true);
      setShowModal(true);
      setHasData(false);
      getNotes();
    } else {
      setisLoading(true);
      setShowModal(false);
      setHasData(false);
    }
  }, [open]);

  const getNotes = () => {
    try {
      getCandidateJobNotes(resourceSlug, jobId).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            setisLoading(false);
            setData(data.data.note_list);
            setHasData(true);
          } else {
            setHasData(false);
            setisLoading(false);
            setApiStatusMessage(data.data.message);
          }
        } else {
          setHasData(false);
          setisLoading(false);
          setApiStatusMessage("No notes to display");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClose = () => {
    handleClose();
  };

  const displayNotes = () => {
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
      <div className="d-block">
        <>
          {Data.map(function (item, index) {
            return (
              <div className="card-custom mb-1">
                <div className="card-body">
                  <div className="d-flex">
                    <div className="d-block me-2">
                      <ProfileImageSmall imgSrc={item.profile_image_path} />
                    </div>
                    <div className="d-block">
                      <div className="d-block mb-3">
                        <div className="d-block">
                          <span className="text-dark h6">
                            {item.created_by}
                          </span>
                        </div>
                        <div className="d-block">
                          <span className="text-muted-custom">
                            on {item.added_on}
                          </span>
                        </div>
                      </div>
                      <div className="d-block p-2 bg-light align-self-start rounded">
                        <span>{item.note}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      </div>
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
            <span className="h5 fw-bold-custom">Candidate Notes</span>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body className="bg-light">{displayNotes()}</Modal.Body>

      <Modal.Footer>
        <Button variant="dark" size={"sm"} onClick={() => handleClose()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(ProposedCandidateNoteModal);
