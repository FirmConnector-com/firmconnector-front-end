import BlockHeader from "../../Headers/BlockHeader";
import ResourceListingResultBlock from "./ResourceListingResultBlock";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import "./ResourceListingBlockCss.css";

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
              My Candidates
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
            <div className="col-12">
              <div className="d-flex justify-content-end">
                <Col className="d-flex search-setting" xs={7}>
                  <Form.Control
                    id="search-box"
                    placeholder="Search for Name,Location or Role"
                  />
                  <Button className="search-btn" variant="warning" size="sm">
                    Search
                  </Button>
                </Col>
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
        <BlockHeader title={"My Candidates"} />
        <div className="d-flex row">
          <div className="col-3">{checkResourceTextDisplay()}</div>
          <div className="d-flex justify-content-end col-9">
            {displayAddResourceText()}
          </div>
        </div>
      </div>
      <ResourceListingResultBlock />
    </>
  );
};

export default ResourceListingBlock;
