import axios from "axios";

//IMPORT API ROUTE URL
import { GET_EDUCATION_DETAILS } from "./apiRoutes";

const getEducationDetails = (data) => {
  var postData = new FormData();

  postData.append("resource_slug", data.resourceSlug);
  postData.append("education_history_id", data.id);

  return axios
    .post(GET_EDUCATION_DETAILS, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export default getEducationDetails;
