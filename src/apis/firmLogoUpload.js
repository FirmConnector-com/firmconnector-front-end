import axios from "axios";

//IMPORT API ROUTE URL
import { FIRM_LOGO_UPLOAD } from "./apiRoutes";

const firmLogoUpload = (data) => {
  var postData = new FormData();

  postData.append("user_slug", data.userSlug);
  postData.append("firm_id", data.firmID);
  postData.append("file", data.file);

  return axios
    .post(FIRM_LOGO_UPLOAD, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default firmLogoUpload;
