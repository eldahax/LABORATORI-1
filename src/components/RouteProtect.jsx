import { Navigate, Outlet } from "react-router-dom";

const RouteProtect = ({ allowedRoles = [] }) => {
  const roles = JSON.parse(localStorage.getItem("userRole") || "[]");

  if (!roles.length) {
    return <Navigate to="/Login" replace />;
  }

  const normalizedUserRoles = roles.map(r => r.toLowerCase());
  const normalizedAllowed = allowedRoles.map(r => r.toLowerCase());

  const hasAccess = normalizedUserRoles.some(role =>
    normalizedAllowed.includes(role)
  );

  if (!hasAccess) {
    return <Navigate to="/Home" replace />;
  }

  return <Outlet />;
};

export default RouteProtect;