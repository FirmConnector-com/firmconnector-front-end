import axios from "axios";

//IMPORT API ROUTE URL
import { GET_EMPLOYMENT_DETAILS } from "./apiRoutes";

const getEmploymentDetails = (data) => {
  var postData = new FormData();

  postData.append("resource_slug", data.resourceSlug);
  postData.append("employment_history_id", data.id);

  return axios
    .post(GET_EMPLOYMENT_DETAILS, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export default getEmploymentDetails;
