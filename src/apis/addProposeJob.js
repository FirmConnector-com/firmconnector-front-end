import axios from "axios";

//IMPORT API ROUTE URL
import { ADD_PROPOSE_JOB_ROUTE } from "./apiRoutes";

const addProposeJob = (data) => {
  var postData = new FormData();

  postData.append("u_slug", data.u_slug);
  postData.append("r_slug", data.r_slug);
  postData.append("job_id", data.job_id);

  return axios
    .post(ADD_PROPOSE_JOB_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default addProposeJob;
