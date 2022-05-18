import axios from "axios";

//IMPORT API ROUTE URL
import { CHECK_RESOURCE_EDIT_ACCESS } from "./apiRoutes";

const checkResourceEditAccess = (userSlug, resourceId) => {
  var postData = new FormData();

  postData.append("user_slug", userSlug);
  postData.append("resource_slug", resourceId);

  return axios
    .post(CHECK_RESOURCE_EDIT_ACCESS, postData, {
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

export default checkResourceEditAccess;
