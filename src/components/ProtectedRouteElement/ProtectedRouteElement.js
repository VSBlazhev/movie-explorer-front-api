import React from "react";
import { Navigate, Route } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

function ProtectedRouteElement({ children, ...props }) {

  if(props.isLoading){
    return <Preloader/>
  }

  if(props.isLoggedIn){
    return <>{children}</>    
   } else {
    return  <Navigate to="/signin" replace />
    }
  }




export default ProtectedRouteElement;