import axios from "axios";

//IMPORT API ROUTE URL
import { GET_JOB_DETAILS_ROUTE } from "./apiRoutes";

const getJobDetails = (job_slug) => {
  var postData = new FormData();

  postData.append("job_slug", job_slug);

  return axios
    .post(GET_JOB_DETAILS_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default getJobDetails;
