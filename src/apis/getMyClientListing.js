import axios from "axios";

//IMPORT API ROUTE URL
import { CLIENT_LISTING_ROUTE } from "./apiRoutes";

const getMyClientListing = (user_slug, filterText) => {
  var postData = new FormData();

  postData.append("user_slug", user_slug);
  postData.append("filter_text", filterText);

  return axios
    .post(CLIENT_LISTING_ROUTE, postData, {
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

export default getMyClientListing;
