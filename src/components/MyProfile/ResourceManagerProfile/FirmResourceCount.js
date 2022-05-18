import React, { useEffect, useState } from "react";
import LoadingPageSm from "../../CommonComponent/LoadingPageSm";
import IconContainer from "../../Iconcontainer/IconContainer";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import getResourceManagerResourceCount from "../../../apis/getResourceManagerResourceCount";

const FirmResourceCount = (props) => {
  const { user_slug } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [resourceCount, setResourceCount] = useState(false);

  useEffect(() => {
    Promise.all([getResourceManagerResourceCount(user_slug)])
      .then(async ([data]) => {
        if (data?.data?.resource_count) {
          setIsLoading(false);
          setResourceCount(data?.data?.resource_count);
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [user_slug]);

  const displayMainContent = () => {
    if (isLoading === true) {
      return displayLoadingBlock();
    } else {
      return displayFirmInformation();
    }
  };

  const displayLoadingBlock = () => {
    return <LoadingPageSm title={"Loading Resources"} />;
  };

  const displayFirmInformation = () => {
    return (
      <>
        <div className="d-block mb-2 mt-2">
          <div className="icon-holder-sm icon-holder-info">
            <IconContainer iconName={"FiUsers"} />
          </div>
        </div>
        <h1 className="display-3">{resourceCount}</h1>
        <div className="d-block mb-2">
          <Link to={"resources"}>
            <span className="h6">Resources</span>
          </Link>
        </div>
        <div className="d-block mt-3">
          <Link to={"add-resource"}>
            <Button variant="success" size="sm" className="me-2">
              Add new Resource
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

export default React.memo(FirmResourceCount);
