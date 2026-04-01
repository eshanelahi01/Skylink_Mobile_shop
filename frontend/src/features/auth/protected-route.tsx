import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/auth-context";

export const ProtectedRoute = ({ roles }: { roles: Array<"admin" | "staff" | "superadmin"> }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
