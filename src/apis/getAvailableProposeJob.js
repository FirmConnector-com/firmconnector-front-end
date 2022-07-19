import axios from "axios";

//IMPORT API ROUTE URL
import { GET_AVAILABLE_PROPOSE_JOB_ROUTE } from "./apiRoutes";

const getAvailableProposeJob = (r_slug, userSlug) => {
  var postData = new FormData();

  postData.append("r_slug", r_slug);
  postData.append("u_slug", userSlug);

  return axios
    .post(GET_AVAILABLE_PROPOSE_JOB_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default getAvailableProposeJob;
