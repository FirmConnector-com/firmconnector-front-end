import axios from "axios";

//IMPORT API ROUTE URL
import { UPDATE_NOTE_ROUTE } from "./apiRoutes";

const updateNote = (data) => {
  var postData = new FormData();

  postData.append("note_slug", data.note_slug);
  postData.append("r_slug", data.r_slug);
  postData.append("note", data.note);

  return axios
    .post(UPDATE_NOTE_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default updateNote;
