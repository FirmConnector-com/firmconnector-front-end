import axios from "axios";

//IMPORT API ROUTE URL
import { GET_JOB_EDIT_DETAILS_ROUTE } from "./apiRoutes";

const getJobEditDetails = (user_slug, job_slug) => {
  var postData = new FormData();

  postData.append("user_slug", user_slug);
  postData.append("job_slug", job_slug);

  return axios
    .post(GET_JOB_EDIT_DETAILS_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default getJobEditDetails;
