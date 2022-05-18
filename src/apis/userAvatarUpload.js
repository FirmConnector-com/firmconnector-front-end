import axios from "axios";

//IMPORT API ROUTE URL
import { USER_AVATAR_UPLOAD } from "./apiRoutes";

const userAvatarUpload = (data) => {
  var postData = new FormData();

  postData.append("user_slug", data.userSlug);
  postData.append("file", data.file);

  return axios
    .post(USER_AVATAR_UPLOAD, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default userAvatarUpload;
