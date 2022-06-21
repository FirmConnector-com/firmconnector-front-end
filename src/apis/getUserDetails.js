import axios from "axios";

//IMPORT API ROUTE URL
import { GET_USER_DETAILS_ROUTE } from "./apiRoutes";

const getUserDetails = (user_slug) => {
  var postData = new FormData();

  postData.append("user_slug", user_slug);

  return axios
    .post(GET_USER_DETAILS_ROUTE, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default getUserDetails;
