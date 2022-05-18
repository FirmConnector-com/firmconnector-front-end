import axios from "axios";

//IMPORT API ROUTE URL
import { UPDATE_FIRM_BASIC_INFO } from "./apiRoutes";

const updateFirmBasicInfo = (data) => {
  var postData = new FormData();

  postData.append("user_slug", data.userSlug);
  postData.append("firm_name", data.firmName);
  postData.append("firm_id", data.firmID);

  return axios
    .post(UPDATE_FIRM_BASIC_INFO, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default updateFirmBasicInfo;
