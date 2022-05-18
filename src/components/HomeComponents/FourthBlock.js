import React from "react";
import tell_company from "../../assets/images/search_result_icon.svg";
import ButtonLg from "../Buttons/ButtonLg";

const FourthBlock = () => {
  return (
    <div className="px-4 py-5 text-center bg-white-custom container-fluid">
      <div className="px-4 py-5 text-center bg-white-custom container">
        <img
          className="d-block mx-auto mb-4"
          src={tell_company}
          alt=""
          width="150"
          height="150"
        />
        <h1 className="display-6 fw-bold">
          Search for skillsets across your whole network quickly and easily
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="mb-4 lead">
            Search for skillsets and availability within your company. Connect
            with the people you need across your network quickly and easily
          </p>
          {/* <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <ButtonLg
              className="btn-primary-custom"
              role="button"
              title="Request a Demo"
              type="button"
              to="#"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FourthBlock;
