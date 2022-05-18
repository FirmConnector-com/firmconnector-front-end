import axios from "axios";

//IMPORT API ROUTE URL
import { SAVE_RESOURCE_AVAILABILITY } from "./apiRoutes";

const saveResourceAvailability = (data) => {
  var postData = new FormData();

  postData.append("resource_slug", data.resourceSlug);
  postData.append("availability", data.availability);

  return axios
    .post(SAVE_RESOURCE_AVAILABILITY, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export default saveResourceAvailability;
