import axios from "axios";

//IMPORT API ROUTE URL
import { GET_ALL_STATE } from "./apiRoutes";

const getAllState = (data) => {
  var postData = new FormData();

  postData.append("country_id", data.countryID);

  return axios
    .post(GET_ALL_STATE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default getAllState;
