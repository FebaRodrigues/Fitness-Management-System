import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, isTrainerRoute = false }) => {
  const { user, trainer } = useContext(AuthContext);

  // Check if the user is authenticated for the route
  if (isTrainerRoute) {
    // Trainer-specific route
    if (!trainer) {
      return <Navigate to="/trainers/login" replace />;
    }
  } else {
    // User-specific route
    if (!user) {
      return <Navigate to="/users/login" replace />;
    }
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;