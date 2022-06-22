import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Button } from "react-bootstrap";
import LoadingPageSm from "../CommonComponent/LoadingPageSm";
import { FIRM_IMAGE_BASE } from "../../config/env";
import getSearchAutoComplete from "../../apis/getSearchAutoComplete";
import getLocationSearchAutoComplete from "../../apis/getLocationSearchAutoComplete";

import getSearchResult from "../../apis/getSearchResult";
import { PieChart } from "react-minimal-pie-chart";
import { Link } from "react-router-dom";
import ProfileImageMd from "../CommonComponent/ProfileImageMd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import user from "../../assets/images/no-photo.png";
import {
  faMapPin,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const SearchBlock = () => {
  const { userDetails } = useAuthContext();
  const user_slug = JSON.parse(userDetails).user_slug;

  const [isSearching, setIsSearching] = useState(false);
  const [hasNoInitialResult, setHasNoInitialResult] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [isKeywordChanging, setIsKeywordChanging] = useState(false);
  const [isAutoCompleteVisible, setIsAutoCompleteVisible] = useState(false);
  const [suggestionList, setSuggestionList] = useState(false);

  const [searchResult, setSearchResult] = useState(false);
  const [selectedAvailability, setSelectedAvailability] = useState(99999);

  const [searchLocationText, setSearchLocationText] = useState("");
  const [isLocationKeywordChanging, setIsLocationKeywordChanging] =
    useState(false);
  const [isLocationAutoCompleteVisible, setIsLocationAutoCompleteVisible] =
    useState(false);
  const [suggestionLocationList, setSuggestionLocationList] = useState(false);
  const [ownFirm, setOwnFirm] = useState(0);

  const onKeyworkLocationChange = (e) => {
    let keyword = e.target.value;

    if (keyword.trim().length > 0) {
      if (keyword.trim().length > 0) {
        setIsLocationKeywordChanging(true);
        setIsLocationAutoCompleteVisible(true);
        setSearchLocationText(keyword);

        getLocationAutoCompleteResult(keyword);
      } else {
        setSearchLocationText(keyword);
        setIsLocationKeywordChanging(false);
        setIsLocationAutoCompleteVisible(false);
      }
    } else {
      setIsLocationKeywordChanging(false);
      setIsLocationAutoCompleteVisible(false);
      setSearchLocationText("");
    }
  };

  const getLocationAutoCompleteResult = (keyword) => {
    Promise.all([getLocationSearchAutoComplete(keyword)])
      .then(async ([data]) => {
        if (data?.data?.suggestionList) {
          setSuggestionLocationList(data?.data?.suggestionList);
          setIsLocationKeywordChanging(false);
        } else {
          setIsLocationKeywordChanging(false);
          setSuggestionLocationList(false);
          setIsLocationAutoCompleteVisible(false);
        }
      })
      .catch((err) => {
        setIsLocationKeywordChanging(false);
        setSuggestionLocationList(false);
        setIsLocationAutoCompleteVisible(false);
        console.log(err);
      });
  };

  const onKeyworkChange = (e) => {
    let keyword = e.target.value;

    if (keyword.trim().length > 0) {
      if (keyword.trim().length > 0) {
        setIsKeywordChanging(true);
        setIsAutoCompleteVisible(true);
        setSearchText(keyword);

        getAutoCompleteResult(keyword);
      } else {
        setSearchText(keyword);
        setIsKeywordChanging(false);
        setIsAutoCompleteVisible(false);
      }
    } else {
      setIsKeywordChanging(false);
      setIsAutoCompleteVisible(false);
      setSearchText("");
    }
  };

  const getAutoCompleteResult = (keyword) => {
    Promise.all([getSearchAutoComplete(keyword)])
      .then(async ([data]) => {
        if (data?.data?.suggestionList) {
          setSuggestionList(data?.data?.suggestionList);
          setIsKeywordChanging(false);
        } else {
          setIsKeywordChanging(false);
          setSuggestionList(false);
          setIsAutoCompleteVisible(false);
        }
      })
      .catch((err) => {
        setIsKeywordChanging(false);
        setSuggestionList(false);
        setIsAutoCompleteVisible(false);
        console.log(err);
      });
  };

  const handler = (event) => {
    if (event.key === "Enter") {
      getSearch();
    }
  };

  useEffect(() => {}, [ownFirm]);

  const getSearch = () => {
    setSearchResult(false);
    setIsSearching(true);
    setIsAutoCompleteVisible(false);

    Promise.all([
      getSearchResult(
        searchText,
        searchLocationText,
        selectedAvailability,
        user_slug
      ),
    ])
      .then(async ([data]) => {
        if (data?.data?.searchResult) {
          setIsSearching(false);
          setSearchResult(data?.data?.searchResult);
          setHasNoInitialResult(false);
          await setOwnFirm(data?.data?.own_firm);
        } else {
          setIsSearching(false);
          setSearchResult(false);
          setHasNoInitialResult(false);
        }
      })
      .catch((err) => {
        setIsSearching(false);
        setSearchResult(false);
      });
  };

  const handleAvailabilityChange = (e) => {
    setSelectedAvailability(e.target.value);
  };

  const searchTopBlock = () => {
    return (
      <div className="d-block bg-dark-custom rounded p-3 mb-5 rounded position-relative shadow-lg">
        <h4 className="text-light">
          Search Resources / Skills / Roles / Locations
        </h4>
        <div className="d-block mt-4 mb-2">
          <div className="row d-flex justify-content-between m-0">
            <div className="col-12 col-lg-6 col-xl-6 col-xxl-6 d-flex align-items-center p-0 mb-2 mb-lg-0 mb-xl-0 mb-xxl-0 rounded">
              <input
                type="text"
                name="name"
                placeholder="Search for resources"
                className="w-100 input-without-outline rounded p-2"
                autoComplete="off"
                onChange={onKeyworkChange}
                value={searchText}
                onKeyPress={(e) => handler(e)}
              />
              {displayAutoCompleteBlock()}
            </div>
            <div className="col-12 col-lg-3 col-xl-3 col-xxl-3 d-flex align-items-center p-0 mb-2 mb-lg-0 mb-xl-0 mb-xxl-0 rounded">
              <input
                type="text"
                name="name"
                placeholder="Seach for location"
                className="w-100 input-without-outline rounded p-2"
                autoComplete="off"
                onChange={onKeyworkLocationChange}
                value={searchLocationText}
                onKeyPress={(e) => handler(e)}
              />
              {displayLocationAutoCompleteBlock()}
            </div>
            <div className="col-12 col-lg-2 col-xl-2 col-xxl-2 d-flex align-items-center p-0 mb-2 mb-lg-0 mb-xl-0 mb-xxl-0">
              <select
                className="form-select col-12 col-lg-2 col-xl-2 col-xxl-2"
                aria-label="Current Availability"
                onChange={handleAvailabilityChange}
              >
                <option selected>Current Availability</option>
                <option value="40">40 hrs/week</option>
                <option value="30">30 hrs/week</option>
                <option value="20">20 hrs/week</option>
                <option value="10">10 hrs/week</option>
                <option value="0">N/A</option>
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <Button variant="warning" size="md" onClick={() => getSearch()}>
              Search Resources
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const displayLocationAutoCompleteBlock = () => {
    if (isLocationAutoCompleteVisible) {
      return (
        <div className="search-location-auto-complete-block col-12 col-lg-3 col-xl-3 col-xxl-3 shadow-sm">
          {autoLocationCompleteBlock()}
        </div>
      );
    }
  };

  const autoLocationCompleteBlock = () => {
    if (isLocationKeywordChanging) {
      return (
        <div className="d-flex justify-content-center align-items-center">
          <span>Loading suggestions</span>
        </div>
      );
    } else {
      return displayLocationAutoCompleteResult();
    }
  };

  const displayLocationAutoCompleteResult = () => {
    if (suggestionLocationList) {
      return (
        <>
          {suggestionLocationList.map(function (item, index) {
            return (
              <div
                className="d-block p-2 bg-light mb-1 cursor-pointer"
                key={index.toString()}
                onClick={() =>
                  updateLocationSearchText(formatSuggestionName(item.name))
                }
              >
                {formatSuggestionList(item.name)}
              </div>
            );
          })}
        </>
      );
    }
  };

  const updateLocationSearchText = (text) => {
    setIsLocationKeywordChanging(false);
    setSuggestionLocationList(false);
    setIsLocationAutoCompleteVisible(false);
    setSearchLocationText(text);
  };

  const displayAutoCompleteBlock = () => {
    if (isAutoCompleteVisible) {
      return (
        <div className="search-auto-complete-block col-12 col-lg-3 col-xl-3 col-xxl-3 shadow-sm">
          {autoCompleteBlock()}
        </div>
      );
    }
  };

  const autoCompleteBlock = () => {
    if (isKeywordChanging) {
      return (
        <div className="d-flex justify-content-center align-items-center">
          <span>Loading suggestions</span>
        </div>
      );
    } else {
      return displayAutoCompleteResult();
    }
  };

  const updateSearchText = (text) => {
    setIsKeywordChanging(false);
    setSuggestionList(false);
    setIsAutoCompleteVisible(false);
    setSearchText(text);
  };

  const displayAutoCompleteResult = () => {
    if (suggestionList) {
      return (
        <>
          {suggestionList.map(function (item, index) {
            return (
              <div
                className="d-block p-2 bg-light mb-1 cursor-pointer"
                key={index.toString()}
                onClick={() =>
                  updateSearchText(formatSuggestionName(item.name))
                }
              >
                {formatSuggestionList(item.name)}
              </div>
            );
          })}
        </>
      );
    }
  };

  const formatSuggestionName = (name) => {
    let formattedString = name.split("||");

    let suggestionName = formattedString[0];

    return suggestionName;
  };

  const formatSuggestionList = (name) => {
    let formattedString = name.split("||");

    let suggestionName = formattedString[0];
    let suggestionType = formattedString[1];

    return (
      <div className="row">
        <div className="col-8">
          <span>{suggestionName}</span>
        </div>
        <div className="col-4">{displaySuggestionType(suggestionType)}</div>
      </div>
    );
  };

  const displaySuggestionType = (type) => {
    if (type === "city") {
      return (
        <div className="badge rounded-pill bg-primary d-flex justify-content-center align-items-center">
          <span className="text-x-x-sm-custom text-white fw-bold">
            in {type}
          </span>
        </div>
      );
    } else if (type === "province") {
      return (
        <div className="badge rounded-pill bg-secondary d-flex justify-content-center align-items-center">
          <span className="text-x-x-sm-custom text-white fw-bold">
            in {type}
          </span>
        </div>
      );
    } else if (type === "country") {
      return (
        <div className="badge rounded-pill bg-warning d-flex justify-content-center align-items-center">
          <span className="text-x-x-sm-custom text-white fw-bold">
            in {type}
          </span>
        </div>
      );
    } else if (type === "skill") {
      return (
        <div className="badge rounded-pill bg-success d-flex justify-content-center align-items-center">
          <span className="text-x-x-sm-custom text-white fw-bold">
            in {type}
          </span>
        </div>
      );
    } else if (type === "job role") {
      return (
        <div className="badge rounded-pill bg-success d-flex justify-content-center align-items-center">
          <span className="text-x-x-sm-custom text-white fw-bold">in role</span>
        </div>
      );
    }
  };

  const searchResultBlock = () => {
    return <div className="d-block my-3">{displaySearchContent()}</div>;
  };

  const displaySearchContent = () => {
    if (isSearching) {
      return <LoadingPageSm title={"Loading search results..."} />;
    } else {
      return displaySearchItems();
    }
  };

  const displaySearchItems = () => {
    if (hasNoInitialResult) {
      return null;
    } else {
      return displaySearch();
    }
  };

  const displaySearch = () => {
    if (searchResult) {
      return (
        <>
          {searchResult.map((item, index) => {
            return (
              <Link to={"resources/details/" + item.user_slug}>
                <div key={index.toString()} className="card-custom p-3 mb-3">
                  <div className="card-body-custom">
                    <div className="d-flex row mb-4">
                      <div className="col-12 col-lg-1 col-xl-1 col-xxl-1">
                        {displayProfilePicture(item)}
                      </div>
                      <div className="col-12 col-lg-4 col-xl-4 col-xxl-4">
                        <div className="d-block">
                          {displayProfileName(item)}
                          {displayJobRole(item.user_profile_role)}
                          <div className="d-block mt-3">
                            {displayFirm(item.firm_logo)}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-4 col-xl-4 col-xxl-4 d-flex flex-column my-2 my-lg-0 my-xl-0 my-xxl-0">
                        {checkContactBlockDisplay(item)}
                      </div>
                      <div className="col-12 col-lg-3 col-xl-3 col-xxl-3 d-flex flex-column my-2 my-lg-0 my-xl-0 my-xxl-0 justify-content-center align-items-xxl-end align-items-lg-end align-items-xl-end">
                        {displayAvailability(item.availability)}
                      </div>
                    </div>

                    {displaySkills(item.skill_name)}
                  </div>
                </div>
              </Link>
            );
          })}
        </>
      );
    } else {
      return (
        <div
          className="alert m-0 d-flex flex-column align-items-center justify-content-center"
          role="alert"
        >
          <div className="d-block">
            <span className="fw-bold display-6">Oops,</span>
          </div>
          <div className="d-block">
            <span className="lead text-dark-custom">
              No search result found. Please try with some different keyword.
            </span>
          </div>
        </div>
      );
    }
  };

  const displayJobRole = (role) => {
    if (role !== null && role.trim().length !== 0) {
      return (
        <div className="d-block">
          <span className="text-info-custom text-sm-custom fw-medium-custom">
            {role}
          </span>
        </div>
      );
    }
  };

  const displayProfilePicture = (item) => {
    if (ownFirm !== "" && ownFirm !== undefined) {
      if (ownFirm === item.firm_id) {
        return (
          <div className="d-block">
            <ProfileImageMd imgSrc={item.profile_image_path} />
          </div>
        );
      } else {
        return (
          <div className="profile-image-md">
            <img className="img-fluid" src={user} alt="" />
          </div>
        );
      }
    }
  };

  const displayProfileName = (item) => {
    if (ownFirm !== "" && ownFirm !== undefined) {
      if (ownFirm === item.firm_id) {
        return (
          <div className="d-block">
            <span className="h5 text-dark fw-bold-custom">
              {item.resource_name}
            </span>
          </div>
        );
      } else {
        return (
          <div className="d-block">
            <span className="h5 text-secondary fw-bold-custom">
              Name Withheld
            </span>
          </div>
        );
      }
    } else {
      return (
        <div className="d-block">
          <span className="h5 text-secondary fw-bold-custom">
            Name Withheld
          </span>
        </div>
      );
    }
  };

  const checkContactBlockDisplay = (item) => {
    if (ownFirm !== "" && ownFirm !== undefined) {
      if (ownFirm === item.firm_id) {
        return (
          <div className="d-block bg-light p-2 rounded">
            {displayEmail(item)}
            {displayPhone(item)}
            {displayLocation(item)}
          </div>
        );
      }
    }
  };

  const displayLocation = (item) => {
    if (ownFirm !== "" && ownFirm !== undefined) {
      if (ownFirm === item.firm_id) {
        return (
          <div className="d-flex align-items-center">
            <span className="text-info-custom me-3">
              <FontAwesomeIcon icon={faMapPin} />
            </span>
            <span className="text-sm-custom text-dark-custom">
              {item.city_name}, {item.state_name}, {item.country_name}
            </span>
          </div>
        );
      }
    }
  };

  const displayEmail = (item) => {
    if (ownFirm !== "" && ownFirm !== undefined) {
      if (ownFirm === item.firm_id) {
        return (
          <div className="d-flex align-items-center">
            <span className="text-info-custom me-2">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <span className="text-sm-custom text-dark-custom">
              {item.user_email}
            </span>
          </div>
        );
      }
    }
  };

  const displayPhone = (item) => {
    if (ownFirm !== "" && ownFirm !== undefined) {
      if (ownFirm === item.firm_id) {
        return (
          <div className="d-flex align-items-center">
            <span className="text-info-custom me-2">
              <FontAwesomeIcon icon={faPhone} />
            </span>
            <span className="text-sm-custom text-dark-custom">
              {item.user_phone}
            </span>
          </div>
        );
      }
    }
  };

  const displayAvailability = (availability) => {
    return (
      <>
        {displayAvailabilityGraph(availability)}
        <div className="d-block">
          <span className="text-x-x-sm-custom fw-medium-custom text-dark-custom">
            {availability} hrs/week
          </span>
        </div>
      </>
    );
  };

  const displaySkills = (skills) => {
    if (skills) {
      if (skills.length > 0 && skills !== null) {
        const skillArray = skills.split(",");
        const skillLength = skillArray.length;

        if (skillLength > 10) {
          const remainingSkills = skillLength - 10;
          const skillFormatted = skillArray.slice(0, 10);

          return (
            <div className="d-block mt-2">
              <div className="d-flex flex-wrap">
                {skillFormatted.map((skillItem, skillIndex) => {
                  return (
                    <div className="skill-wrapper-dark my-1 me-2 roundedshadow">
                      <span
                        className="text-x-sm-custom text-capitalize"
                        key={skillIndex.toString()}
                      >
                        {skillItem}
                      </span>
                    </div>
                  );
                })}
                <span className=" my-2 me-1 text-sm-custom text-info-custom">
                  +{remainingSkills} more skills
                </span>
              </div>
            </div>
          );
        } else {
          return (
            <>
              {skillArray.map((skillItem, skillIndex) => {
                return (
                  <div className="skill-wrapper-muted my-1 me-1">
                    <span
                      className="text-sm-custom text-dark fw-medium-custom"
                      key={skillIndex.toString()}
                    >
                      {skillItem}
                    </span>
                  </div>
                );
              })}
            </>
          );
        }
      } else {
        return (
          <span className="text-x-sm-custom text-danger-custom">
            No skills available!
          </span>
        );
      }
    }
  };

  const displayAvailabilityGraph = (availability) => {
    if (availability !== null) {
      availability = parseInt(availability);

      var color = "#DC143C";

      if (availability < 20) {
        color = "#DC143C";
      } else if (availability === 20 || availability === 30) {
        color = "#FFBF00";
      } else {
        color = "#32CD32";
      }

      return (
        <div className="chart-box-md">
          <PieChart
            animate={true}
            animationDuration={500}
            animationEasing="ease-out"
            center={[25, 25]}
            totalValue={40}
            data={[
              {
                color: color,
                value: availability,
              },
            ]}
            labelPosition={25}
            lengthAngle={360}
            lineWidth={30}
            paddingAngle={0}
            radius={25}
            startAngle={90}
            viewBoxSize={[50, 50]}
            background={"#ccc"}
          />
        </div>
      );
    } else {
      availability = 0;

      return (
        <div className="chart-box-md">
          <PieChart
            animate={true}
            animationDuration={500}
            animationEasing="ease-out"
            center={[50, 50]}
            totalValue={40}
            data={[
              {
                color: color,
                value: availability,
              },
            ]}
            labelPosition={50}
            lengthAngle={360}
            lineWidth={30}
            paddingAngle={0}
            radius={50}
            startAngle={0}
            viewBoxSize={[50, 50]}
            background={"#ccc"}
          />
        </div>
      );
    }
  };

  const displayFirm = (logo_path) => {
    return (
      <div
        className="firm-logo-sm-custom"
        style={{
          backgroundImage: `url("${FIRM_IMAGE_BASE + logo_path}")`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    );
  };

  return (
    <div className="container">
      {searchTopBlock()}
      {searchResultBlock()}
    </div>
  );
};

export default SearchBlock;
