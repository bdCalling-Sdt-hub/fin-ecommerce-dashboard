/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // Retrieve the token from localStorage
  const token = localStorage.getItem("accessToken");

  // Check if token exists in localStorage (user is authenticated)
  if (!token) {
    // If no token, redirect to the login page
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If token exists, allow access to the protected route
  return children;
};

export default ProtectedRoute;
