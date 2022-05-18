import React, { useState } from "react";

import enterprise_companies from "../../assets/images/enterprise_companies.svg";
import professional_services_firms from "../../assets/images/professional_services_firms.svg";
import staffing_firms from "../../assets/images/staffing_firms.svg";
import ReactPlayer from "react-player/youtube";
import Button from "react-bootstrap/Button";

const SelectOrganizationComponent = () => {
  const [displayBlock, setDisplayBlock] = useState(1);

  const changeBlockView = (val) => {
    setDisplayBlock(val);
  };

  return (
    <div className="album py-5">
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="display-6 fw-bold">Select your organization type</h1>
          <p className="lead">And discover how FirmConnector can help you</p>
        </div>
      </section>

      <div className="album pt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-2">
              <div className="card text-white bg-danger-logo-custom rounded-5 shadow-lg">
                <div className="card-image-custom-holder p-5">
                  <img
                    src={enterprise_companies}
                    className="img-fluid"
                    alt="..."
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">Small and Medium Enterprises</h5>
                  <p className="card-text">
                    Find expertise across your network
                  </p>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => changeBlockView(1)}
                  >
                    Learn more
                  </Button>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-2">
              <div className="card text-white bg-warning-logo-custom rounded-5 shadow-lg">
                <div className="card-image-custom-holder p-5">
                  <img
                    src={professional_services_firms}
                    className="img-fluid"
                    alt="..."
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">Professional Services Firms</h5>
                  <p className="card-text">
                    Improve the utilization of your team
                  </p>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => changeBlockView(2)}
                  >
                    Learn more
                  </Button>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-2">
              <div className="card text-white bg-blue-logo-custom rounded-5 shadow-lg">
                <div className="card-image-custom-holder p-5">
                  <img src={staffing_firms} className="img-fluid" alt="..." />
                </div>
                <div className="card-body">
                  <h5 className="card-title">Staffing Firms</h5>
                  <p className="card-text">Place more candidates</p>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => changeBlockView(3)}
                  >
                    Learn more
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-block my-5">
        <div
          className={`container ${displayBlock === 1 ? "d-block" : "d-none"}`}
        >
          <div className="row">
            <div className="col-12 col-lg-6 col-xl-6 col-xxl-6">
              <ReactPlayer
                url="https://youtu.be/TlifFpxYnrQ"
                width="100%"
                stopOnUnmount={true}
                controls={false}
                playing={displayBlock === 1}
              />
            </div>
            <div className="col-12 col-lg-6 col-xl-6 col-xxl-6">
              <h5 className="display-6">Gain easy access to specialists</h5>
              <div className="my-4">
                <span>
                  Staffing needs can change quickly when a new project lands or
                  a position needs to be filled. Perhaps you're already working
                  on a project, and need to identify a specialist to bounce
                  ideas off of.
                </span>
              </div>
              <div className="my-4">
                <span>
                  FirmConnector allows you to quickly and easily access the
                  right people with the right skills for the job.
                </span>
              </div>
              <h5 className="display-6">Fast. Easy. And…</h5>
              <div className="my-4">
                <span>
                  Best of all, you will ensure you are fully utilizing your own
                  workforce before turning to outside sources.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`container ${displayBlock === 2 ? "d-block" : "d-none"}`}
        >
          <div className="row">
            <div className="col-12 col-lg-6 col-xl-6 col-xxl-6">
              <ReactPlayer
                url="https://youtu.be/ROfdeyQ3AFg"
                width="100%"
                stopOnUnmount={true}
                playing={displayBlock === 2}
                autoPlay={false}
              />
            </div>
            <div className="col-12 col-lg-6 col-xl-6 col-xxl-6">
              <h5 className="display-6">Better leverage your specialists</h5>
              <div className="my-4">
                <span>
                  Resourcing needs can change rapidly when a new project lands
                  or a position needs to be filled. FirmConnector allows you to
                  quickly and easily access the right people with the right
                  skills for the job.
                </span>
              </div>
              <h5 className="display-6">
                Improve the utilization of your team
              </h5>
              <div className="my-4">
                <span>
                  Until now, smaller engagements just haven't been worth the
                  sales efforts to find and close. With FirmConnector, you can
                  increase revenue by easily marketing your specialists directly
                  to your clients.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`container ${displayBlock === 3 ? "d-block" : "d-none"}`}
        >
          <div className="row">
            <div className="col-12 col-lg-6 col-xl-6 col-xxl-6">
              <ReactPlayer
                url="https://youtu.be/X-yGkmDWY8Y"
                width="100%"
                stopOnUnmount={true}
                playing={displayBlock === 3}
              />
            </div>
            <div className="col-12 col-lg-6 col-xl-6 col-xxl-6">
              <h5 className="display-6">
                Open up new opportunities for candidate placements
              </h5>
              <div className="my-4">
                <span>
                  Your clients have more options than ever in finding and
                  obtaining talent. Stay relevant with a fresh, new approach to
                  showcasing your talented candidates.
                </span>
              </div>
              <div>
                <span>
                  FirmConnector helps you proactively place available candidates
                  quickly and accurately.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectOrganizationComponent;
