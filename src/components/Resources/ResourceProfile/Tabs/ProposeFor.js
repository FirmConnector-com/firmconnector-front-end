import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { Button } from "react-bootstrap";
import getPropose from "../../../../apis/getPropose";
import AddProposeForModal from "./AddProposeForModal";

const ProposeFor = (props) => {
  const { resourceSlug } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [proposedForData, setProposedForData] = useState(false);
  const [apiStatusMessage, setApiStatusMessage] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [openProposeModal, setOpenProposeModal] = useState(false);

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

  const displayJobitems = () => {
    return (
      <>
        {proposedForData.map(function (jItem, jIndex) {
          return (
            <div className="card-custom mb-2">
              <div className="card-body">
                <div className="d-block">
                  <h6>{jItem.job_title}</h6>
                </div>
                <div className="d-block">
                  <span className="text-muted">on {jItem.added_on}</span>
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

  return (
    <div className="d-block">
      {displayAddButton()}
      {displayProposedData()}
      <AddProposeForModal
        resourceSlug={resourceSlug}
        open={openProposeModal}
        handleClose={handleClose}
      />
    </div>
  );
};

export default ProposeFor;
