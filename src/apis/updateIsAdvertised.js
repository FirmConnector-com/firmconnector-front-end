import axios from "axios";

//IMPORT API ROUTE URL
import { UPDATE_IS_ADVERTISED } from "./apiRoutes";

const updateIsAdvertised = (userSlug, advertised, resourceSlug) => {
  var postData = new FormData();

  postData.append("user_slug", userSlug);
  postData.append("is_advertised", parseInt(advertised));
  postData.append("resource_slug", resourceSlug);

  return axios
    .post(UPDATE_IS_ADVERTISED, postData, {
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

export default updateIsAdvertised;
