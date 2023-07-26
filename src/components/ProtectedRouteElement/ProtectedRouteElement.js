import React from "react";
import { Navigate, Route } from "react-router-dom";

function ProtectedRouteElement({ element: Component, ...props }) {
  return props.isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/signin" replace />
  );
}

export default ProtectedRouteElement;