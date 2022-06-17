import axios from "axios";

//IMPORT API ROUTE URL
import { GET_LOCATION_SEARCH_AUTO_COMPLETE } from "./apiRoutes";

const getLocationSearchAutoComplete = (keyword) => {
  var postData = new FormData();

  postData.append("keyword", keyword);

  return axios
    .post(GET_LOCATION_SEARCH_AUTO_COMPLETE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default getLocationSearchAutoComplete;
