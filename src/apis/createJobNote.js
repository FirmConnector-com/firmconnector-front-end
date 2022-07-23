import axios from "axios";

//IMPORT API ROUTE URL
import { CREATE_JOB_NOTE_ROUTE } from "./apiRoutes";

const createJobNote = (data) => {
  var postData = new FormData();

  postData.append("user_slug", data.user_slug);
  postData.append("job_id", data.jobId);
  postData.append("r_slug", data.resourceSlug);
  postData.append("note", data.note);

  return axios
    .post(CREATE_JOB_NOTE_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default createJobNote;
