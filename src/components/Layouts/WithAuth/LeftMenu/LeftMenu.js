import React, { useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../../../context/AuthContext";
import LogoutButtonComponent from "./LogoutButtonComponent";
import "./LeftMenuCss.css";

const Sidebar = () => {
  const { userDetails } = useAuthContext();
  const [isExpand, setIsExpand] = useState(true);
  const firm_details = JSON.parse(userDetails).firm_details;
  const user_primary_role = JSON.parse(userDetails).user_primary_role;

  const checkResourceTextDisplay = () => {
    if (firm_details) {
      if (firm_details?.firm_type === 1) {
        return <div className="my-3 d-flex align-items-center">Candidates</div>;
      } else {
        return (
          <div className="my-3 d-flex align-items-center">My Candidates</div>
        );
      }
    }
  };

  return (
    <div className="sidebarNew">
      <CDBSidebar toggled={true} textColor="#fff" backgroundColor="#334680">
        <CDBSidebarHeader
          prefix={
            <i
              className="fa fa-bars fa-large"
              onClick={() => setIsExpand(!isExpand)}
            ></i>
          }
        >
          Menu
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/search" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="search">Search</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/resources" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">
                {checkResourceTextDisplay()}
              </CDBSidebarMenuItem>
            </NavLink>
            {user_primary_role === "1" ? (
              <NavLink
                exact
                to="/resource-managers"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon={"bolt"}>
                  <div className="my-3 d-flex align-items-center">Managers</div>
                </CDBSidebarMenuItem>
              </NavLink>
            ) : (
              <CDBSidebarMenuItem
                className="sidebarStyle"
                icon=""
              ></CDBSidebarMenuItem>
            )}
            {user_primary_role === "2" ? (
              <NavLink
                exact
                to="/access-control"
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon={"bolt"}>
                  <div className="my-3 d-flex align-items-center">
                    Access Control
                  </div>
                </CDBSidebarMenuItem>
              </NavLink>
            ) : (
              <CDBSidebarMenuItem className="sidebarStyle"></CDBSidebarMenuItem>
            )}
            <NavLink
              exact
              to="/profile-settings"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="cog">Settings</CDBSidebarMenuItem>
            </NavLink>
            <CDBSidebarMenuItem icon="sign-out-alt">
              <LogoutButtonComponent />
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};
export default Sidebar;
