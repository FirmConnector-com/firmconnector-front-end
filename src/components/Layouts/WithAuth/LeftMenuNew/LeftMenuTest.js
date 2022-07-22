// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav from "@trendmicro/react-sidenav";
import React, { useState } from "react";
import "./LeftMenuCss.css";
import { useHistory, useLocation } from "react-router-dom";
import NavItems from "./NavItem";
import { useAuthContext } from "../../../../context/AuthContext";
import LogoutButtonComponent from "./LogoutButtonComponent";
import swalWithBootstrapButtons from "sweetalert2-react-content";
import Swal from "sweetalert2";

const LeftMenuTest = () => {
  const location = useLocation();
  const history = useHistory();
  const pages = [
    "/search",
    ["/resources", "/my-team"],
    "/resource-managers",
    "/access-control",
    "/jobs",
    "/profile-settings",
  ];
  const { userDetails } = useAuthContext();
  const [openSideBar, setOpenSideBar] = useState({
    toggleIcon: false,
    navLink: false,
  });
  const firm_details = JSON.parse(userDetails).firm_details;
  const firmType = firm_details?.firm_type;
  const user_primary_role = JSON.parse(userDetails).user_primary_role;
  const checkResourceTextDisplay = () => {
    if (firm_details) {
      return (
        <div className="d-flex align-items-center">
          {firmType === "1" ? "My Team" : "My Candidates"}
        </div>
      );
    }
  };
  const { signOut } = useAuthContext();
  const MySwal = swalWithBootstrapButtons(Swal);

  const displayLogoutAlert = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "that you want to logout from your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      confirmButtonColor: "var(--danger)",
      cancelButtonColor: "var(--black)",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut();
      }
    });
  };
  return (
    <SideNav
      className="sidebarNew"
      expanded={
        openSideBar.toggleIcon ? true : openSideBar.toggleIcon ? true : false
      }
      onToggle={() =>
        setOpenSideBar((prev) => {
          return { ...prev, toggleIcon: !prev.toggleIcon };
        })
      }
      onSelect={(selected) => {
        // Add your code here
        const to = "/" + selected;

        history.push(to);
      }}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="search">
        <NavItems
          active={pages[0] === location.pathname ? true : false}
          name="Search"
          eventKey="search"
          path="/search"
          iconName="FiSearch"
          iconColor="var(--success)"
          onClick={() => history.push("/search")}
        />
        {user_primary_role === "1" || user_primary_role === "2" ? (
          <NavItems
            active={
              pages[1][0] === location.pathname
                ? true
                : pages[1][1] === location.pathname
                ? true
                : false
            }
            name={checkResourceTextDisplay()}
            eventKey="resources"
            path={firmType === "1" ? "/my-team" : "/resources"}
            iconName="FiUsers"
            iconColor="var(--warning)"
            onClick={() =>
              firmType === "1"
                ? history.push("/my-team")
                : history.push("/resources")
            }
          />
        ) : null}

        {user_primary_role === "1" && (
          <NavItems
            active={pages[2] === location.pathname ? true : false}
            name="Managers"
            eventKey="managers"
            path="/resource-managers"
            iconName="FiUser"
            iconColor="var(--success-dark)"
            onClick={() => history.push("/resource-managers")}
          />
        )}
        {user_primary_role === "2" && (
          <NavItems
            active={pages[3] === location.pathname ? true : false}
            name="Access Control"
            eventKey="access-control"
            path="/access-control"
            iconName="FiZap"
            iconColor="var(--success-dark)"
            onClick={() => history.push("/access-control")}
          />
        )}
        <NavItems
          active={pages[4] === location.pathname ? true : false}
          name="Job Posting"
          eventKey="jobs"
          path="/job/latest-jobs"
          iconName="FiFilePlus"
          iconColor="#2A7BFF"
          onClick={() => history.push("/job/latest-jobs")}
        />
        <NavItems
          active={pages[5] === location.pathname ? true : false}
          name="Settings"
          eventKey="settings"
          path="/profile-settings"
          iconName="FiSettings"
          iconColor="var(--muted)"
          onClick={() => history.push("/profile-settings")}
        />
        <NavItems
          name={<LogoutButtonComponent />}
          eventKey="logout"
          path={location.pathname}
          iconName="FiLogOut"
          iconColor="var(--danger)"
          onClick={() => displayLogoutAlert()}
        />
      </SideNav.Nav>
    </SideNav>
  );
};

export default LeftMenuTest;
