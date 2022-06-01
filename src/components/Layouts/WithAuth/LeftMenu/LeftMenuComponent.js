import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoutButtonComponent from "./LogoutButtonComponent";
import IconContainer from "../../../Iconcontainer/IconContainer";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../../../context/AuthContext";
import useWindowSize from "../../../Resources/ResourceProfile/WindowSize";
import "./LeftMenuCss.css";

const LeftMenuComponent = () => {
  const { userDetails } = useAuthContext();
  const user_primary_role = JSON.parse(userDetails).user_primary_role;
  const firm_details = JSON.parse(userDetails).firm_details;

  const location = useLocation();
  const routeName = location.pathname;
  const [activeRoute, setActiveRoute] = useState("");

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
                <IconContainer iconName={"FiUsers"} color={"var(--info)"} />
              </div>
              <div className="ms-3">
                <span
                  className={
                    activeRoute === "/resources"
                      ? "text-white-custom fw-bold"
                      : "text-white-custom"
                  }
                >
                  Candidates
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
                <IconContainer iconName={"FiUsers"} color={"var(--info)"} />
              </div>
              <div className="ms-3">
                <span
                  className={
                    activeRoute === "/resources"
                      ? "text-white-custom fw-bold"
                      : "text-white-custom"
                  }
                >
                  My Candidates
                </span>
              </div>
            </div>
          </Link>
        );
      }
    }
  };

  return (
    <>
      <div
        className="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
        data-bs-scroll="true"
        data-bs-backdrop="false"
      >
        <div className="offcanvas-header d-flex align-items-end justify-content-end">
          <div
            className="sm-block-rounded bg-black-custom cursor-pointer"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <IconContainer iconName={"FiX"} color={"var(--white)"} />
          </div>
        </div>
        <div className="offcanvas-body">
          <div className="left-menu-nav-wrapper">
            <Link to="/search">
              <div className="my-3 d-flex align-items-center">
                <div className="sm-block animated-hover bg-muted-custom">
                  <IconContainer
                    iconName={"FiSearch"}
                    color={"var(--success)"}
                  />
                </div>
                <div className="ms-3">
                  <span
                    className={
                      activeRoute === "/search"
                        ? "text-white-custom fw-bold"
                        : "text-white-custom"
                    }
                  >
                    Search
                  </span>
                </div>
              </div>
            </Link>
            {checkResourceTextDisplay()}
            {user_primary_role === "1" && (
              <Link to="/resource-managers">
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
              </Link>
            )}

            {user_primary_role === "2" && (
              <Link to="/access-control">
                <div className="my-3 d-flex align-items-center">
                  <div className="sm-block animated-hover bg-muted-custom">
                    <IconContainer
                      iconName={"FiZap"}
                      color={"var(--success-dark)"}
                    />
                  </div>
                  <div className="ms-3">
                    <span
                      className={
                        activeRoute === "/access-control"
                          ? "text-white-custom fw-bold"
                          : "text-white-custom"
                      }
                    >
                      Access Control
                    </span>
                  </div>
                </div>
              </Link>
            )}

            <Link to="/profile-settings">
              <div className="my-3 d-flex align-items-center">
                <div className="sm-block animated-hover bg-muted-custom">
                  <IconContainer
                    iconName={"FiSettings"}
                    color={"var(--muted)"}
                  />
                </div>
                <div className="ms-3">
                  <span
                    className={
                      activeRoute === "/profile-settings"
                        ? "text-white-custom fw-bold"
                        : "text-white-custom"
                    }
                  >
                    Settings
                  </span>
                </div>
              </div>
            </Link>
            <LogoutButtonComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftMenuComponent;
