import axios from "axios";

//IMPORT API ROUTE URL
import { FORGOT_PASSWORD_ROUTE } from "./apiRoutes";

const forgotPassword = (email) => {
  var postData = new FormData();

  postData.append("email", email);

  return axios
    .post(FORGOT_PASSWORD_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default forgotPassword;
