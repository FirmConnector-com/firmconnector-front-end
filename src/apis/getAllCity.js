import axios from "axios";

//IMPORT API ROUTE URL
import { GET_ALL_CITY } from "./apiRoutes";

const getAllCity = (data) => {
  var postData = new FormData();

  postData.append("state_id", data.stateID);

  return axios
    .post(GET_ALL_CITY, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default getAllCity;
