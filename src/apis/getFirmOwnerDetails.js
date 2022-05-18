import axios from "axios";

//IMPORT API ROUTE URL
import { FIRM_OWNER_DETAILS_ROUTE } from "./apiRoutes";

const getFirmOwnerDetails = (userSlug) => {
  var postData = new FormData();

  postData.append("user_slug", userSlug);

  return axios
    .post(FIRM_OWNER_DETAILS_ROUTE, postData, {
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

export default getFirmOwnerDetails;
