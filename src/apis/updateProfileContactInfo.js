import axios from "axios";

//IMPORT API ROUTE URL
import { UPDATE_PROFILE_CONTACT_INFO } from "./apiRoutes";

const updateProfileContactInfo = (data) => {
  var postData = new FormData();

  postData.append("user_slug", data.userSlug);
  postData.append("contact_email", data.contactEmail);
  postData.append("phone", data.phone);
  postData.append("office_phone", data.officePhone);

  postData.append("user_street_address", data.streetAddress);
  postData.append("user_address_city_id", data.city);
  postData.append("user_address_provience_id", data.state);
  postData.append("user_address_country_id", data.country);

  return axios
    .post(UPDATE_PROFILE_CONTACT_INFO, postData)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export default updateProfileContactInfo;
