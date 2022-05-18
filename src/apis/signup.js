import axios from "axios";

//IMPORT API ROUTE URL
import { SIGNUP_ROUTE } from "./apiRoutes";

const createOrganization = (data) => {
  var postData = new FormData();

  postData.append("firm_name", data.organizationName);
  postData.append("firm_type", data.organizationType);
  postData.append("email", data.email);
  postData.append("password", data.password);
  postData.append("first_name", data.firstName);
  postData.append("last_name", data.lastName);

  return axios
    .post(SIGNUP_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default createOrganization;
