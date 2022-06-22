import axios from "axios";

//IMPORT API ROUTE URL
import { SEND_QUERY_ROUTE } from "./apiRoutes";

const sendClientQuery = (data) => {
  var postData = new FormData();

  postData.append("user_slug", data.user_slug);
  postData.append("resource_slug", data.resource_slug);
  postData.append("message", data.message);

  return axios
    .post(SEND_QUERY_ROUTE, postData, {
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

export default sendClientQuery;
