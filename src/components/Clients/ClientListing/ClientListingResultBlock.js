import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";
import { AlertInfo } from "../../Alerts/Alert";
import getMyClientListing from "../../../apis/getMyClientListing";

const ClientListingResultBlock = () => {
  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;
  const [isLoading, setIsLoading] = useState(true);
  const [clientListing, setClientListing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [emptyResult, setEmptyResult] = useState("");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    if (user_slug !== undefined) {
      const timeoutId = setTimeout(
        () => [setIsLoading(true), getClientListing()],
        500
      );
      return () => clearTimeout(timeoutId);
    }
  }, [filterText, user_slug]);

  const getClientListing = () => {
    Promise.all([getMyClientListing(user_slug, filterText)])
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

  const onKeyworkChange = (e) => {
    setFilterText(e.target.value);
  };

  const displaySearchResourceBlock = () => {
    return (
      <div className="col-12">
        <div className="d-flex">
          <div className="col-12 col-lg-5 col-xl-5 col-xxl-5">
            <input
              type="email"
              placeholder="Search for email"
              class="form-control"
              onChange={onKeyworkChange}
              value={filterText}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    );
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
                        <span className="fw-bold">Client Email</span>
                      </div>
                      <div className="d-block">
                        <span className="text-info-custom">
                          {item.user_email}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-3 mb-lg-0 mb-xl-0 mb-xxl-0">
                      <div className="d-block">
                        <span className="fw-bold">Added On</span>
                      </div>
                      <div className="d-block">
                        <span className="text-muted-custom">
                          {item.added_on}
                        </span>
                      </div>
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

  return (
    <div className="d-block">
      {clientListing ? (
        <div className="d-flex row my-4">{displaySearchResourceBlock()}</div>
      ) : null}
      {displayMainContent()}
    </div>
  );
};

export default ClientListingResultBlock;
