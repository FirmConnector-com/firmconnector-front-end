import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import getUserDetails from "../../../apis/getUserDetails";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";
import EditFormBlock from "./EditFormBlock";

const EditManagerForm = (props) => {
  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;
  const [isLoading, setIsLoading] = useState(true);
  const [userArray, setUserArray] = useState(true);

  useEffect(() => {
    if (user_slug !== undefined) {
      Promise.all([getUserDetails(user_slug)])
        .then(async ([data]) => {
          if (data?.data?.user_details) {
            setIsLoading(false);
            setUserArray(data?.data?.user_details);
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
    return <EditFormBlock userDetails={userArray} userSlug={user_slug} />;
  };

  return <div className="d-block">{displayMainContent()}</div>;
};

export default EditManagerForm;
