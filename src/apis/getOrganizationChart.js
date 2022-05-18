import axios from "axios";

//IMPORT API ROUTE URL
import { GET_ORGANIZATION_CHART } from "./apiRoutes";

const getOrganizationChart = (userSlug) => {
  var postData = new FormData();

  postData.append("user_slug", userSlug);

  return axios
    .post(GET_ORGANIZATION_CHART, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default getOrganizationChart;
