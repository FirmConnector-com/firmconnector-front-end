import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { Button } from "react-bootstrap";
import getPropose from "../../../../apis/getPropose";
import AddProposeForModal from "./AddProposeForModal";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../../context/AuthContext";
import { FiFileText, FiChevronDown } from "react-icons/fi";
import ProposedCandidateNoteModal from "../../../JobPosting/ProposedCandidateNoteModal";
import StatusUpdateModal from "../../../JobPosting/StatusUpdateModal";

const ProposeFor = (props) => {
  const { userDetails } = useAuthContext();
  const currentUser = JSON.parse(userDetails);

  const { resourceSlug } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [proposedForData, setProposedForData] = useState(false);
  const [apiStatusMessage, setApiStatusMessage] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [openProposeModal, setOpenProposeModal] = useState(false);

  const [selectedCandidateSlug, setSelectedCandidateSlug] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(false);
  const [isStatusChangeModalOpen, setIsStatusChangeModalOpen] = useState(false);
  const [selectedAutoId, setSelectedAutoId] = useState(false);
  const [selectedStatusId, setSelectedStatusId] = useState(false);
  const [openNoteViewModal, setOpenNoteViewModal] = useState(false);

  useEffect(() => {
    if (resourceSlug) {
      getResourceProposeFor();
    }
  }, [resourceSlug]);

  const getResourceProposeFor = () => {
    try {
      getPropose(resourceSlug).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            setIsLoading(false);
            setProposedForData(data.data.job_list);
            setHasData(true);
          } else {
            setHasData(false);
            setIsLoading(false);
            setApiStatusMessage(data.data.message);
          }
          console.log(data?.data);
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const displayProposedData = () => {
    if (isLoading) {
      return displayLoadingBlock();
    } else {
      if (hasData) {
        return displayJobitems();
      } else {
        return displayNoDataBlock();
      }
    }
  };

  const openStatusChangeModal = (id, status) => {
    setIsStatusChangeModalOpen(true);
    setSelectedAutoId(id);
    setSelectedStatusId(status);
  };

  const openViewNoteModal = async (rSlug, job) => {
    await setSelectedCandidateSlug(rSlug);
    await setSelectedJobId(job);
    await setOpenNoteViewModal(true);
  };

  const displayJobitems = () => {
    return (
      <>
        {proposedForData.map(function (jItem, jIndex) {
          return (
            <div className="card-custom mb-2" key={jIndex.toString()}>
              <div className="card-body">
                <div className="d-block">
                  <Link to={`/job/details/${jItem.job_slug}`}>
                    <h6>{jItem.job_title}</h6>
                  </Link>
                </div>
                <div className="d-block">
                  <span className="text-muted">on {jItem.added_on}</span>
                </div>
                <div className="d-flex my-2">
                  {jItem.resource_firm === currentUser.firm_details.firm_id ? (
                    <Button
                      variant={
                        jItem.candidate_status === "1"
                          ? "danger"
                          : jItem.candidate_status === "2"
                          ? "warning"
                          : jItem.candidate_status === "3"
                          ? "success"
                          : null
                      }
                      size="sm"
                      className="me-2 rounded-lg"
                      onClick={() =>
                        openStatusChangeModal(
                          jItem.auto_id,
                          jItem.candidate_status
                        )
                      }
                    >
                      {jItem.candidate_propose_status}&nbsp;{" "}
                      <FiChevronDown className="fw-bold fs-5" />
                    </Button>
                  ) : null}

                  <Button
                    variant="primary"
                    size="sm"
                    className="rounded-lg"
                    onClick={() =>
                      openViewNoteModal(jItem.user_slug, jItem.job_id)
                    }
                  >
                    Candidate Notes &nbsp;{" "}
                    <FiFileText className="fw-bold fs-6" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  const displayNoDataBlock = () => {
    return (
      <Alert key={"info"} variant={"info"}>
        {apiStatusMessage}
      </Alert>
    );
  };

  const openModal = () => {
    setOpenProposeModal(true);
  };

  const displayAddButton = () => {
    return (
      <div className="d-flex justify-content-end my-2">
        <Button variant="primary" size="sm" onClick={() => openModal()}>
          Propose Job
        </Button>
      </div>
    );
  };

  const displayLoadingBlock = () => {
    return (
      <div className="justify-content-center align-items-center d-flex">
        <Spinner animation="grow" role="status" />
      </div>
    );
  };

  const handleClose = () => {
    setOpenProposeModal(false);
  };

  const handleNoteViewClose = () => {
    setOpenNoteViewModal(false);
  };

  const handleStatusModalClose = () => {
    setIsStatusChangeModalOpen(false);
  };

  const onNewStatusChange = (id, candidate_status, status_title) => {
    setProposedForData((td) =>
      td.map((item, key) => {
        if (item.auto_id === id) {
          let newArray = item;

          newArray.candidate_status = candidate_status;
          newArray.candidate_propose_status = status_title;

          return { ...item, newArray };
        }

        return item;
      })
    );
  };

  const onNewProposeChange = async (itemArray) => {
    await setProposedForData((oldArray) => [itemArray, ...oldArray]);
  };

  return (
    <div className="d-block">
      {displayAddButton()}
      {displayProposedData()}
      <AddProposeForModal
        resourceSlug={resourceSlug}
        open={openProposeModal}
        handleClose={handleClose}
        onNewProposeChange={onNewProposeChange}
      />
      <ProposedCandidateNoteModal
        resourceSlug={selectedCandidateSlug}
        open={openNoteViewModal}
        handleClose={handleNoteViewClose}
        jobId={selectedJobId}
      />
      <StatusUpdateModal
        userSlug={currentUser.user_slug}
        open={isStatusChangeModalOpen}
        handleClose={handleStatusModalClose}
        autoId={selectedAutoId}
        selectedStatusId={selectedStatusId}
        onNewStatusChange={onNewStatusChange}
      />
    </div>
  );
};

export default ProposeFor;
