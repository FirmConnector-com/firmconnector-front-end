import React, { useState, useEffect } from "react";
import ResourceProfileTopSection from "./ResourceProfileTopSection";
import ResourceProfileBottomSection from "./ResourceProfileBottomSection";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";
import { useAuthContext } from "../../../context/AuthContext";

import getResourceDetails from "../../../apis/getResourceDetails";
import { Link } from "react-router-dom";

const ResourceProfile = (props) => {
  const { resourceSlug } = props;
  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;

  const [displayView, setDisplayView] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [resourceDetails, setResourceDetails] = useState(false);
  const [rmId, setRmId] = useState(false);

  useEffect(() => {
    if (resourceDetails) {
      setRmId(resourceDetails.profile_details.rm_id);
    }
  }, [resourceDetails]);

  useEffect(() => {
    if (user_slug !== undefined && resourceSlug !== undefined) {
      Promise.all([getResourceDetails(resourceSlug, user_slug)])
        .then(async ([data]) => {
          if (data?.data?.resource_details) {
            await setResourceDetails(data?.data?.resource_details);
            await setDisplayView(data?.data?.resource_details.resource_access);
            await setIsProfileLoading(false);
          } else {
            setIsProfileLoading(false);
          }
        })
        .catch((err) => {
          setIsProfileLoading(false);
          console.log(err);
        });
    }
  }, [user_slug, resourceSlug]);

  const changeView = async (type) => {
    await setDisplayView(type);
  };

  const displayPageContent = () => {
    if (isProfileLoading) {
      return <LoadingPageSm title={"Loading resource details..."} />;
    } else {
      return (
        <div>
          <div className="col-12 mb-4">
            <div className="d-flex">
              {rmId === user_slug ? (
                <>
                  <div className="me-2">
                    <span
                      className={`btn btn-${
                        displayView === "default" ? "primary" : "secondary"
                      } btn-sm`}
                      onClick={() => changeView("default")}
                    >
                      Default View
                    </span>
                  </div>
                  <div className="me-2">
                    <span
                      className={`btn btn-${
                        displayView === "client" ? "primary" : "secondary"
                      } btn-sm`}
                      onClick={() => changeView("client")}
                    >
                      Client View
                    </span>
                  </div>
                  <Link to={"/resources/edit-resource/" + resourceSlug}>
                    <div>
                      <span className="btn btn-secondary btn-sm">
                        Edit Profile
                      </span>
                    </div>
                  </Link>
                </>
              ) : null}
            </div>
          </div>
          <ResourceProfileTopSection
            displayView={displayView}
            resourceDetails={resourceDetails}
          />
          <ResourceProfileBottomSection
            displayView={displayView}
            resourceDetails={resourceDetails}
          />
        </div>
      );
    }
  };

  return displayPageContent();
};

export default ResourceProfile;
