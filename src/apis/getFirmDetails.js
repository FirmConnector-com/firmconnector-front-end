import axios from "axios";

//IMPORT API ROUTE URL
import { USER_FIRM_DETAILS_ROUTE } from "./apiRoutes";

const getFirmDetails = (userSlug) => {
  var postData = new FormData();

  postData.append("user_slug", userSlug);

  return axios
    .post(USER_FIRM_DETAILS_ROUTE, postData, {
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

export default getFirmDetails;
