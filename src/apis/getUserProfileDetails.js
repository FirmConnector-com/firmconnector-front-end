import axios from "axios";

//IMPORT API ROUTE URL
import { USER_PROFILE_ROUTE } from "./apiRoutes";

const getUserProfileDetails = (userSlug) => {
  var postData = new FormData();

  postData.append("user_slug", userSlug);

  return axios
    .post(USER_PROFILE_ROUTE, postData, {
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

export default getUserProfileDetails;
