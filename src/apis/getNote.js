import axios from "axios";

//IMPORT API ROUTE URL
import { GET_NOTE_EDIT_ACCESS_ROUTE } from "./apiRoutes";

const getNote = (note_slug, r_slug) => {
  var postData = new FormData();

  postData.append("note_slug", note_slug);
  postData.append("r_slug", r_slug);

  return axios
    .post(GET_NOTE_EDIT_ACCESS_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default getNote;
