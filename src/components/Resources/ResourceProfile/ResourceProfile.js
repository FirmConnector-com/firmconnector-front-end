import React, { useEffect, useState } from "react";
import ResourceProfileTopSection from "./ResourceProfileTopSection";
import ResourceProfileBottomSection from "./ResourceProfileBottomSection";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";
import { useAuthContext } from "../../../context/AuthContext";
import { Button } from "react-bootstrap";

import getResourceDetails from "../../../apis/getResourceDetails";
import { Link } from "react-router-dom";

const ResourceProfile = (props) => {
  const { resourceSlug } = props;

  const { userDetails } = useAuthContext();
  const firmType = JSON.parse(userDetails).firm_details?.firm_type;
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
        <>
          <div className="d-flex mb-4">
            {rmId === user_slug ? (
              <>
                <div className="me-2">
                  <Button
                    onClick={() => changeView("default")}
                    variant={
                      displayView === "default" ? "primary" : "secondary"
                    }
                    size="sm"
                  >
                    Default View
                  </Button>
                </div>
                <div className="me-2">
                  <Button
                    onClick={() => changeView("client")}
                    variant={displayView === "client" ? "primary" : "secondary"}
                    size="sm"
                    className="ms-2"
                  >
                    Client View
                  </Button>
                </div>
                <Link
                  to={
                    firmType === "1"
                      ? "/my-team/edit-resource/" + resourceSlug
                      : "/resources/edit-resource/" + resourceSlug
                  }
                >
                  <Button variant="success" size="sm" className="ms-2">
                    Edit Profile
                  </Button>
                </Link>
              </>
            ) : null}
          </div>
          <ResourceProfileTopSection
            displayView={displayView}
            resourceDetails={resourceDetails}
          />
          <ResourceProfileBottomSection
            displayView={displayView}
            resourceDetails={resourceDetails}
          />
        </>
      );
    }
  };

  return displayPageContent();
};

export default ResourceProfile;
