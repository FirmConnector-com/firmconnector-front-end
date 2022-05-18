import axios from "axios";

//IMPORT API ROUTE URL
import { SAVE_UPLOADED_DOCUMENT } from "./apiRoutes";

const saveUploadedDocument = (data) => {
  var postData = new FormData();

  postData.append("resource_slug", data.resourceSlug);
  postData.append("document_title", data.documentTitle);
  postData.append("file", data.file);

  return axios
    .post(SAVE_UPLOADED_DOCUMENT, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

export default saveUploadedDocument;
