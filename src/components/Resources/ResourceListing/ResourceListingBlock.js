import BlockHeader from "../../Headers/BlockHeader";
import ResourceListingResultBlock from "./ResourceListingResultBlock";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import "./ResourceListingBlockCss.css";

const ResourceListingBlock = () => {
  const { userDetails } = useAuthContext();
  const firmType = JSON.parse(userDetails).firm_details?.firm_type;
  const user_primary_role = JSON.parse(userDetails).user_primary_role;

  const firm_details = JSON.parse(userDetails).firm_details;

  const checkResourceTextDisplay = () => {
    if (firm_details) {
      return (
        <Link to="/resources">
          <Button variant="warning" size="sm">
            {firmType === "1" ? "My Team" : "My Candidates"}
          </Button>
        </Link>
      );
    }
  };

  const displayAddResourceText = () => {
    if (user_primary_role === "2") {
      if (firm_details) {
        return (
          <div className="col-6 d-flex justify-content-end">
            <Link to="/add-resource">
              <Button variant="primary" size="sm">
                {firmType === "1" ? "Add Team Member" : "Add Candidate"}
              </Button>
            </Link>
          </div>
        );
      }
    }
  };

  return (
    <>
      <BlockHeader
        title={firmType === "1" ? "My Team" : "My Candidates"}
        subText={"All profiles within your firm"}
      />
      <div className="d-block">
        <div className="d-flex row">
          <div className="col-6">{checkResourceTextDisplay()}</div>
          {displayAddResourceText()}
        </div>
      </div>
      <ResourceListingResultBlock />
    </>
  );
};

export default ResourceListingBlock;
