import BlockHeader from "../../Headers/BlockHeader";
import ResourceListingResultBlock from "./ResourceListingResultBlock";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

const ResourceListingBlock = () => {
  const { userDetails } = useAuthContext();
  const user_primary_role = JSON.parse(userDetails).user_primary_role;

  const firm_details = JSON.parse(userDetails).firm_details;

  const checkResourceTextDisplay = () => {
    if (firm_details) {
      if (firm_details.firm_type === 1) {
        return (
          <Link to="/resources">
            <Button variant="warning" size="sm">
              My Candidates
            </Button>
          </Link>
        );
      } else {
        return (
          <Link to="/resources">
            <Button variant="warning" size="sm">
              My Team
            </Button>
          </Link>
        );
      }
    }
  };

  const displayAddResourceText = () => {
    if (user_primary_role === "2") {
      if (firm_details) {
        if (firm_details.firm_type === 1) {
          return (
            <div className="col-6">
              <div className="d-flex justify-content-end">
                <Link to="/add-resource">
                  <Button variant="primary" size="sm">
                    Add Candidate
                  </Button>
                </Link>
              </div>
            </div>
          );
        } else {
          return (
            <div className="col-6">
              <div className="d-flex justify-content-end">
                <Link to="/add-resource">
                  <Button variant="primary" size="sm">
                    Add Team Member
                  </Button>
                </Link>
              </div>
            </div>
          );
        }
      }
    }
  };

  return (
    <>
      <div className="d-block mb-3">
        <BlockHeader
          title={"Access Control"}
          subText={
            "The resource listing showing results on which you have access"
          }
        />

        <div className="row">
          <div className="col-6">
            <Link to="/access-control">
              <Button variant="light" size="sm" className="me-2">
                My Clients
              </Button>
            </Link>
            {checkResourceTextDisplay()}
          </div>
          {displayAddResourceText()}
        </div>
      </div>
      <ResourceListingResultBlock />
    </>
  );
};

export default ResourceListingBlock;
