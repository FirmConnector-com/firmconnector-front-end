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

const ProposedCandidate = (props) => {
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

  const displayCandidateItems = () => {
    return (
      <>
        {dataArray.map(function (item, index) {
          return (
            <div className="card-custom mb-2" key={item.user_slug}>
              <div className="card-body">
                <div className="d-flex">
                  <div className="d-block me-4">
                    {displayProfilePicture(item.profile_image_path)}
                  </div>
                  <div className="d-block">
                    <div className="d-block mb-4">
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
                      <div className="d-block">
                        {displayFirm(item.firm_logo)}
                      </div>
                    </div>
                    <div className="d-flex">
                      <Button
                        variant="success"
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
                        variant="primary"
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
