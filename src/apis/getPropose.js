import axios from "axios";

//IMPORT API ROUTE URL
import { PROPOSE_FOR_ROUTE } from "./apiRoutes";

const getPropose = (r_slug) => {
  var postData = new FormData();

  postData.append("r_slug", r_slug);

  return axios
    .post(PROPOSE_FOR_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default getPropose;
