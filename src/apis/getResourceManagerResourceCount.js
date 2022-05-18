import axios from "axios";

//IMPORT API ROUTE URL
import { RESOURCE_MANAGER_RESOURCE_MANAGER_COUNT } from "./apiRoutes";

const getResourceManagerResourceCount = (userSlug) => {
  var postData = new FormData();

  postData.append("user_slug", userSlug);

  return axios
    .post(RESOURCE_MANAGER_RESOURCE_MANAGER_COUNT, postData, {
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

export default getResourceManagerResourceCount;
