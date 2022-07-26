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
const GET_LOCATION_SEARCH_AUTO_COMPLETE = `${API_BASE}get-location-search-auto-complete`;
const GET_SEARCH_RESULT = `${API_BASE}get-search-result`;
const GET_ORGANIZATION_CHART = `${API_BASE}get-organization-chart`;

const CREATE_JOB_ROUTE = `${API_BASE}create-job`;
const GET_MY_JOB_POSTING_ROUTE = `${API_BASE}get-my-job-postings`;
const GET_JOB_EDIT_DETAILS_ROUTE = `${API_BASE}get-job-edit-details`;
const UPDATE_JOB_ROUTE = `${API_BASE}update-job`;
const GET_JOB_DETAILS_ROUTE = `${API_BASE}get-job-details`;
const REMOVE_JOB_ROUTE = `${API_BASE}remove-job`;
const GET_LATEST_JOB_POSTING_ROUTE = `${API_BASE}get-latest-job-postings`;
const GET_USER_DETAILS_ROUTE = `${API_BASE}get-user-details`;
const SEND_QUERY_ROUTE = `${API_BASE}send-query`;

const FORGOT_PASSWORD_ROUTE = `${API_BASE}forgot-password`;
const RESET_PASSWORD_ROUTE = `${API_BASE}reset-password`;
const GET_RESET_LINK_ROUTE = `${API_BASE}get-reset-link`;

const CREATE_NOTE_ROUTE = `${API_BASE}create-note`;
const GET_NOTE_EDIT_ACCESS_ROUTE = `${API_BASE}get-note-edit-access`;
const UPDATE_NOTE_ROUTE = `${API_BASE}update-note`;
const REMOVE_NOTE_ROUTE = `${API_BASE}remove-note`;
const PROPOSE_FOR_ROUTE = `${API_BASE}get-propose-for`;
const GET_AVAILABLE_PROPOSE_JOB_ROUTE = `${API_BASE}get-available-propose-job`;
const ADD_PROPOSE_JOB_ROUTE = `${API_BASE}add-propose-job`;

const GET_PREFFERED_CANDIDATE_ROUTE = `${API_BASE}get-preffered-candidate`;
const GET_CANDIDATE_JOB_NOTE_ROUTE = `${API_BASE}get-candidate-job-note`;
const CREATE_JOB_NOTE_ROUTE = `${API_BASE}create-job-note`;
const UPDATE_CANDIDATE_STATUS_FOR_JOB_ROUTE = `${API_BASE}update-candidate-status-for-job`;
const GET_CANDIDATE_JOB_STATUS_ROUTE = `${API_BASE}get-candidate-status-for-job`;

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
  GET_LOCATION_SEARCH_AUTO_COMPLETE,
  GET_SEARCH_RESULT,
  GET_MY_RESOURCE_MANAGER_LISTING,
  GET_EDUCATION_DETAILS,
  UPDATE_EDUCATION_DETAILS,
  GET_ORGANIZATION_CHART,
  CREATE_JOB_ROUTE,
  GET_MY_JOB_POSTING_ROUTE,
  GET_JOB_EDIT_DETAILS_ROUTE,
  UPDATE_JOB_ROUTE,
  GET_JOB_DETAILS_ROUTE,
  REMOVE_JOB_ROUTE,
  GET_LATEST_JOB_POSTING_ROUTE,
  GET_USER_DETAILS_ROUTE,
  SEND_QUERY_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  RESET_PASSWORD_ROUTE,
  GET_RESET_LINK_ROUTE,
  CREATE_NOTE_ROUTE,
  GET_NOTE_EDIT_ACCESS_ROUTE,
  UPDATE_NOTE_ROUTE,
  REMOVE_NOTE_ROUTE,
  PROPOSE_FOR_ROUTE,
  GET_AVAILABLE_PROPOSE_JOB_ROUTE,
  ADD_PROPOSE_JOB_ROUTE,
  GET_PREFFERED_CANDIDATE_ROUTE,
  GET_CANDIDATE_JOB_NOTE_ROUTE,
  CREATE_JOB_NOTE_ROUTE,
  UPDATE_CANDIDATE_STATUS_FOR_JOB_ROUTE,
  GET_CANDIDATE_JOB_STATUS_ROUTE,
};
