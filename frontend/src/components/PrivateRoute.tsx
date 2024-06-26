import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  component: React.ComponentType<any>;
}

export default function PrivateRoute({ component: Component, ...rest }:PrivateRouteProps) {
  const token = localStorage.getItem("token");

  if (!token)  {
    localStorage.setItem("msg", "Para acessar essa página, é necessário fazer login!")
  }

  return token ? <Component {...rest} /> : <Navigate to="/login" />
}
