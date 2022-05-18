import axios from "axios";

//IMPORT API ROUTE URL
import { UPDATE_PROFILE_BASIC_INFO } from "./apiRoutes";

const updateProfileBasicInfo = (data) => {
  var postData = new FormData();

  postData.append("user_slug", data.userSlug);
  postData.append("first_name", data.firstName);
  postData.append("last_name", data.lastName);
  postData.append("user_profile_role", data.jobRole);
  postData.append("profile_bio", data.bio);
  postData.append("report_to", data.report_to);

  return axios
    .post(UPDATE_PROFILE_BASIC_INFO, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default updateProfileBasicInfo;
