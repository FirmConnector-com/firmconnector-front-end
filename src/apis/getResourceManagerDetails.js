import axios from "axios";

//IMPORT API ROUTE URL
import { RESOURCE_MANAGER_DETAILS_ROUTE } from "./apiRoutes";

const getResourceManagerDetails = (resourceManagerSlug) => {
  var postData = new FormData();

  postData.append("resource_manager_slug", resourceManagerSlug);

  return axios
    .post(RESOURCE_MANAGER_DETAILS_ROUTE, postData, {
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

export default getResourceManagerDetails;
