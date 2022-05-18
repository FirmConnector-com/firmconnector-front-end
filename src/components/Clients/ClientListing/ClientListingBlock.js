import BlockHeader from "../../Headers/BlockHeader";
import ClientListingResultBlock from "./ClientListingResultBlock";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

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
      } else {
        return (
          <Link to="/resources">
            <Button variant="light" size="sm">
              My Team
            </Button>
          </Link>
        );
      }
    }
  };

  return (
    <>
      <div className="d-block mb-3">
        <BlockHeader
          title={"My Clients"}
          subText={
            "The client listing showing results on which you have access"
          }
        />
        <div className="row">
          <div className="col-6">
            <Link to="/access-control">
              <Button variant="warning" size="sm" className="me-2">
                My Clients
              </Button>
            </Link>
            {checkResourceTextDisplay()}
          </div>
          <div className="col-6">
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
