import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { AlertInfo } from "../../Alerts/Alert";
import getResourceManagerDetails from "../../../apis/getResourceManagerDetails";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";

import EditResourceManagerFormBlock from "./EditResourceManagerFormBlock";

const EditManagerForm = (props) => {
  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;
  const user_primary_role = JSON.parse(userDetails).user_primary_role;
  const [isLoading, setIsLoading] = useState(true);
  const [hasPageAccess, setHasPageAccess] = useState(false);
  const [resourceManagerDetails, setResourceManagerDetails] = useState(true);

  useEffect(() => {
    if (user_primary_role !== "2") {
      setHasPageAccess(false);
    } else {
      setHasPageAccess(true);
    }
  }, [user_primary_role]);

  //get resource manager details
  useEffect(() => {
    if (user_primary_role === "2") {
      Promise.all([getResourceManagerDetails(user_slug)])
        .then(async ([data]) => {
          if (data?.data?.resource_manager_details) {
            setIsLoading(false);
            setResourceManagerDetails(data?.data?.resource_manager_details);
          } else {
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    } else {
      setIsLoading(false);
    }
  }, [user_primary_role, user_slug]);

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
    if (hasPageAccess) {
      return (
        <EditResourceManagerFormBlock
          resourceManagerDetails={resourceManagerDetails}
          resourceManagerSlug={user_slug}
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

export default EditManagerForm;
