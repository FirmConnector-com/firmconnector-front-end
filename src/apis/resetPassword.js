import axios from "axios";

//IMPORT API ROUTE URL
import { RESET_PASSWORD_ROUTE } from "./apiRoutes";

const resetPassword = (password, cpassword, link) => {
  var postData = new FormData();

  postData.append("password", password);
  postData.append("cpassword", cpassword);
  postData.append("link", link);

  return axios
    .post(RESET_PASSWORD_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default resetPassword;
