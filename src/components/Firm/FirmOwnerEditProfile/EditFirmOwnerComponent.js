import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { AlertInfo } from "../../Alerts/Alert";
import checkResourceEditAccess from "../../../apis/checkResourceEditAccess";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";

import EditResourceFormBlock from "./EditResourceFormBlock";

const EditResourceComponent = (props) => {
  const { resourceSlug } = props;

  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(true);
  const [resourceDetails, setResourceDetails] = useState(true);

  useEffect(() => {}, [hasAccess]);

  //get resource details
  useEffect(() => {
    if (user_slug !== undefined) {
      Promise.all([checkResourceEditAccess(user_slug, resourceSlug)])
        .then(async ([data]) => {
          if (data?.data?.resource_details) {
            setIsLoading(false);
            setHasAccess(true);
            setResourceDetails(data?.data?.resource_details);
          } else {
            setIsLoading(false);
            setHasAccess(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  }, [user_slug]);

  const displayMainContent = () => {
    if (isLoading === true) {
      return displayLoadingBlock();
    } else {
      return displayFormBlock();
    }
  };

  const displayLoadingBlock = () => {
    return <LoadingPageSm title={"Loading, please wait..."} />;
  };

  const displayFormBlock = () => {
    if (hasAccess) {
      return (
        <EditResourceFormBlock
          resourceDetails={resourceDetails}
          resourceSlug={resourceSlug}
        />
      );
    } else {
      return alertContent();
    }
  };

  const alertContent = () => {
    return (
      <AlertInfo
        title={"Note"}
        message={"You do not have access to view this page"}
      />
    );
  };

  return <div className="d-block">{displayMainContent()}</div>;
};

export default EditResourceComponent;
