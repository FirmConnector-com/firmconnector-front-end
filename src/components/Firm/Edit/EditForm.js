import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { AlertInfo } from "../../Alerts/Alert";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";
import getFirmDetails from "../../../apis/getFirmDetails";
import EditFirmFormBlock from "./EditFirmFormBlock";

const EditForm = () => {
  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;
  const user_primary_role = JSON.parse(userDetails).user_primary_role;

  const [isLoading, setIsLoading] = useState(true);
  const [hasPageAccess, setHasPageAccess] = useState(false);
  const [firmDetails, setFirmDetails] = useState(true);

  useEffect(() => {
    if (user_primary_role !== "1") {
      setHasPageAccess(false);
      setIsLoading(false);
    } else {
      setHasPageAccess(true);
      getFirmData();
    }
  }, [user_primary_role]);

  const getFirmData = () => {
    Promise.all([getFirmDetails(user_slug)])
      .then(async ([data]) => {
        if (data?.data?.firmDetails) {
          setIsLoading(false);
          setFirmDetails(data?.data?.firmDetails);
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

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
        <EditFirmFormBlock firmDetails={firmDetails} userSlug={user_slug} />
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

export default EditForm;
