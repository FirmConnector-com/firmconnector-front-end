import axios from "axios";

//IMPORT API ROUTE URL
import { REMOVE_DOCUMENT } from "./apiRoutes";

const removeDocument = (data) => {
  var postData = new FormData();

  postData.append("resource_slug", data.resourceSlug);
  postData.append("document_id", data.id);

  return axios
    .post(REMOVE_DOCUMENT, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export default removeDocument;
