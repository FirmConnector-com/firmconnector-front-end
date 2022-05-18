import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginChecking, setIsLoginChecking] = useState(true);
  const [userDetails, setUserDetails] = useState(false);

  /*
   * Used to initial checking of selected theme from the AsyncStorage
   * and overrides the theme state
   */
  useEffect(() => {
    loginCheck();
  }, []);

  /**
   *
   * Method used to check login
   */
  async function loginCheck() {
    try {
      let isAuthenticated = await localStorage.getItem("isAuthenticated");
      let loggedinUserDetails = await localStorage.getItem(
        "loggedinUserDetails"
      );

      if (isAuthenticated === "true") {
        setIsLoggedIn(true);
        setIsLoginChecking(false);
        setUserDetails(loggedinUserDetails);
      } else {
        setIsLoggedIn(false);
        setIsLoginChecking(false);
      }
    } catch (error) {
      console.log("Unable to check login session");
    }
  }

  /*
   * Used to signin
   * Update the Localstorage with the signin value
   * and overrides the isLoggedIn state
   */
  const signIn = async () => {
    try {
      let isAuthenticated = await localStorage.getItem("isAuthenticated");
      let loggedinUserDetails = await localStorage.getItem(
        "loggedinUserDetails"
      );

      if (isAuthenticated === "true") {
        setIsLoggedIn(true);
        setIsLoginChecking(false);
        setUserDetails(loggedinUserDetails);
      } else {
        setIsLoggedIn(false);
        setIsLoginChecking(false);
      }
    } catch (error) {
      console.log("Unable to update login session");
    }
  };

  /*
   * Used to signin
   * Update the Localstorage with the signin value
   * and overrides the isLoggedIn state
   */
  const signOut = async () => {
    setIsLoggedIn(false);
    setIsLoginChecking(false);
    setUserDetails(false);
    localStorage.clear();
  };

  if (!isLoginChecking) {
    return (
      <AuthContext.Provider
        value={{ isLoginChecking, isLoggedIn, userDetails, signIn, signOut }}
      >
        {children}
      </AuthContext.Provider>
    );
  } else {
    return null;
  }
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
