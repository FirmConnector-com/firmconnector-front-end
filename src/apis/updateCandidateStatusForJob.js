import axios from "axios";

//IMPORT API ROUTE URL
import { UPDATE_CANDIDATE_STATUS_FOR_JOB_ROUTE } from "./apiRoutes";

const updateCandidateStatusForJob = (data) => {
  var postData = new FormData();

  postData.append("user_slug", data.user_slug);
  postData.append("id", data.id);
  postData.append("status", data.status);
  postData.append("note", data.note);

  return axios
    .post(UPDATE_CANDIDATE_STATUS_FOR_JOB_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default updateCandidateStatusForJob;
