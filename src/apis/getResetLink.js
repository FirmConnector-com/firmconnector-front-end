import axios from "axios";

//IMPORT API ROUTE URL
import { GET_RESET_LINK_ROUTE } from "./apiRoutes";

const getResetLink = (link) => {
  var postData = new FormData();

  postData.append("link", link);

  return axios
    .post(GET_RESET_LINK_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default getResetLink;
