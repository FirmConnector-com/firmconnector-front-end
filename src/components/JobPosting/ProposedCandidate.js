import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import { FiFileText, FiFilePlus } from "react-icons/fi";
import Button from "react-bootstrap/Button";
import getPrefferedCandidate from "../../apis/getPrefferedCandidate";
import ProfileImageMd from "../../components/CommonComponent/ProfileImageMd";
import ProposedCandidateNoteModal from "./ProposedCandidateNoteModal";
import CandidateNoteAddModal from "./CandidateNoteAddModal";
import { FIRM_IMAGE_BASE } from "../../config/env";
import { useAuthContext } from "../../context/AuthContext";
import updateCandidateStatusForJob from "../../apis/updateCandidateStatusForJob";

const ProposedCandidate = (props) => {
  const { userDetails } = useAuthContext();
  const currentUser = JSON.parse(userDetails);

  const { jobSlug, user_slug } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [dataArray, setDataArray] = useState(true);
  const [apiStatusMessage, setApiStatusMessage] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [openNoteViewModal, setOpenNoteViewModal] = useState(false);
  const [openNoteAddModal, setOpenNoteAddModal] = useState(false);
  const [selectedCandidateName, setSelectedCandidateName] = useState(false);
  const [selectedCandidateSlug, setSelectedCandidateSlug] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedId, setSelectedId] = useState(false);

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

  const openAddNoteModal = async (name, rSlug, job) => {
    await setSelectedCandidateSlug(rSlug);
    await setSelectedCandidateName(name);
    await setSelectedJobId(job);
    await setOpenNoteAddModal(true);
  };

  const handleNoteViewClose = () => {
    setOpenNoteViewModal(false);
  };

  const handleNoteAddClose = () => {
    setOpenNoteAddModal(false);
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

  const updateCandidateJobStatus = async (id, status) => {
    await setSelectedId(id);
    setIsUpdating(true);

    let formData = {
      user_slug: currentUser.user_slug,
      id: id,
      status: status,
    };

    try {
      updateCandidateStatusForJob(formData).then(async (data) => {
        if (data?.data) {
          if (data.data.status === 1) {
            setDataArray((td) =>
              td.map((item, key) => {
                if (item.auto_id === id) {
                  let newArray = item;

                  newArray.candidate_status = data.data.candidate_status;
                  newArray.candidate_propose_status = data.data.status_title;

                  return { ...item, newArray };
                }

                return item;
              })
            );
            setIsUpdating(false);
          } else {
            setIsUpdating(false);
          }
        } else {
          setIsUpdating(false);
        }
      });
    } catch (error) {
      setIsUpdating(false);
    }
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
                            updateCandidateJobStatus(
                              item.auto_id,
                              item.candidate_status
                            )
                          }
                          disabled={isUpdating && selectedId === item.auto_id}
                        >
                          {isUpdating && selectedId === item.auto_id ? (
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

                          {item.candidate_propose_status}
                        </Button>
                      ) : null}

                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() =>
                          openAddNoteModal(
                            item.resource_name,
                            item.user_slug,
                            item.job_id
                          )
                        }
                        className="me-2"
                      >
                        <FiFilePlus /> Add Notes
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() =>
                          openViewNoteModal(item.user_slug, item.job_id)
                        }
                      >
                        <FiFileText /> View Notes
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
        <CandidateNoteAddModal
          resourceSlug={selectedCandidateSlug}
          open={openNoteAddModal}
          handleClose={handleNoteAddClose}
          candidateName={selectedCandidateName}
          jobId={selectedJobId}
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
