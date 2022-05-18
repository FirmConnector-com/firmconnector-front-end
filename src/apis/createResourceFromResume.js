import axios from "axios";

//IMPORT API ROUTE URL
import { CREATE_RESOUCE_FROM_RESUME_ROUTE } from "./apiRoutes";

const createResourceFromResume = (data) => {
  var postData = new FormData();

  postData.append("user_slug", data.user_slug);
  postData.append("resume_upload", true);
  postData.append("file", data.file);

  return axios
    .post(CREATE_RESOUCE_FROM_RESUME_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default createResourceFromResume;
