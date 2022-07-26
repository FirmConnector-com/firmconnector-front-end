import axios from "axios";

//IMPORT API ROUTE URL
import { GET_CANDIDATE_JOB_STATUS_ROUTE } from "./apiRoutes";

const getJobCandidateStatus = () => {
  var postData = new FormData();

  return axios
    .post(GET_CANDIDATE_JOB_STATUS_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default getJobCandidateStatus;
