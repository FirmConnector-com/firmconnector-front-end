import React, { useEffect, useState } from "react";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import IconContainer from "../../Iconcontainer/IconContainer";

import getFirmResourceManagerCount from "../../../apis/getFirmResourceManagerCount";

const FirmResourceManagerCount = (props) => {
  const { user_slug } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [resourceManagerCount, setResourceManagerCount] = useState(false);

  useEffect(() => {
    Promise.all([getFirmResourceManagerCount(user_slug)])
      .then(async ([data]) => {
        if (data?.data?.resource_manager_count) {
          setIsLoading(false);
          setResourceManagerCount(data?.data?.resource_manager_count);
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  const displayMainContent = () => {
    if (isLoading === true) {
      return displayLoadingBlock();
    } else {
      return displayFirmInformation();
    }
  };

  const displayLoadingBlock = () => {
    return <LoadingPageSm title={"Loading Resource Managers"} />;
  };

  const displayFirmInformation = () => {
    return (
      <>
        <div className="d-block mb-2 mt-2">
          <div className="icon-holder-sm icon-holder-info">
            <IconContainer iconName={"FiUsers"} />
          </div>
        </div>
        <Link to={"resource-managers"}>
          <h1 className="display-3 text-dark">{resourceManagerCount}</h1>
        </Link>
        <div className="d-block mb-2">
          <span className="h6 text-muted-custom">Resource Managers</span>
        </div>
        <div className="d-block mt-3">
          <Link to={"add-resource-manager"}>
            <Button variant="success" size="sm">
              Add Manager
            </Button>
          </Link>
        </div>
      </>
    );
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-3 mb-md-2 mb-lg-0 mb-xlg-0 ">
      <div className="card-custom p-3 h-100 bg-white">
        <div className="card-body d-flex flex-column justify-content-center align-items-center">
          {displayMainContent()}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FirmResourceManagerCount);
