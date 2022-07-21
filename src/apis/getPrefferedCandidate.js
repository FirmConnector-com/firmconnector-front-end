import axios from "axios";

//IMPORT API ROUTE URL
import { GET_PREFFERED_CANDIDATE_ROUTE } from "./apiRoutes";

const getPrefferedCandidate = (job_slug, user_slug) => {
  var postData = new FormData();

  postData.append("j_slug", job_slug);
  postData.append("u_slug", user_slug);

  return axios
    .post(GET_PREFFERED_CANDIDATE_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default getPrefferedCandidate;
