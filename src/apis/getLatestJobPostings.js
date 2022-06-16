import axios from "axios";

//IMPORT API ROUTE URL
import { GET_LATEST_JOB_POSTING_ROUTE } from "./apiRoutes";

const getLatestJobPostings = (user_slug, filterText) => {
  var postData = new FormData();

  postData.append("user_slug", user_slug);
  postData.append("search_text", filterText);

  return axios
    .post(GET_LATEST_JOB_POSTING_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default getLatestJobPostings;
