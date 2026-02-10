import { Navigate } from "react-router-dom";
import { getUser } from "../utils/auth";

function RoleRoute({ allowedRoles, children }) {
  const user = getUser();

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RoleRoute;
