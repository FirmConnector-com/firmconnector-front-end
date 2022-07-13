import axios from "axios";

//IMPORT API ROUTE URL
import { CREATE_NOTE_ROUTE } from "./apiRoutes";

const createNote = (data) => {
  var postData = new FormData();

  postData.append("resource_slug", data.resource_slug);
  postData.append("r_slug", data.r_slug);
  postData.append("note", data.note);

  return axios
    .post(CREATE_NOTE_ROUTE, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default createNote;
