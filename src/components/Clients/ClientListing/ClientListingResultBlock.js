import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";
import { AlertInfo } from "../../Alerts/Alert";
import { Button } from "react-bootstrap";
import getMyClientListing from "../../../apis/getMyClientListing";

const ClientListingResultBlock = () => {
  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;
  const user_primary_role = JSON.parse(userDetails).user_primary_role;
  const [isLoading, setIsLoading] = useState(true);
  const [clientListing, setClientListing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [emptyResult, setEmptyResult] = useState("");

  useEffect(() => {
    if (user_slug !== undefined) {
      getClientListing();
    }
  }, [user_slug]);

  const getClientListing = () => {
    Promise.all([getMyClientListing(user_slug)])
      .then(async ([data]) => {
        if (data?.data?.status === 1) {
          if (data?.data?.clientList) {
            setClientListing(data?.data?.clientList);
            setIsLoading(false);
            setHasResult(true);
          } else {
            setIsLoading(false);
            setEmptyResult("No client result found for your account access.");
          }
        } else {
          setIsLoading(false);
          setHasResult(false);
          setEmptyResult(data?.data?.message);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setEmptyResult(false);
        console.log(err);
      });
  };

  const displayMainContent = () => {
    if (isLoading === true) {
      return displayLoadingBlock();
    } else {
      return displayClientListing();
    }
  };

  const displayLoadingBlock = () => {
    return <LoadingPageSm title={"Loading client listing..."} />;
  };

  const displayClientListing = () => {
    if (!hasResult) {
      return <AlertInfo title={"Note"} message={emptyResult} />;
    } else {
      return displayList();
    }
  };

  const displayList = () => {
    return (
      <>
        {clientListing.map((item, index) => {
          return (
            <div key={index.toString()} className="d-block mb-3">
              <div className="card-custom">
                <div className="card-body">
                  <div className="d-block d-md-flex d-lg-flex d-xl-flex d-xxl-flex row align-items-center">
                    <div className="col-12 col-lg-1 col-xl-1 col-xxl-1 mb-3 mb-lg-0 mb-xl-0 mb-xxl-0">
                      <div className="d-block">
                        <span className="text-muted-custom display-6">
                          #{index + 1}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-3 mb-lg-0 mb-xl-0 mb-xxl-0">
                      <div className="d-block">
                        <span className="text-dark-custom text-x-sm-custom fw-bold">
                          Client Email
                        </span>
                      </div>
                      <div className="d-block">
                        <span className="text-info-custom">
                          {item.client_email}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-3 mb-lg-0 mb-xl-0 mb-xxl-0">
                      <div className="d-block">
                        <span className="text-dark-custom text-x-sm-custom fw-bold">
                          Added On
                        </span>
                      </div>
                      <div className="d-block">
                        <span className="text-muted-custom">
                          {item.added_on}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-lg-3 col-xl-3 col-xxl-3 d-flex justify-content-start justify-content-lg-end justify-content-xl-end justify-content-xxl-end">
                      {user_primary_role === "2" ? (
                        <Button variant="danger" size="sm" className="ms-2">
                          Remove Access
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="ms-2"
                          disabled
                        >
                          Remove Access
                        </Button>
                      )}
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

  return <div className="d-block">{displayMainContent()}</div>;
};

export default ClientListingResultBlock;
