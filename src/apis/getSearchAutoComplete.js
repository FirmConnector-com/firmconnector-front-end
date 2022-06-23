import axios from "axios";

//IMPORT API ROUTE URL
import { GET_SEARCH_AUTO_COMPLETE } from "./apiRoutes";

const getSearchAutoComplete = (keyword, userSlug) => {
  var postData = new FormData();

  postData.append("keyword", keyword);
  postData.append("user_slug", userSlug);

  return axios
    .post(GET_SEARCH_AUTO_COMPLETE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default getSearchAutoComplete;
