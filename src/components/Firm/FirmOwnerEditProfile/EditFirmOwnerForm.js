import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { AlertInfo } from "../../Alerts/Alert";
import getFirmOwnerDetails from "../../../apis/getFirmOwnerDetails";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";

import EditFirmOwnerFormBlock from "./EditFirmOwnerFormBlock";

const EditFirmOwnerForm = (props) => {
  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;
  const user_primary_role = JSON.parse(userDetails).user_primary_role;
  const [isLoading, setIsLoading] = useState(true);
  const [hasPageAccess, setHasPageAccess] = useState(false);
  const [firmOwnerDetails, setFirmOwnerDetails] = useState(true);

  useEffect(() => {
    if (user_primary_role !== "1") {
      setHasPageAccess(false);
    } else {
      setHasPageAccess(true);
    }
  }, [user_primary_role]);

  //get firm owner details
  useEffect(() => {
    if (user_primary_role === "1") {
      Promise.all([getFirmOwnerDetails(user_slug)])
        .then(async ([data]) => {
          if (data?.data?.firm_owner_details) {
            setIsLoading(false);
            setFirmOwnerDetails(data?.data?.firm_owner_details);
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
        <EditFirmOwnerFormBlock
          userDetails={firmOwnerDetails}
          userSlug={user_slug}
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

export default EditFirmOwnerForm;
