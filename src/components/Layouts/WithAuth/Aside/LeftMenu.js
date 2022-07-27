import React from "react";
import {
  BsSearch,
  BsFillPersonLinesFill,
  BsLink45Deg,
  BsFileText,
  BsGear,
  BsThreeDots,
  BsShield,
  BsArrowBarRight,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../../context/AuthContext";
import { useLocation } from "react-router-dom";
import ProfileImageMd from "../../../CommonComponent/ProfileImageMd";
import swalWithBootstrapButtons from "sweetalert2-react-content";
import Swal from "sweetalert2";

const LeftMenu = () => {
  const location = useLocation();
  const { userDetails } = useAuthContext();
  const loggedinUserDetails = JSON.parse(userDetails);
  const firm_details = JSON.parse(userDetails).firm_details;
  const firmType = firm_details?.firm_type;
  const user_primary_role = JSON.parse(userDetails).user_primary_role;

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
    <aside
      className="bd-sidebar position-fixed h-100 d-flex flex-column flex-shrink-0 bg-light shadow-lg"
      style={{ zIndex: 3 }}
    >
      <div className="d-none d-lg-block d-xl-block d-xxl-block">
        <div
          className="d-flex flex-column flex-shrink-0 bg-light"
          style={{ width: "4.5rem" }}
        >
          <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
            <li
              className="nav-item cursor-pointer"
              data-bs-toggle="offcanvas"
              href="#offcanvasExample"
              role="button"
              aria-controls="offcanvasExample"
            >
              <div className="d-block py-3 bd-navbar">
                <BsThreeDots className="fs-3 text-white" />
              </div>
            </li>

            <li className="nav-item cursor-pointer">
              <Link to="/search">
                <div
                  className={`d-block py-3 border-bottom ${
                    location.pathname === "/search" ? "bg-primary" : "bg-white"
                  }`}
                >
                  <BsSearch
                    className={`fs-3 ${
                      location.pathname === "/search"
                        ? "text-white"
                        : "text-dark"
                    }`}
                  />
                </div>
              </Link>
            </li>

            {user_primary_role === "1" || user_primary_role === "2" ? (
              <li className="nav-item cursor-pointer">
                <Link to={firmType === "1" ? "/my-team" : "/resources"}>
                  <div
                    className={`d-block py-3 border-bottom ${
                      location.pathname === "/my-team" ||
                      location.pathname === "/resources" ||
                      location.pathname.includes("resources") ||
                      location.pathname.includes("my-team")
                        ? "bg-primary"
                        : "bg-white"
                    }`}
                  >
                    <BsFillPersonLinesFill
                      className={`fs-3 ${
                        location.pathname === "/my-team" ||
                        location.pathname === "/resources" ||
                        location.pathname.includes("resources") ||
                        location.pathname.includes("my-team")
                          ? "text-white"
                          : "text-dark"
                      }`}
                    />
                  </div>
                </Link>
              </li>
            ) : null}

            {user_primary_role === "1" ? (
              <li className="nav-item cursor-pointer">
                <Link to="/resource-managers">
                  <div
                    className={`d-block py-3 border-bottom ${
                      location.pathname.includes("resource-manager") ||
                      location.pathname.includes("add-resource-manager")
                        ? "bg-primary"
                        : "bg-white"
                    }`}
                  >
                    <BsShield
                      className={`fs-3 ${
                        location.pathname.includes("resource-manager") ||
                        location.pathname.includes("add-resource-manager")
                          ? "text-white"
                          : "text-dark"
                      }`}
                    />
                  </div>
                </Link>
              </li>
            ) : null}

            {user_primary_role === "2" ? (
              <li className="nav-item cursor-pointer">
                <Link to="/access-control">
                  <div
                    className={`d-block py-3 border-bottom ${
                      location.pathname === "/access-control" ||
                      location.pathname === "/add-client"
                        ? "bg-primary"
                        : "bg-white"
                    }`}
                  >
                    <BsLink45Deg
                      className={`fs-3 ${
                        location.pathname === "/access-control" ||
                        location.pathname === "/add-client"
                          ? "text-white"
                          : "text-dark"
                      }`}
                    />
                  </div>
                </Link>
              </li>
            ) : null}

            <li className="nav-item cursor-pointer">
              <Link to="/job/latest-jobs">
                <div
                  className={`d-block py-3 border-bottom ${
                    location.pathname.includes("job")
                      ? "bg-primary"
                      : "bg-white"
                  }`}
                >
                  <BsFileText
                    className={`fs-3 ${
                      location.pathname.includes("job")
                        ? "text-white"
                        : "text-dark"
                    }`}
                  />
                </div>
              </Link>
            </li>

            <li className="nav-item cursor-pointer">
              <Link to="/profile-settings">
                <div
                  className={`d-block py-3 border-bottom ${
                    location.pathname === "/profile-settings" ||
                    location.pathname === "/edit-profile"
                      ? "bg-primary"
                      : "bg-white"
                  }`}
                >
                  <BsGear
                    className={`fs-3 ${
                      location.pathname === "/profile-settings" ||
                      location.pathname === "/edit-profile"
                        ? "text-white"
                        : "text-dark"
                    }`}
                  />
                </div>
              </Link>
            </li>

            <li className="nav-item cursor-pointer">
              <div
                onClick={() => displayLogoutAlert()}
                className={`d-block py-3 border-bottom`}
              >
                <BsArrowBarRight className={`fs-3 text-danger`} />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-start bg-light"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header mt-5">
          <div className="mt-3">
            <div className="block">
              <ProfileImageMd
                imgSrc={loggedinUserDetails.profile_image_path}
                linkUrl={"/profile-settings"}
              />
            </div>
            <h6>
              {loggedinUserDetails.first_name} {loggedinUserDetails.last_name}
            </h6>
          </div>
        </div>
        <div className="offcanvas-body">
          <div className="d-block mb-3">
            <Link to="/search">
              <div
                className={`d-flex align-items-center rounded p-2 ${
                  location.pathname === "/search" ? "bg-primary" : "bg-white"
                }`}
              >
                <BsSearch
                  className={`fs-4 ${
                    location.pathname === "/search" ? "text-white" : "text-dark"
                  }`}
                />
                <div className="ms-4">
                  <span
                    className={`fs-6 ${
                      location.pathname === "/search"
                        ? "text-white"
                        : "text-dark"
                    }`}
                  >
                    Search
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="d-block my-3">
            {user_primary_role === "1" || user_primary_role === "2" ? (
              <Link to={firmType === "1" ? "/my-team" : "/resources"}>
                <div
                  className={`d-flex align-items-center rounded p-2 ${
                    location.pathname === "/my-team" ||
                    location.pathname === "/resources" ||
                    location.pathname.includes("resources") ||
                    location.pathname.includes("my-team")
                      ? "bg-primary"
                      : "bg-white"
                  }`}
                >
                  <BsFillPersonLinesFill
                    className={`fs-4 ${
                      location.pathname === "/my-team" ||
                      location.pathname === "/resources" ||
                      location.pathname.includes("resources") ||
                      location.pathname.includes("my-team")
                        ? "text-white"
                        : "text-dark"
                    }`}
                  />
                  <div className="ms-4">
                    <span
                      className={`fs-6 ${
                        location.pathname === "/my-team" ||
                        location.pathname === "/resources" ||
                        location.pathname.includes("resources") ||
                        location.pathname.includes("my-team")
                          ? "text-white"
                          : "text-dark"
                      }`}
                    >
                      {firmType === "1" ? "My Team" : "My Resources"}
                    </span>
                  </div>
                </div>
              </Link>
            ) : null}
          </div>

          <div className="d-block my-3">
            {user_primary_role === "1" ? (
              <Link to="/resource-managers">
                <div
                  className={`d-flex align-items-center rounded p-2 ${
                    location.pathname.includes("resource-manager") ||
                    location.pathname.includes("add-resource-manager")
                      ? "bg-primary"
                      : "bg-white"
                  }`}
                >
                  <BsShield
                    className={`fs-4 ${
                      location.pathname.includes("resource-manager") ||
                      location.pathname.includes("add-resource-manager")
                        ? "text-white"
                        : "text-dark"
                    }`}
                  />
                  <div className="ms-4">
                    <span
                      className={`fs-6 ${
                        location.pathname.includes("resource-manager") ||
                        location.pathname.includes("add-resource-manager")
                          ? "text-white"
                          : "text-dark"
                      }`}
                    >
                      Resource Managers
                    </span>
                  </div>
                </div>
              </Link>
            ) : null}
          </div>

          <div className="d-block my-3">
            {user_primary_role === "2" ? (
              <Link to="/access-control">
                <div
                  className={`d-flex align-items-center rounded p-2 ${
                    location.pathname === "/access-control" ||
                    location.pathname === "/add-client"
                      ? "bg-primary"
                      : "bg-white"
                  }`}
                >
                  <BsLink45Deg
                    className={`fs-4 ${
                      location.pathname === "/access-control" ||
                      location.pathname === "/add-client"
                        ? "text-white"
                        : "text-dark"
                    }`}
                  />
                  <div className="ms-4">
                    <span
                      className={`fs-6 ${
                        location.pathname === "/access-control" ||
                        location.pathname === "/add-client"
                          ? "text-white"
                          : "text-dark"
                      }`}
                    >
                      Access Control
                    </span>
                  </div>
                </div>
              </Link>
            ) : null}
          </div>

          <div className="d-block my-3">
            {user_primary_role === "1" ||
            user_primary_role === "2" ||
            user_primary_role === "4" ? (
              <Link to="/job/latest-jobs">
                <div
                  className={`d-flex align-items-center rounded p-2 ${
                    location.pathname.includes("job")
                      ? "bg-primary"
                      : "bg-white"
                  }`}
                >
                  <BsFileText
                    className={`fs-4 ${
                      location.pathname.includes("job")
                        ? "text-white"
                        : "text-dark"
                    }`}
                  />
                  <div className="ms-4">
                    <span
                      className={`fs-6 ${
                        location.pathname.includes("job")
                          ? "text-white"
                          : "text-dark"
                      }`}
                    >
                      Job Posting
                    </span>
                  </div>
                </div>
              </Link>
            ) : null}
          </div>

          <div className="d-block my-3">
            <Link to="/profile-settings">
              <div
                className={`d-flex align-items-center rounded p-2 ${
                  location.pathname === "/profile-settings" ||
                  location.pathname === "/edit-profile"
                    ? "bg-primary"
                    : "bg-white"
                }`}
              >
                <BsGear
                  className={`fs-4 ${
                    location.pathname === "/profile-settings" ||
                    location.pathname === "/edit-profile"
                      ? "text-white"
                      : "text-dark"
                  }`}
                />
                <div className="ms-4">
                  <span
                    className={`fs-6 ${
                      location.pathname === "/profile-settings" ||
                      location.pathname === "/edit-profile"
                        ? "text-white"
                        : "text-dark"
                    }`}
                  >
                    Profile Settings
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="d-block my-3">
            <div
              className={`d-flex align-items-center rounded p-2 bg-white cursor-pointer`}
              onClick={() => displayLogoutAlert()}
            >
              <BsArrowBarRight className={`fs-4 text-dark}`} />
              <div className="ms-4">
                <span className={`fs-6 text-danger`}>Sign out</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftMenu;
