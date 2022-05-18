import axios from "axios";

//IMPORT API ROUTE URL
import { CREATE_CLIENT_ROUTE } from "./apiRoutes";

const createClient = (data) => {
  var postData = new FormData();

  postData.append("user_slug", data.user_slug);
  postData.append("email", data.email);

  return axios
    .post(CREATE_CLIENT_ROUTE, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default createClient;
