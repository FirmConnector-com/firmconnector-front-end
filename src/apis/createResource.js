import axios from "axios";

//IMPORT API ROUTE URL
import { CREATE_RESOUCE_ROUTE } from "./apiRoutes";

const createResourceManager = (data) => {
  var postData = new FormData();

  postData.append("user_slug", data.user_slug);
  postData.append("first_name", data.firstName);
  postData.append("last_name", data.lastName);
  postData.append("user_profile_role", data.jobRole);
  postData.append("profile_bio", data.profileBio);
  postData.append("email", data.email);
  postData.append("password", data.password);
  postData.append("contact_email", data.contactEmail);
  postData.append("phone", data.phone);
  postData.append("officePhone", data.officePhone);

  return axios
    .post(CREATE_RESOUCE_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default createResourceManager;
