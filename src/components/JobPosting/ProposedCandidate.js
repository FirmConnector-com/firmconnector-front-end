import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import getPrefferedCandidate from "../../apis/getPrefferedCandidate";
import ProfileImageMd from "../../components/CommonComponent/ProfileImageMd";

const ProposedCandidate = (props) => {
  const { jobSlug, user_slug } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [dataArray, setDataArray] = useState(true);
  const [apiStatusMessage, setApiStatusMessage] = useState(true);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    if (jobSlug) {
      getCandidates();
    }
  }, [jobSlug]);

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
                    <div className="d-block">
                      <span className="fs-6 fw-bold">{item.resource_name}</span>
                    </div>
                    <div className="d-block">
                      <span className="text-info-custom">
                        {item.user_profile_role}
                      </span>
                    </div>
                    <div className="d-block mt-2">
                      <span className="text-secondary">{item.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
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
