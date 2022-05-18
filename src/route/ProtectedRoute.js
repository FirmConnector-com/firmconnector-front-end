import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function ProtectedRoute({ component: Component, ...rest }) {
  const { isLoggedIn } = useAuthContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    />
  );
}

export default ProtectedRoute;
