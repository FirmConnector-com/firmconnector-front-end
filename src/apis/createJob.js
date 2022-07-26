import axios from "axios";

//IMPORT API ROUTE URL
import { CREATE_JOB_ROUTE } from "./apiRoutes";

const createJob = (data) => {
  var postData = new FormData();

  postData.append("user_slug", data.user_slug);
  postData.append("job_title", data.job_title);
  postData.append("job_description", data.job_description);
  postData.append("firm_ids", data.firm_ids);
  postData.append("required_skill_set", data.required_skill_set);
  postData.append("experience_required", data.experience_required);
  postData.append("preffered_language", data.preffered_language);
  postData.append("job_type", data.job_type);
  postData.append("contract_length", data.contract_length);
  postData.append("compensation", data.compensation);
  postData.append("location_requirement", data.location_requirement);

  return axios
    .post(CREATE_JOB_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default createJob;
