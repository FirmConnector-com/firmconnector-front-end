import axios from "axios";

//IMPORT API ROUTE URL
import { REMOVE_JOB_ROUTE } from "./apiRoutes";

const removeJob = (data) => {
  var postData = new FormData();

  postData.append("user_slug", data.user_slug);
  postData.append("job_slug", data.job_slug);

  return axios
    .post(REMOVE_JOB_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default removeJob;
