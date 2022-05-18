import axios from "axios";

//IMPORT API ROUTE URL
import { LOGIN_ROUTE } from "./apiRoutes";

const checkLoginCredential = (email, password) => {
  var postData = new FormData();

  postData.append("email", email);
  postData.append("password", password);

  return axios
    .post(LOGIN_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default checkLoginCredential;
