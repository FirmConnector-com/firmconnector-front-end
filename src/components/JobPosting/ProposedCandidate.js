import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import { FiFileText, FiChevronDown } from "react-icons/fi";
import Button from "react-bootstrap/Button";
import getPrefferedCandidate from "../../apis/getPrefferedCandidate";
import ProfileImageMd from "../../components/CommonComponent/ProfileImageMd";
import ProposedCandidateNoteModal from "./ProposedCandidateNoteModal";
import StatusUpdateModal from "./StatusUpdateModal";

import { FIRM_IMAGE_BASE } from "../../config/env";
import { useAuthContext } from "../../context/AuthContext";

const ProposedCandidate = (props) => {
  const { userDetails } = useAuthContext();
  const currentUser = JSON.parse(userDetails);

  const { jobSlug, user_slug } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [dataArray, setDataArray] = useState(true);
  const [apiStatusMessage, setApiStatusMessage] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [openNoteViewModal, setOpenNoteViewModal] = useState(false);
  const [selectedCandidateSlug, setSelectedCandidateSlug] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(false);
  const [isStatusChangeModalOpen, setIsStatusChangeModalOpen] = useState(false);
  const [selectedAutoId, setSelectedAutoId] = useState(false);
  const [selectedStatusId, setSelectedStatusId] = useState(false);

  useEffect(() => {
    if (jobSlug) {
      getCandidates();
    }
  }, [jobSlug]);

  const openViewNoteModal = async (rSlug, job) => {
    await setSelectedCandidateSlug(rSlug);
    await setSelectedJobId(job);
    await setOpenNoteViewModal(true);
  };

  const handleNoteViewClose = () => {
    setOpenNoteViewModal(false);
  };

  const handleStatusModalClose = () => {
    setIsStatusChangeModalOpen(false);
  };

  const getCandidates = () => {
    Promise.all([getPrefferedCandidate(jobSlug, user_slug)])
      .then(async ([data]) => {
        if (data?.data?.status === 1) {
          await setIsLoading(false);
          await setDataArray(data.data.candidate_list);
          await setHasData(true);
        } else {
          setApiStatusMessage(data.data.message);
          setIsLoading(false);
          await setHasData(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const displayMainContent = () => {
    return (
      <>
        {isLoading ? (
          <div className="justify-content-center align-items-center d-flex">
            <Spinner animation="grow" role="status" />
          </div>
        ) : (
          displayCandidateBlock()
        )}
      </>
    );
  };

  const displayCandidateBlock = () => {
    if (hasData) {
      return displayCandidateItems();
    } else {
      return displayNoDataBlock();
    }
  };

  const openStatusChangeModal = (id, status) => {
    setIsStatusChangeModalOpen(true);
    setSelectedAutoId(id);
    setSelectedStatusId(status);
  };

  const onNewStatusChange = (id, candidate_status, status_title) => {
    setDataArray((td) =>
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

  const displayCandidateItems = () => {
    return (
      <>
        {dataArray.map(function (item) {
          return (
            <div className="card-custom mb-2" key={item.auto_id}>
              <div className="card-body">
                <div className="d-flex">
                  <div className="d-block me-4">
                    {displayProfilePicture(item.profile_image_path)}
                  </div>
                  <div className="d-block">
                    <div className="d-block mb-3">
                      <div className="d-block">
                        <Link
                          to={`/resources/details/${item.user_slug}`}
                          target="_blank"
                        >
                          <p className="h6 text-dark">{item.resource_name}</p>
                        </Link>
                      </div>
                      <div className="d-block">
                        <Link
                          to={`/resources/details/${item.user_slug}`}
                          target="_blank"
                        >
                          <span className="text-info-custom fw-medium-custom">
                            {item.user_profile_role}
                          </span>
                        </Link>
                      </div>
                      <div className="d-block">
                        <span className="text-secondary">{item.location}</span>
                      </div>
                      <div className="d-block mt-2">
                        {displayFirm(item.firm_logo)}
                      </div>
                    </div>
                    <div className="d-flex">
                      {item.resource_firm ===
                      currentUser.firm_details.firm_id ? (
                        <Button
                          variant={
                            item.candidate_status === "1"
                              ? "danger"
                              : item.candidate_status === "2"
                              ? "warning"
                              : item.candidate_status === "3"
                              ? "success"
                              : null
                          }
                          size="sm"
                          className="me-2 rounded-lg"
                          onClick={() =>
                            openStatusChangeModal(
                              item.auto_id,
                              item.candidate_status
                            )
                          }
                        >
                          {item.candidate_propose_status}&nbsp;{" "}
                          <FiChevronDown className="fw-bold fs-5" />
                        </Button>
                      ) : null}

                      <Button
                        variant="primary"
                        size="sm"
                        className="rounded-lg"
                        onClick={() =>
                          openViewNoteModal(item.user_slug, item.job_id)
                        }
                      >
                        Candidate Notes &nbsp;{" "}
                        <FiFileText className="fw-bold fs-6" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
      </>
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

  const displayProfilePicture = (item) => {
    return (
      <div className="d-block">
        <ProfileImageMd imgSrc={item} />
      </div>
    );
  };

  const displayNoDataBlock = () => {
    return (
      <Alert key={"info"} variant={"info"}>
        {apiStatusMessage}
      </Alert>
    );
  };

  return <div className="d-block">{displayMainContent()}</div>;
};

export default ProposedCandidate;
