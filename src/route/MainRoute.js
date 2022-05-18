import React from "react";
import { Route, Switch } from "react-router-dom";
import useLocationBlocker from "./LocationBlocker";

//Component for auth checking
import ProtectedRoute from "./ProtectedRoute";
import ProtectedRouteWithoutAuth from "./ProtectedRouteWithoutAuth";

//Import all main route components
import HomeScreen from "../screens/Home/HomeScreen";

//Import Static pages
import AboutScreen from "../screens/Static-pages/About/AboutScreen";
import PrivacyPolicyScreen from "../screens/Static-pages/Privacy-policy/PrivacyPolicyScreen";
import PricingScreen from "../screens/Static-pages/Pricing/PricingScreen";
import ContactUsScreen from "../screens/Static-pages/Contact-us/ContactUsScreen";

import DashboardScreen from "../screens/Dashboard/DashboardScreen";

// Profile settings page
import MyProfileScreen from "../screens/Profile/MyProfileScreen";

//Import Resource pages
import ResourceListingScreen from "../screens/Resource/ResourceListingScreen";
import ResourceDetailsScreen from "../screens/Resource/ResourceDetailsScreen";

//Import Auth screens
import LoginScreen from "../screens/Auth/LoginScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";

//Import resource manager route
import AddResourceManager from "../screens/ResourceManager/AddResourceManager";
import EditProfile from "../screens/ResourceManager/EditProfile";
import Managers from "../screens/ResourceManager/Managers";
import DisolayOrgChart from "../screens/OrgChart/DisolayOrgChart";

//Import resource route
import AddResource from "../screens/Resource/AddResource";
import ResourceEditScreen from "../screens/Resource/ResourceEditScreen";

import EditFirm from "../screens/Firm/EditFirm";
import FirmOwnerEdit from "../screens/Firm/FirmOwnerEdit";

import ClientsList from "../screens/Client/ClientListingScreen";
import AddClient from "../screens/Client/AddClient";

import Search from "../screens/Search/SearchScreen";

//Error screen with type
import PageNotFound from "../screens/error/400/PageNotFound";

//Define main route to access on App.js
const MainRoute = () => {
  useLocationBlocker();

  return (
    <>
      <Switch>
        {/* Route for Static Pages */}
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/about-us" component={AboutScreen} />
        <Route exact path="/privacy-policy" component={PrivacyPolicyScreen} />
        <Route exact path="/pricing" component={PricingScreen} />
        <Route exact path="/contact-us" component={ContactUsScreen} />

        {/* Route for Login */}
        <ProtectedRouteWithoutAuth
          exact
          path={`/sign-in`}
          component={LoginScreen}
        />
        <ProtectedRouteWithoutAuth
          exact
          path={`/sign-up`}
          component={SignUpScreen}
        />

        {/* Route for Resource */}
        <ProtectedRoute
          exact
          path={`/resources`}
          component={ResourceListingScreen}
        />

        {/* Route for Dashboard */}
        <ProtectedRoute exact path="/dashboard" component={DashboardScreen} />

        <ProtectedRoute
          exact
          path={`/profile-settings`}
          component={MyProfileScreen}
        />

        <ProtectedRoute
          exact
          path={`/organization-structure`}
          component={DisolayOrgChart}
        />

        <ProtectedRoute
          exact
          path={`/add-resource-manager`}
          component={AddResourceManager}
        />

        <ProtectedRoute
          exact
          path={`/resource-managers`}
          component={Managers}
        />

        <ProtectedRoute exact path={`/edit-profile`} component={EditProfile} />

        <ProtectedRoute exact path={`/add-resource`} component={AddResource} />

        <ProtectedRoute
          exact
          path={`/resources/edit-resource/:resourceSlug`}
          component={ResourceEditScreen}
        />

        {/* Route for Resource Details */}
        <ProtectedRoute
          exact
          path={`/resources/details/:resourceSlug`}
          component={ResourceDetailsScreen}
        />

        {/* FIRM routes */}
        {/* Route for Firm edit */}
        <ProtectedRoute
          exact
          path={`/edit-firm-owner-profile`}
          component={FirmOwnerEdit}
        />
        <ProtectedRoute exact path={`/edit-firm`} component={EditFirm} />

        <ProtectedRoute
          exact
          path={`/access-control`}
          component={ClientsList}
        />
        <ProtectedRoute exact path={`/add-client`} component={AddClient} />

        <ProtectedRoute exact path={`/search`} component={Search} />

        {/* Route for 404 */}
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
};

export default MainRoute;
