import axios from "axios";

//IMPORT API ROUTE URL
import { GET_ALL_FIRM_ACCESS_LIST } from "./apiRoutes";

const getFirmAccessList = (userSlug) => {
  var postData = new FormData();

  postData.append("user_slug", userSlug);

  return axios
    .post(GET_ALL_FIRM_ACCESS_LIST, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default getFirmAccessList;
