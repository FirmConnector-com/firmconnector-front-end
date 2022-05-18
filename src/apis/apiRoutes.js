import { API_BASE } from "../config/env";

const LOGIN_ROUTE = `${API_BASE}check-login`;
const SIGNUP_ROUTE = `${API_BASE}create-firm-account`;
const USER_PROFILE_ROUTE = `${API_BASE}get-profile-information`;
const USER_FIRM_DETAILS_ROUTE = `${API_BASE}get-user-firm-details`;
const FIRM_RESOURCE_MANAGER_COUNT = `${API_BASE}get-firm-resource-manager-count`;
const FIRM_RESOURCE_COUNT = `${API_BASE}get-firm-resource-count`;
const CREATE_MANGER_ROUTE = `${API_BASE}create-resource-manager-by-firm`;
const CREATE_RESOUCE_ROUTE = `${API_BASE}create-resource`;
const CREATE_RESOUCE_FROM_RESUME_ROUTE = `${API_BASE}create-resource-from-resume`;
const RESOURCE_MANAGER_RESOURCE_MANAGER_COUNT = `${API_BASE}get-resource-manager-resource-count`;
const CHECK_RESOURCE_EDIT_ACCESS = `${API_BASE}get-resource-edit-access`;
const UPDATE_PROFILE_BASIC_INFO = `${API_BASE}update-profile-basic-info`;
const UPDATE_PROFILE_CONTACT_INFO = `${API_BASE}update-profile-contact-info`;
const USER_AVATAR_UPLOAD = `${API_BASE}user-avatar-upload`;
const GET_MY_RESOURCE_LISTING = `${API_BASE}get-my-resource-listing`;
const RESOURCE_DETAILS_ROUTE = `${API_BASE}get-resource-details`;
const RESOURCE_MANAGER_DETAILS_ROUTE = `${API_BASE}get-resource-manager-details`;
const GET_MY_RESOURCE_MANAGER_LISTING = `${API_BASE}get-my-resource-manager-listing`;
const FIRM_OWNER_DETAILS_ROUTE = `${API_BASE}get-firm-owner-details`;
const FIRM_LOGO_UPLOAD = `${API_BASE}firm-logo-upload`;
const UPDATE_FIRM_BASIC_INFO = `${API_BASE}update-firm-basic-info`;
const SAVE_EDUCATION_DETAILS = `${API_BASE}save-education-details`;
const UPDATE_EDUCATION_DETAILS = `${API_BASE}update-education-details`;
const REMOVE_EDUCATION_DETAILS = `${API_BASE}remove-education-details`;
const GET_EDUCATION_DETAILS = `${API_BASE}get-education-details`;
const SAVE_EMPLOYMENT_DETAILS = `${API_BASE}save-employment-details`;
const UPDATE_EMPLOYMENT_DETAILS = `${API_BASE}update-employment-details`;
const REMOVE_EMPLOYMENT_DETAILS = `${API_BASE}remove-employment-details`;
const GET_EMPLOYMENT_DETAILS = `${API_BASE}get-employment-details`;
const SAVE_UPLOADED_DOCUMENT = `${API_BASE}save-uploaded-document`;
const REMOVE_DOCUMENT = `${API_BASE}remove-document`;
const SAVE_RESOURCE_AVAILABILITY = `${API_BASE}save-resource-availability`;
const UPDATE_IS_ADVERTISED = `${API_BASE}update-is-advertised`;

const CLIENT_LISTING_ROUTE = `${API_BASE}get-my-clients`;
const CREATE_CLIENT_ROUTE = `${API_BASE}create-client`;

const GET_ALL_STATE = `${API_BASE}get-all-state`;
const GET_ALL_CITY = `${API_BASE}get-all-city`;

const GET_ALL_FIRM_ACCESS_LIST = `${API_BASE}get-all-firm-access-list`;
const GET_SEARCH_AUTO_COMPLETE = `${API_BASE}get-search-auto-complete`;
const GET_SEARCH_RESULT = `${API_BASE}get-search-result`;
const GET_ORGANIZATION_CHART = `${API_BASE}get-organization-chart`;

export {
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  USER_PROFILE_ROUTE,
  USER_FIRM_DETAILS_ROUTE,
  FIRM_RESOURCE_MANAGER_COUNT,
  FIRM_RESOURCE_COUNT,
  CREATE_MANGER_ROUTE,
  CREATE_RESOUCE_ROUTE,
  CREATE_RESOUCE_FROM_RESUME_ROUTE,
  RESOURCE_MANAGER_RESOURCE_MANAGER_COUNT,
  CHECK_RESOURCE_EDIT_ACCESS,
  UPDATE_PROFILE_BASIC_INFO,
  UPDATE_PROFILE_CONTACT_INFO,
  USER_AVATAR_UPLOAD,
  GET_MY_RESOURCE_LISTING,
  RESOURCE_DETAILS_ROUTE,
  RESOURCE_MANAGER_DETAILS_ROUTE,
  FIRM_OWNER_DETAILS_ROUTE,
  FIRM_LOGO_UPLOAD,
  UPDATE_FIRM_BASIC_INFO,
  SAVE_EDUCATION_DETAILS,
  REMOVE_EDUCATION_DETAILS,
  SAVE_EMPLOYMENT_DETAILS,
  UPDATE_EMPLOYMENT_DETAILS,
  REMOVE_EMPLOYMENT_DETAILS,
  GET_EMPLOYMENT_DETAILS,
  GET_ALL_STATE,
  GET_ALL_CITY,
  SAVE_UPLOADED_DOCUMENT,
  REMOVE_DOCUMENT,
  SAVE_RESOURCE_AVAILABILITY,
  UPDATE_IS_ADVERTISED,
  CLIENT_LISTING_ROUTE,
  CREATE_CLIENT_ROUTE,
  GET_ALL_FIRM_ACCESS_LIST,
  GET_SEARCH_AUTO_COMPLETE,
  GET_SEARCH_RESULT,
  GET_MY_RESOURCE_MANAGER_LISTING,
  GET_EDUCATION_DETAILS,
  UPDATE_EDUCATION_DETAILS,
  GET_ORGANIZATION_CHART,
};
