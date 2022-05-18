import axios from "axios";

//IMPORT API ROUTE URL
import { REMOVE_EDUCATION_DETAILS } from "./apiRoutes";

const removeEducationDetails = (data) => {
  var postData = new FormData();

  postData.append("resource_slug", data.resourceSlug);
  postData.append("education_history_id", data.id);

  return axios
    .post(REMOVE_EDUCATION_DETAILS, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export default removeEducationDetails;
