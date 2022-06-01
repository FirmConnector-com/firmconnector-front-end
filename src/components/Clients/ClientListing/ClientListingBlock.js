import BlockHeader from "../../Headers/BlockHeader";
import ClientListingResultBlock from "./ClientListingResultBlock";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import "./ClientListingBlockCss.css";

const ClientListingBlock = () => {
  const { userDetails } = useAuthContext();
  const user_primary_role = JSON.parse(userDetails).user_primary_role;
  const firm_details = JSON.parse(userDetails).firm_details;

  const checkResourceTextDisplay = () => {
    if (firm_details) {
      if (firm_details.firm_type === 1) {
        return (
          <Link to="/resources">
            <Button variant="light" size="sm">
              Candidates
            </Button>
          </Link>
        );
      }
    }
  };

  return (
    <>
      <div className="d-block mb-3">
        <BlockHeader title={"Access Control"} />
        <div className="row">
          <div className="col-3">
            <Link to="/access-control">
              <Button variant="warning" size="sm" className="me-2">
                My Clients
              </Button>
            </Link>
            {checkResourceTextDisplay()}
          </div>

          <div className="col-9 d-flex justify-content-end">
            <Col className="d-flex search-setting" xs={7}>
              <Form.Control id="search-box" placeholder="Search" />
              <Button className="search-btn" variant="warning" size="sm">
                Search
              </Button>
            </Col>

            {user_primary_role === "2" ? (
              <div className="d-flex justify-content-end">
                <Link to="/add-client">
                  <Button variant="primary" size="sm">
                    Add New Client
                  </Button>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <ClientListingResultBlock />
    </>
  );
};

export default ClientListingBlock;
