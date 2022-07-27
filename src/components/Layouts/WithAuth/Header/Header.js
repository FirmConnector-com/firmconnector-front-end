import React from "react";
import Logo from "../../../../assets/images/Company_logo.png";

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bd-navbar sticky-top">
      <nav
        className="container-xxl bd-gutter flex-wrap flex-lg-nowrap"
        aria-label="Main navigation"
      >
        <div
          className="navbar-toggler p-2"
          type="button"
          data-bs-toggle="offcanvas"
          href="#offcanvasExample"
          role="button"
          aria-controls="offcanvasExample"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="bi"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            ></path>
          </svg>

          <span className="d-none fs-6 pe-1">Firmconnector</span>
        </div>
        <a
          className="navbar-brand p-0 me-0 me-lg-2"
          href="/"
          aria-label="Firmconnector"
        >
          <div className="logo-top-sm">
            <img src={Logo} className="img-fluid" alt="Firmconnector" />
          </div>
        </a>
        <div className="d-flex d-lg-none px-4"></div>
      </nav>
    </header>
  );
};

export default Header;
