import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";
import { AlertInfo } from "../../Alerts/Alert";
import ProfileImageMd from "../../CommonComponent/ProfileImageMd";
import { BadgeInfo } from "../../Badge/Badge";

import getMyResourceManagerListing from "../../../apis/getMyResourceManagerListing";

const ResourceManagerListingResultBlock = () => {
  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;
  const user_primary_role = JSON.parse(userDetails).user_primary_role;
  const [isLoading, setIsLoading] = useState(true);
  const [resourceManagerListing, setResourceManagerListing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [emptyResult, setEmptyResult] = useState("");

  useEffect(() => {
    if (user_slug !== undefined && user_primary_role === "1") {
      getResourceListing();
    }
  }, [user_slug]);

  const getResourceListing = () => {
    Promise.all([getMyResourceManagerListing(user_slug)])
      .then(async ([data]) => {
        if (data?.data?.status === 1) {
          if (data?.data?.resourceManagerList) {
            setResourceManagerListing(data?.data?.resourceManagerList);
            setIsLoading(false);
            setHasResult(true);
          } else {
            setIsLoading(false);
            setEmptyResult(
              "No resource manager found for your account access."
            );
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
    if (user_primary_role === "1") {
      if (isLoading === true) {
        return displayLoadingBlock();
      } else {
        return displayResourceManagerListing();
      }
    } else {
      return noAccessBlock();
    }
  };

  const displayLoadingBlock = () => {
    return <LoadingPageSm title={"Loading resource managers..."} />;
  };

  const displayResourceManagerListing = () => {
    if (!hasResult) {
      return <AlertInfo title={"Note"} message={emptyResult} />;
    } else {
      return displayList();
    }
  };

  const noAccessBlock = () => {
    return (
      <AlertInfo
        title={"Note"}
        message={"You don't have access to view this page!"}
      />
    );
  };

  const displayList = () => {
    return (
      <>
        {resourceManagerListing.map((item, index) => {
          return (
            <div key={index.toString()} className="d-block mb-3">
              <div className="card-custom">
                <div className="card-body">
                  <div className="d-block d-md-flex d-lg-flex d-xl-flex d-xxl-flex row align-items-center">
                    <div className="col-12 col-lg-1 col-xl-1 col-xxl-1 mb-3 mb-lg-0 mb-xl-0 mb-xxl-0">
                      <Link to={"resources/details/" + item.user_slug}>
                        <ProfileImageMd imgSrc={item.profile_image_path} />
                      </Link>
                    </div>
                    <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-3 mb-lg-0 mb-xl-0 mb-xxl-0">
                      <div className="d-block">
                        <Link to={"resources/details/" + item.user_slug}>
                          {displayName(item.profile_name)}
                        </Link>
                      </div>
                      <div className="d-block">
                        {displayUserProfileRole(item.user_role_title)}
                      </div>
                    </div>
                    <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 mb-3 mb-lg-0 mb-xl-0 mb-xxl-0">
                      <div className="d-block">
                        <span className="text-x-sm-custom fw-bold text-dark-custom">
                          Email Address
                        </span>
                      </div>
                      <div className="d-block">
                        <span className="text-muted-custom">
                          {item.user_email}
                        </span>
                      </div>
                    </div>
                    {/* <div className="col-12 col-lg-3 col-xl-3 col-xxl-3 mb-3 mb-lg-0 mb-xl-0 mb-xxl-0">
                      <div className="d-block">
                        <span className="text-x-sm-custom fw-bold text-dark-custom">
                          Phone Number
                        </span>
                      </div>
                      <div className="d-block">
                        <span className="text-muted-custom">
                          {item.user_phone}
                        </span>
                      </div>
                    </div> */}
                    <div className="col-12 col-lg-3 col-xl-3 col-xxl-3 mb-3 mb-lg-0 mb-xl-0 mb-xxl-0">
                      <div className="d-block">
                        <span className="text-x-sm-custom fw-bold text-dark-custom">
                          Created On
                        </span>
                      </div>
                      <div className="d-block">
                        <span className="text-muted-custom">
                          {item.joined_on}
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

  const displayUserProfileRole = (user_role_title) => {
    if (user_role_title !== null) {
      return (
        <span className="text-muted-custom text-sm-custom">
          {user_role_title}
        </span>
      );
    } else {
      return (
        <span className="text-danger-custom text-sm-custom">Not available</span>
      );
    }
  };

  const displayName = (name) => {
    if (name !== null) {
      if (name.length > 25) {
        return (
          <span className="text-dark-custom fw-bold text-sm-custom">
            {name.substring(0, 25) + "..."}
          </span>
        );
      } else {
        return (
          <span className="text-dark-custom fw-bold text-sm-custom">
            {name}
          </span>
        );
      }
    } else {
      return <BadgeInfo title={"Not available"} />;
    }
  };

  return <div className="d-block">{displayMainContent()}</div>;
};

export default ResourceManagerListingResultBlock;
