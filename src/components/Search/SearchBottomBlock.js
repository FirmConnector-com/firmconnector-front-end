import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import SearchResultBlock from "./SearchResultBlock";
import SearchLeftBlock from "./SearchLeftBlock";
import getSearchAutoComplete from "../../apis/getSearchAutoComplete";
import getSearchResult from "../../apis/getSearchResult";

const SearchBottomBlock = (props) => {
  const { user_slug } = props;
  const [searchText, setSearchText] = useState("");
  const [isKeywordChanging, setIsKeywordChanging] = useState(false);
  const [isAutoCompleteVisible, setIsAutoCompleteVisible] = useState(false);
  const [suggestionList, setSuggestionList] = useState(false);
  const [selectedFirmList, setSelectedFirmList] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState(false);
  const [isSearchButtonDisabled, setIsSearchButtonDisabled] = useState(true);
  const [isSearchResultAvailable, setIsSearchResultAvailable] = useState(false);

  const [searchResult, setSearchResult] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [ownFirm, setOwnFirm] = useState(false);
  const [accessFirm, setAccessFirm] = useState(false);

  useEffect(() => {
    if (searchText.trim().length > 2) {
      setIsSearchButtonDisabled(false);
    } else {
      setIsSearchButtonDisabled(true);
    }
  }, [searchText, isKeywordChanging, isAutoCompleteVisible]);

  useEffect(() => {}, [isSearching, searchResult]);

  useEffect(() => {
    if (isSearchResultAvailable) {
      getSearchByFirmChange();
    }
  }, [selectedFirmList, selectedAvailability]);

  const getSelectedFirmIds = (firmIds) => {
    setSelectedFirmList(firmIds);
  };

  const getSelectedAvailability = (availability) => {
    setSelectedAvailability(availability);
  };

  const getFirmAccess = async (ownFirm, accessFirm) => {
    await setOwnFirm(ownFirm);
    await setAccessFirm(accessFirm);
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

  const getSearchByFirmChange = () => {
    // if (searchText.trim().length > 2) {
    //   setSearchResult(false);
    //   setIsSearching(true);
    //   setIsAutoCompleteVisible(false);

    //   Promise.all([getSearchResult(searchText, selectedFirmList, user_slug)])
    //     .then(async ([data]) => {
    //       if (data?.data?.searchResult) {
    //         setIsSearching(false);
    //         setSearchResult(data?.data?.searchResult);
    //       } else {
    //         setIsSearching(false);
    //         setSearchResult(false);
    //       }
    //     })
    //     .catch((err) => {
    //       setIsSearching(false);
    //       setSearchResult(false);
    //       console.log(err);
    //     });
    // }
    setSearchResult(false);
    setIsSearching(true);
    setIsAutoCompleteVisible(false);

    Promise.all([
      getSearchResult(
        searchText,
        selectedFirmList,
        selectedAvailability,
        user_slug
      ),
    ])
      .then(async ([data]) => {
        if (data?.data?.searchResult) {
          setIsSearching(false);
          setSearchResult(data?.data?.searchResult);
        } else {
          setIsSearching(false);
          setSearchResult(false);
        }
      })
      .catch((err) => {
        setIsSearching(false);
        setSearchResult(false);
        console.log(err);
      });
  };

  const getSearch = () => {
    setSearchResult(false);
    setIsSearching(true);
    setIsAutoCompleteVisible(false);

    Promise.all([
      getSearchResult(
        searchText,
        selectedFirmList,
        selectedAvailability,
        user_slug
      ),
    ])
      .then(async ([data]) => {
        if (data?.data?.searchResult) {
          setIsSearching(false);
          setSearchResult(data?.data?.searchResult);
          await setIsSearchResultAvailable(true);
        } else {
          setIsSearching(false);
          setSearchResult(false);
          await setIsSearchResultAvailable(true);
        }
      })
      .catch((err) => {
        setIsSearching(false);
        setSearchResult(false);
        console.log(err);
      });
  };

  const displayAutoCompleteBlock = () => {
    if (isAutoCompleteVisible) {
      return (
        <div className="search-auto-complete-block col-12 mt-1 shadow-sm">
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
      <div className="d-flex">
        <div className="me-4">
          <span>{suggestionName}</span>
        </div>
        {displaySuggestionType(suggestionType)}
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
    } else if (type === "provience") {
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
          <span className="text-x-x-sm-custom text-white fw-bold">
            in {type}
          </span>
        </div>
      );
    }
  };

  const handler = (event) => {
    if (event.key === "Enter") {
      getSearch();
    }
  };

  return (
    <div className="d-block my-4">
      <div className="d-flex row mb-4 align-items-center justify-content-center">
        <div className="col-3"></div>
        <div className="col-12 col-lg-6 col-xl-6 col-xxl-6 position-relative">
          <div className="card-custom p-3">
            <div className="d-flex row">
              <div className="col-12">
                <input
                  type="text"
                  placeholder="Search for resorces/skills/role"
                  className="form-control-custom-sm-border-none text-capitalize text-info-custom rounded-pill cursor-pointer bg-light"
                  onChange={onKeyworkChange}
                  value={searchText}
                  onKeyPress={(e) => handler(e)}
                />
              </div>
              <div className="col-12 d-flex justify-content-end mt-3">
                <Button variant="primary" size="sm" onClick={() => getSearch()}>
                  Search
                </Button>
              </div>
            </div>
          </div>
          {displayAutoCompleteBlock()}
        </div>
        <div className="col-3"></div>
      </div>
      <div className="d-flex row justify-content-center mt-4 h-100">
        <div className="d-none d-lg-flex d-xl-flex d-xxl-flex col-lg-3 col-xl-3 col-xxl-3">
          <SearchLeftBlock
            user_slug={user_slug}
            getSelectedFirmIds={getSelectedFirmIds}
            getSelectedAvailability={getSelectedAvailability}
            getFirmAccess={getFirmAccess}
          />
        </div>
        <div className="col-12 col-lg-9 col-xl-9 col-xxl-9">
          <SearchResultBlock
            isSearching={isSearching}
            searchResult={searchResult}
            ownFirm={ownFirm}
            accessFirm={accessFirm}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBottomBlock;
