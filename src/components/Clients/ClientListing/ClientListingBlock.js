import BlockHeader from "../../Headers/BlockHeader";
import ClientListingResultBlock from "./ClientListingResultBlock";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useAuthContext} from "../../../context/AuthContext";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useEffect, useState} from "react";

const ClientListingBlock = () => {
    // const [searchText, setSearchText] = useState("");
    // const [isSearching, setIsSearching] = useState(false);
    // const [isSearchButtonDisabled, setIsSearchButtonDisabled] = useState(true);
    // const [isKeywordChanging, setIsKeywordChanging] = useState(false);
    // const [isAutoCompleteVisible, setIsAutoCompleteVisible] = useState(false);
    // const [searchResult, setSearchResult] = useState(false);

    const {userDetails} = useAuthContext();
    const user_primary_role = JSON.parse(userDetails).user_primary_role;
    const firm_details = JSON.parse(userDetails).firm_details;
    console.log(userDetails, "userdetails")
    //search on user_email

    // useEffect(() => {
    //     if (searchText.trim().length > 2) {
    //         setIsSearchButtonDisabled(false);
    //     } else {
    //         setIsSearchButtonDisabled(true);
    //     }
    // }, [searchText, isKeywordChanging, isAutoCompleteVisible]);
    //
    // useEffect(() => {
    // }, [isSearching, searchResult]);

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
                <BlockHeader
                    title={"Access Control"}
                    /*subText={
                      "The client listing showing results on which you have access"
                    }*/
                />
                <div className="row">
                    <div className="col-3">
                        <Link to="/access-control">
                            <Button variant="warning" size="sm" className="me-2">
                                My Clients
                            </Button>
                        </Link>
                        {checkResourceTextDisplay()}
                    </div>

                    <div className="col-9" style={{display: "flex", justifyContent: "right"}}>
                        <Col xs={4} style={{display: "flex", marginRight: "8px"}}>
                            <Form.Control placeholder="Search"
                                          style={{height: "28px", marginRight: "8px", borderRadius: "25px"}}/>
                            <Button variant="primary" size="sm" style={{height: "28px"}}>
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
            <ClientListingResultBlock/>
        </>
    );
};

export default ClientListingBlock;
