import axios from "axios";

//IMPORT API ROUTE URL
import { GET_MY_JOB_POSTING_ROUTE } from "./apiRoutes";

const getMyJobPostings = (user_slug, filterText) => {
  var postData = new FormData();

  postData.append("user_slug", user_slug);
  postData.append("search_text", filterText);

  return axios
    .post(GET_MY_JOB_POSTING_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default getMyJobPostings;
