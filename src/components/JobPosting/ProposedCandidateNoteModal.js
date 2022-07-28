import React, { useState, useEffect, useRef } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import CandidateNoteAdd from "./CandidateNoteAdd";
import ProfileImageSmall from "../../components/CommonComponent/ProfileImageSmall";
import getCandidateJobNotes from "../../apis/getCandidateJobNotes";
import { FIRM_IMAGE_BASE } from "../../config/env";

const ProposedCandidateNoteModal = (props) => {
  const { resourceSlug, jobId, open, handleClose } = props;
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [apiStatusMessage, setApiStatusMessage] = useState(false);
  const [Data, setData] = useState(false);
  const [newAdd, setNewAdd] = useState(false);

  const listEndRef = useRef(null);

  const scrollToBottom = () => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [newAdd]);

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

  const updateNoteList = async (itemArray) => {
    await setData((oldArray) => [itemArray, ...oldArray]);
    await setNewAdd(itemArray);
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
      <div className="d-block" ref={listEndRef}>
        <>
          {Data.map(function (item, index) {
            return (
              <div className="card-custom mb-1">
                <div className="card-body">
                  <div className="d-flex">
                    <div className="d-block me-2">
                      <ProfileImageSmall imgSrc={item.profile_image_path} />
                    </div>
                    <div className="w-100">
                      <div className="row mb-1">
                        <div className="col-12 col-lg-8 col-xl-8 col-xxl-8">
                          <div className="d-block mb-1">
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
                        </div>
                        <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 d-flex justify-content-end">
                          {displayFirm(item.firm_logo)}
                        </div>
                      </div>
                      <div className="d-block mt-1">
                        <span className="text-dark">{item.note}</span>
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

  const displayFirm = (logo_path) => {
    return (
      <div
        className="firm-logo-sm-custom"
        style={{
          backgroundImage: `url("${FIRM_IMAGE_BASE + logo_path}")`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    );
  };

  return (
    <Modal
      show={showModal}
      onHide={() => handleModalClose()}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      scrollable={true}
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
        <CandidateNoteAdd
          resourceSlug={resourceSlug}
          jobId={jobId}
          handleClose={handleClose}
          updateNoteList={updateNoteList}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(ProposedCandidateNoteModal);
