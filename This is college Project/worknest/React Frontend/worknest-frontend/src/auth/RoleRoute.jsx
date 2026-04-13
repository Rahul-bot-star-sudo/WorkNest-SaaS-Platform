// auth/RoleRoute.jsx
import { Navigate } from "react-router-dom";

function RoleRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = user?.role?.role_code;

  // First check if authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Then check role permissions
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // User doesn't have permission - redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RoleRoute;