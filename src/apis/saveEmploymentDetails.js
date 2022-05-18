import axios from "axios";

//IMPORT API ROUTE URL
import { SAVE_EMPLOYMENT_DETAILS } from "./apiRoutes";

const saveEducationDetails = (data) => {
  var postData = new FormData();

  postData.append("resource_slug", data.resourceSlug);
  postData.append("employer_name", data.employer_name);
  postData.append("job_title", data.job_title);
  postData.append("job_type", data.job_type);
  postData.append("start_date", data.start_date);
  postData.append("end_date", data.end_date);
  postData.append("description", data.description);
  postData.append("country_code", data.country_code);
  postData.append("province", data.province);
  postData.append("city", data.city);
  postData.append("is_current", data.is_current);

  return axios
    .post(SAVE_EMPLOYMENT_DETAILS, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export default saveEducationDetails;
