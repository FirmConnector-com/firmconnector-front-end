import BlockHeader from "../../Headers/BlockHeader";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import "./JobListingBlockCss.css";
import JobListingResultBlock from "./JobListingResultBlock";

const JobListingBlock = () => {
  return (
    <>
      <div className="d-block mb-3">
        <BlockHeader title={"Job Posting"} />
        <div className="row">
          <div className="col-3">
            <Link to="/job-posting">
              <Button variant="warning" size="sm" className="me-2">
                Job Posting
              </Button>
            </Link>
          </div>

          <div className="col-9 d-flex justify-content-end">
            <Col className="d-flex search-setting" xs={7}>
              <Form.Control id="search-box" placeholder="Search Job" />
            </Col>
            <div className="d-flex justify-content-end">
              <Link to="/add-job-posting">
                <Button variant="primary" size="sm">
                  Create Job Posting
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="text-secondary">
          This section is currently under development
        </div>
      </div>
      <JobListingResultBlock />
    </>
  );
};

export default JobListingBlock;
