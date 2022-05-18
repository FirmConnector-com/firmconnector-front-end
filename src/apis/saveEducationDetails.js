import axios from "axios";

//IMPORT API ROUTE URL
import { SAVE_EDUCATION_DETAILS } from "./apiRoutes";

const saveEducationDetails = (data) => {
  var postData = new FormData();

  postData.append("resource_slug", data.resourceSlug);
  postData.append("degree_name", data.degreeName);
  postData.append("subject", data.subject);
  postData.append("school_name", data.schoolName);
  postData.append("passed_on", data.passedOn);

  return axios
    .post(SAVE_EDUCATION_DETAILS, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export default saveEducationDetails;
