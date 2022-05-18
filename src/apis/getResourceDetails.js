import axios from "axios";

//IMPORT API ROUTE URL
import { RESOURCE_DETAILS_ROUTE } from "./apiRoutes";

const getResourceDetails = (resourceSlug, userSlug) => {
  var postData = new FormData();

  postData.append("user_slug", userSlug);
  postData.append("resource_slug", resourceSlug);

  return axios
    .post(RESOURCE_DETAILS_ROUTE, postData, {
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

export default getResourceDetails;
