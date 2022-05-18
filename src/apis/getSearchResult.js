import axios from "axios";

//IMPORT API ROUTE URL
import { GET_SEARCH_RESULT } from "./apiRoutes";

const getSearchResult = (
  keyword,
  selectedFirmList,
  selectedAvailability,
  userSlug
) => {
  var postData = new FormData();

  postData.append("keyword", keyword);
  postData.append("firmIds", selectedFirmList);
  postData.append("availability", selectedAvailability);
  postData.append("user_slug", userSlug);

  return axios
    .post(GET_SEARCH_RESULT, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default getSearchResult;
