import BlockHeader from "../../Headers/BlockHeader";
import ResourceManagerListingResultBlock from "./ResourceManagerListingResultBlock";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

const ManagersList = () => {
  const { userDetails } = useAuthContext();
  const user_primary_role = JSON.parse(userDetails).user_primary_role;

  return (
    <>
      {user_primary_role === "1" ? (
        <div className="d-block mb-3">
          <BlockHeader
            title={"My Resource Managers"}
            subText={
              "The manager listing showing results on which you have access"
            }
          />

          {user_primary_role === "1" ? (
            <div className="d-flex justify-content-end">
              <Link to="/add-resource-manager">
                <Button variant="primary" size="sm">
                  Add Manager
                </Button>
              </Link>
            </div>
          ) : null}
        </div>
      ) : null}

      <ResourceManagerListingResultBlock />
    </>
  );
};

export default ManagersList;
