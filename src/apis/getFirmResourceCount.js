import axios from "axios";

//IMPORT API ROUTE URL
import { FIRM_RESOURCE_COUNT } from "./apiRoutes";

const getFirmResourceCount = (userSlug) => {
  var postData = new FormData();

  postData.append("user_slug", userSlug);

  return axios
    .post(FIRM_RESOURCE_COUNT, postData, {
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

export default getFirmResourceCount;
