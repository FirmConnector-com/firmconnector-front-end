import axios from "axios";

//IMPORT API ROUTE URL
import { GET_CANDIDATE_JOB_NOTE_ROUTE } from "./apiRoutes";

const getCandidateJobNotes = (r_slug, jobId) => {
  var postData = new FormData();

  postData.append("r_slug", r_slug);
  postData.append("job_id", jobId);

  return axios
    .post(GET_CANDIDATE_JOB_NOTE_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default getCandidateJobNotes;
