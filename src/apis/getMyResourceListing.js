import axios from "axios";

//IMPORT API ROUTE URL
import { GET_MY_RESOURCE_LISTING } from "./apiRoutes";

const getMyResourceListing = (userSlug, filterText) => {
  var postData = new FormData();

  postData.append("user_slug", userSlug);
  postData.append("filter_text", filterText);

  return axios
    .post(GET_MY_RESOURCE_LISTING, postData, {
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

export default getMyResourceListing;
