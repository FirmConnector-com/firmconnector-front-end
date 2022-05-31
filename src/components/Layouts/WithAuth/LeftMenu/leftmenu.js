import React, {useState, useEffect} from "react";
import {CDBSidebar, CDBSidebarContent, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem} from "cdbreact";
import IconContainer from "../../../Iconcontainer/IconContainer";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {useAuthContext} from "../../../../context/AuthContext";
import {FiSearch} from "react-icons/fi";
import LogoutButtonComponent from "./LogoutButtonComponent";

const Sidebar = () => {
    const {userDetails} = useAuthContext();
    const [activeRoute, setActiveRoute] = useState("");
    const firm_details = JSON.parse(userDetails).firm_details;
    const user_primary_role = JSON.parse(userDetails).user_primary_role;
    const searchIcon = <FiSearch/>

    const location = useLocation();
    const routeName = location.pathname;

    useEffect(() => {
        setActiveRoute(routeName);
    }, [routeName]);

    const checkResourceTextDisplay = () => {
        if (firm_details) {
            if (firm_details?.firm_type === 1) {
                return (
                    <Link to="/resources">
                        <div className="my-3 d-flex align-items-center">
                            <div className="sm-block animated-hover bg-muted-custom">
                                <IconContainer iconName={"FiUsers"} color={"var(--info)"}/>
                            </div>
                            <div className="ms-3">
                                <span
                                    className={
                                        activeRoute === "/resources"
                                            ? "text-white-custom fw-bold"
                                            : "text-white-custom"
                                    }
                                >
                                    {firm_details?.firm_type === 1 ? "Candidates" : "My Candidates"}
                                </span>
                            </div>
                        </div>
                    </Link>
                );
            } else {
                return (
                    <Link to="/resources">
                        <div className="my-3 d-flex align-items-center">
                            <div className="sm-block animated-hover bg-muted-custom">
                                <IconContainer iconName={"FiUsers"} color={"var(--info)"}/>
                            </div>
                            <div className="ms-3">
                                <span
                                    className={
                                        activeRoute === "/resources"
                                            ? "text-white-custom fw-bold"
                                            : "text-white-custom"
                                    }
                                >
                                </span>
                            </div>
                        </div>
                    </Link>
                );
            }
        }
    };

    return (
        <div className="sidebarNew">
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}></CDBSidebarHeader>
                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
                        <CDBSidebarMenuItem icon="table">Tables</CDBSidebarMenuItem>
                        <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
                        <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
                        <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
                        {/*<div className="sm-block animated-hover bg-muted-custom">*/}
                        {/*    <IconContainer*/}
                        {/*        iconName={"FiSearch"}*/}
                        {/*        color={"var(--success)"}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*<Link to="/search">*/}
                        {/*    <div className="my-3 d-flex align-items-center">*/}
                        {/*        <div className="sm-block animated-hover bg-muted-custom">*/}
                        {/*            <IconContainer*/}
                        {/*                iconName={"FiSearch"}*/}
                        {/*                color={"var(--success)"}*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*        <div className="ms-3">*/}
                        {/*          <span*/}
                        {/*              className={*/}
                        {/*                  activeRoute === "/search"*/}
                        {/*                      ? "text-white-custom fw-bold"*/}
                        {/*                      : "text-white-custom"*/}
                        {/*              }*/}
                        {/*          >*/}
                        {/*              <CDBSidebarMenuItem>Search</CDBSidebarMenuItem>*/}

                        {/*          </span>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</Link>*/}

                        {/* {checkResourceTextDisplay()} */}
                        {/*{console.log({user_primary_role})}*/}
                        {/*{user_primary_role === "1" && (*/}
                        {/* <Link to="/resource-managers">
                            <div className="my-3 d-flex align-items-center">
                                <div className="sm-block animated-hover bg-muted-custom">
                                    <IconContainer
                                        iconName={"FiUsers"}
                                        color={"var(--warning)"}
                                    />
                                </div>
                                <div className="ms-3">
                                        <span
                                            className={
                                                activeRoute === "/resource-managers"
                                                    ? "text-white-custom fw-bold"
                                                    : "text-white-custom"
                                            }
                                        >
                                          Managers
                                        </span>
                                </div>
                            </div>
                        </Link> */}
                        {/*)}*/}

                        {/*{user_primary_role === "2" &&*/}
                        {/*    <Link to="/access-control">*/}
                        {/*        <div className="my-3 d-flex align-items-center">*/}
                        {/*            <div className="sm-block animated-hover bg-muted-custom">*/}
                        {/*                <IconContainer*/}
                        {/*                    iconName={"FiZap"}*/}
                        {/*                    color={"var(--success-dark)"}*/}
                        {/*                />*/}
                        {/*            </div>*/}
                        {/*            <div className="ms-3">*/}
                        {/*                <span*/}
                        {/*                    className={*/}
                        {/*                        activeRoute === "/access-control"*/}
                        {/*                            ? "text-white-custom fw-bold"*/}
                        {/*                            : "text-white-custom"*/}
                        {/*                    }*/}
                        {/*                >*/}
                        {/*                  Access Control*/}
                        {/*                </span>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </Link>}*/}

                        {/*<Link to="/profile-settings">*/}
                        {/*    <div className="my-3 d-flex align-items-center">*/}
                        {/*        <div className="sm-block animated-hover bg-muted-custom">*/}
                        {/*            <IconContainer*/}
                        {/*                iconName={"FiSettings"}*/}
                        {/*                color={"var(--muted)"}*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*        <div className="ms-3">*/}
                        {/*          <span*/}
                        {/*              className={*/}
                        {/*                  activeRoute === "/profile-settings"*/}
                        {/*                      ? "text-white-custom fw-bold"*/}
                        {/*                      : "text-white-custom"*/}
                        {/*              }*/}
                        {/*          >*/}
                        {/*            Settings*/}
                        {/*          </span>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</Link>*/}
                        {/*<LogoutButtonComponent/>*/}
                    </CDBSidebarMenu>
                </CDBSidebarContent>
            </CDBSidebar>
        </div>
    );
}
export default Sidebar