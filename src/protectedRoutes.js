import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({
  isAuthenticated,
  children,
  redirect = "/login",
}) => {
  if (!isAuthenticated) return <Navigate to={redirect} />;
  return children ? children : <Outlet />;
};

export default ProtectedRoutes;