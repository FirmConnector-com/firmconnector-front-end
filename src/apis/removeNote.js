import axios from "axios";

//IMPORT API ROUTE URL
import { REMOVE_NOTE_ROUTE } from "./apiRoutes";

const removeNote = (data) => {
  var postData = new FormData();

  postData.append("note_slug", data.note_slug);
  postData.append("r_slug", data.r_slug);

  return axios
    .post(REMOVE_NOTE_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default removeNote;
