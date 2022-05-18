import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";
import { AlertInfo } from "../../Alerts/Alert";
import ProfileImageMd from "../../CommonComponent/ProfileImageMd";
import { BadgeInfo } from "../../Badge/Badge";
import { Button } from "react-bootstrap";
import getMyResourceListing from "../../../apis/getMyResourceListing";
import updateIsAdvertised from "../../../apis/updateIsAdvertised";
import { PieChart } from "react-minimal-pie-chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapSigns } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const ResourceListingResultBlock = () => {
  let history = useHistory();
  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;
  const user_primary_role = JSON.parse(userDetails).user_primary_role;
  const [isLoading, setIsLoading] = useState(true);
  const [resourceListing, setResourceListing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [emptyResult, setEmptyResult] = useState("");

  useEffect(() => {
    if (user_slug !== undefined) {
      getResourceListing();
    }
  }, [user_slug]);

  const getResourceListing = () => {
    Promise.all([getMyResourceListing(user_slug)])
      .then(async ([data]) => {
        if (data?.data?.status === 1) {
          if (data?.data?.resourceList) {
            setResourceListing(data?.data?.resourceList);
            setIsLoading(false);
            setHasResult(true);
          } else {
            setIsLoading(false);
            setEmptyResult("No resource result found for your account access.");
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
      return displayResourceListing();
    }
  };

  const displayLoadingBlock = () => {
    return <LoadingPageSm title={"Loading resources..."} />;
  };

  const displayResourceListing = () => {
    if (!hasResult) {
      return <AlertInfo title={"Note"} message={emptyResult} />;
    } else {
      return displayList();
    }
  };

  const updateAdvertised = (advertised, resourceSlug, index) => {
    Promise.all([updateIsAdvertised(user_slug, advertised, resourceSlug)])
      .then(async ([data]) => {
        if (data?.data?.status === 1) {
          let updatedResourceList = [...resourceListing];

          if (advertised === "0") {
            advertised = "1";
          } else {
            advertised = "0";
          }

          updatedResourceList[index].is_advertised = advertised;

          setResourceListing(updatedResourceList);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setEmptyResult(false);
        console.log(err);
      });
  };

  const navigateTpProfile = (path) => {
    history.push(path);
  };

  const displayList = () => {
    return (
      <>
        {resourceListing.map((item, index) => {
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
                    <div className="col-12 col-lg-3 col-xl-3 col-xxl-3 mb-3 mb-lg-0 mb-xl-0 mb-xxl-0">
                      <div className="d-block">
                        <Link to={"resources/details/" + item.user_slug}>
                          {displayName(item.resource_name)}
                        </Link>
                      </div>
                      <div className="d-block">
                        {displayUserProfileRole(item.user_profile_role)}
                      </div>
                    </div>
                    <div className="col-12 col-lg-2 col-xl-2 col-xxl-2 mb-3 mb-lg-0 mb-xl-0 mb-xxl-0">
                      {user_primary_role === "2" ? (
                        <div className="form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            onChange={() =>
                              updateAdvertised(
                                item.is_advertised,
                                item.user_slug,
                                index
                              )
                            }
                            checked={item.is_advertised === "1" ? true : false}
                          />
                        </div>
                      ) : (
                        <div>
                          {item.is_advertised === "1" ? (
                            <div>
                              <span className="text-x-x-sm-custom fw-bold text-success">
                                Yes
                              </span>
                            </div>
                          ) : (
                            <div>
                              <span className="text-x-x-sm-custom fw-bold text-danger">
                                No
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="d-block">
                        <span className="text-x-sm-custom text-muted-custom">
                          Advertised
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-lg-2 col-xl-2 col-xxl-2 mb-3 mb-lg-0 mb-xl-0 mb-xxl-0">
                      <div className="d-block">
                        <span className="text-primary">
                          <FontAwesomeIcon icon={faMapSigns} />
                        </span>
                      </div>
                      <div className="d-block">
                        <span className="text-dark fw-bold-custom text-x-sm-custom">
                          {" "}
                          {item.city_name}, {item.state_name},{" "}
                          {item.country_name}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-lg-1 col-xl-1 col-xxl-1 mb-3 mb-lg-0 mb-xl-0 mb-xxl-0 d-flex flex-column align-items-start align-items-lg-center align-items-xl-center align-items-xxl-center">
                      {displayAvailability(item.availability)}
                      <div className="d-block">
                        <span className="text-x-x-sm-custom fw-medium-custom">
                          {item.availability} hrs/week
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-lg-3 col-xl-3 col-xxl-3 d-flex justify-content-start justify-content-lg-end justify-content-xl-end justify-content-xxl-end">
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() =>
                          navigateTpProfile(
                            "resources/details/" + item.user_slug
                          )
                        }
                      >
                        View Profile
                      </Button>
                      {user_primary_role === "2" ? (
                        <Link to={"resources/edit-resource/" + item.user_slug}>
                          <Button variant="primary" size="sm" className="ms-2">
                            Edit Profile
                          </Button>
                        </Link>
                      ) : null}
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

  const displayAvailability = (availability) => {
    if (availability !== null) {
      availability = parseInt(availability);

      var color = "#DC143C";

      if (availability < 20) {
        color = "#DC143C";
      } else if (availability === 20 || availability === 30) {
        color = "#FFBF00";
      } else {
        color = "#32CD32";
      }

      return (
        <div className="chart-box-md">
          <PieChart
            animate={true}
            animationDuration={500}
            animationEasing="ease-out"
            center={[25, 25]}
            totalValue={40}
            data={[
              {
                color: color,
                value: availability,
              },
            ]}
            labelPosition={25}
            lengthAngle={360}
            lineWidth={30}
            paddingAngle={0}
            radius={25}
            startAngle={90}
            viewBoxSize={[50, 50]}
            background={"#ccc"}
          />
        </div>
      );
    } else {
      availability = 0;

      return (
        <div className="chart-box-md">
          <PieChart
            animate={true}
            animationDuration={500}
            animationEasing="ease-out"
            center={[50, 50]}
            totalValue={40}
            data={[
              {
                color: color,
                value: availability,
              },
            ]}
            labelPosition={50}
            lengthAngle={360}
            lineWidth={30}
            paddingAngle={0}
            radius={50}
            startAngle={0}
            viewBoxSize={[50, 50]}
            background={"#ccc"}
          />
        </div>
      );
    }
  };

  const displayUserProfileRole = (user_profile_role) => {
    if (user_profile_role !== null) {
      return (
        <span className="text-muted-custom text-x-sm-custom">
          {user_profile_role}
        </span>
      );
    } else {
      return (
        <span className="text-danger-custom text-x-sm-custom">
          Not available
        </span>
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

export default ResourceListingResultBlock;
