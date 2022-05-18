import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Logo from "../../../../assets/images/Company_logo.png";
import HeaderTopUserBlock from "../../../UserCommonBlocks/HeaderTopUserBlock";
import { useAuthContext } from "../../../../context/AuthContext";

const TopNav = () => {
  const { isLoggedIn, userDetails } = useAuthContext();

  const checkIsLoggedInContent = () => {
    if (isLoggedIn === true) {
      return (
        <div className="d-flex">
          <HeaderTopUserBlock userDetails={userDetails} length={20} />
        </div>
      );
    } else {
      return (
        <div className="d-flex bd-buttons">
          <Link to="/sign-in">
            <Button variant="primary" size="sm">
              {"Account Login"}
            </Button>
          </Link>
          {/* 
          <Link to="/sign-up">
            <Button variant="primary" size="sm" className="ms-3">
              {"Create Account"}
            </Button>
          </Link> */}
        </div>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top bd-navbar">
      <div className="container">
        <div className="d-flex">
          <Link to="/">
            <div className="logo-top">
              <img src={Logo} className="h-100 w-100" alt="Firmconnector" />
            </div>
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mx-auto mb-2 mb-md-0 justify-content-center">
            <li className="nav-item">
              <Link className={"nav-link"} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={"nav-link"} to="about-us">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className={"nav-link"} to="contact-us">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className={"nav-link"} to="privacy-policy">
                Privacy Policy
              </Link>
            </li>
          </ul>
          {checkIsLoggedInContent()}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
