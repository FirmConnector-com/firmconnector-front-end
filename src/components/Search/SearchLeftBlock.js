import React, { useEffect, useState } from "react";
import getFirmAccessList from "../../apis/getFirmAccessList";
import { FIRM_IMAGE_BASE } from "../../config/env";

const SearchLeftBlock = (props) => {
  const {
    user_slug,
    getSelectedFirmIds,
    getFirmAccess,
    getSelectedAvailability,
  } = props;
  const [isFirmListLoading, setIsFirmListLoading] = useState(true);
  const [firmList, setFirmList] = useState(false);
  const [selectedFirmList, setSelectedFirmList] = useState([]);
  const [availability, setAvailability] = useState(99999);
  const [ownFirm, setOwnFirm] = useState(false);
  const [accessFirm, setAccessFirm] = useState([]);

  useEffect(() => {
    getSelectedFirmIds(selectedFirmList);
  }, [selectedFirmList]);

  useEffect(() => {
    if (availability) {
      getSelectedAvailability(availability);
    }
  }, [availability]);

  useEffect(() => {
    getFirmAccess(ownFirm, accessFirm);
  }, [accessFirm, ownFirm]);

  useEffect(() => {
    if (user_slug !== undefined) {
      Promise.all([getFirmAccessList(user_slug)])
        .then(async ([data]) => {
          if (data?.data?.firmList) {
            setIsFirmListLoading(false);
            setFirmList(data.data.firmList);
            setOwnFirm(data.data.ownFirm);
            setAccessFirm(data.data.accessFirm);

            var firmCheckedIds = [];

            data.data.firmList.map((item) => {
              return firmCheckedIds.push(item.firm_id);
            });

            await setSelectedFirmList(firmCheckedIds);
          } else {
            setIsFirmListLoading(false);
          }
        })
        .catch((err) => {
          setIsFirmListLoading(false);
          console.log(err);
        });
    }
  }, [user_slug]);

  const updateSelectedFirmIds = (id) => {
    var ids = [...selectedFirmList];

    const index = selectedFirmList.indexOf(id);

    if (index > -1) {
      ids.pop(index);
    } else {
      ids.push(id);
    }

    setSelectedFirmList(ids);
  };

  const displayLoadingBlock = () => {
    return (
      <div>
        <span>Loading related firm list</span>
      </div>
    );
  };

  const displayFirmList = () => {
    if (firmList) {
      return (
        <>
          {firmList.map(function (item, index) {
            return (
              <div key={item.firm_id} className="my-2 d-block">
                <div className="form-check mt-1 d-flex align-items-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={item.firm_id}
                    checked={
                      selectedFirmList.indexOf(item.firm_id) !== -1
                        ? true
                        : false
                    }
                    onChange={() => updateSelectedFirmIds(item.firm_id)}
                    id={"firm-id-" + item.firm_id}
                  />
                  <div
                    className="firm-logo-sm-custom ms-2"
                    alt={item.firm_name}
                    style={{
                      backgroundImage: `url("${
                        FIRM_IMAGE_BASE + item.firm_logo
                      }")`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {/* <img src={FIRM_IMAGE_BASE + item.firm_logo} alt="..." /> */}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      );
    }
  };

  const displayRelatedFirms = () => {
    if (isFirmListLoading) {
      return displayLoadingBlock();
    } else {
      return displayFirmList();
    }
  };

  return (
    <div className="d-flex flex-column col-12">
      <div className="card-custom">
        <div className="card-body">
          <div className="d-block mb-3">
            <span className="text-sm-custom text-blue-dark-custom fw-medium-custom">
              Refine by Firms
            </span>
          </div>
          <div>{displayRelatedFirms()}</div>
        </div>
      </div>

      <div className="card-custom mt-2">
        <div className="card-body">
          <div className="d-block mb-3">
            <span className="text-sm-custom text-blue-dark-custom fw-medium-custom">
              Current Availability
            </span>
          </div>
          <div className="d-block">
            <div
              className="form-check"
              onClick={() => {
                setAvailability(40);
              }}
            >
              <input
                className="form-check-input"
                type="radio"
                value="40"
                id="fourtyhoursweek"
                name="availability"
                checked={availability === 40}
              />
              <label className="form-check-label" for="fourtyhoursweek">
                <span className="fw-bold">40 hrs/week</span>
              </label>
            </div>
            <div
              className="form-check"
              onClick={() => {
                setAvailability(30);
              }}
            >
              <input
                className="form-check-input"
                type="radio"
                value="30"
                id="thirtyhoursweek"
                name="availability"
                checked={availability === 30}
              />
              <label className="form-check-label" for="thirtyhoursweek">
                <span className="fw-bold">30 hrs/week</span>
              </label>
            </div>
            <div
              className="form-check"
              onClick={() => {
                setAvailability(20);
              }}
            >
              <input
                className="form-check-input"
                type="radio"
                value="20"
                id="twentyhoursweek"
                name="availability"
                checked={availability === 20}
              />
              <label className="form-check-label" for="twentyhoursweek">
                <span className="fw-bold">20 hrs/week</span>
              </label>
            </div>
            <div
              className="form-check"
              onClick={() => {
                setAvailability(10);
              }}
            >
              <input
                className="form-check-input"
                type="radio"
                value="10"
                id="tenhoursweek"
                name="availability"
                checked={availability === 10}
              />
              <label className="form-check-label" for="tenhoursweek">
                <span className="fw-bold">10 hrs/week</span>
              </label>
            </div>
            <div
              className="form-check"
              onClick={() => {
                setAvailability(99999);
              }}
            >
              <input
                className="form-check-input"
                type="radio"
                value="0"
                id="zerohoursweek"
                name="availability"
                checked={availability === 99999}
              />
              <label className="form-check-label" for="zerohoursweek">
                <span className="fw-bold">N/A</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchLeftBlock;
