import React from "react";

const JobListingResultBlock = () => {

    return (
        <div key="" className="d-block mb-3">
            <div className="card-custom">
                <div className="card-body">
                    <div className="d-block d-md-flex d-lg-flex d-xl-flex d-xxl-flex row align-items-center">
                        <div className="col-12 col-lg-3 col-xl-3 col-xxl-3 mb-3 mb-lg-0 mb-xl-0 mb-xxl-0">
                            <div className="text-info-custom">
                                Title
                            </div>
                        </div>
                        <div className="col-12 col-lg-3 col-xl-3 col-xxl-3 mb-3 mb-lg-0 mb-xl-0 mb-xxl-0">
                            <div className="d-block">
                                Creator
                            </div>
                        </div>
                        <div className="col-12 col-lg-3 col-xl-3 col-xxl-3 mb-3 mb-lg-0 mb-xl-0 mb-xxl-0">
                            <div className="d-block">
                                Icon
                            </div>
                        </div>
                        <div className="col-12 col-lg-3 col-xl-3 col-xxl-3 mb-3 mb-lg-0 mb-xl-0 mb-xxl-0">
                            Date Created
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobListingResultBlock;
