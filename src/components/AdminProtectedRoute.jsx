import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

function AdminProtectedRoute({ children }) {
  const { isAdmin } = useAdminAuth();
  
  return isAdmin ? children : <Navigate to="/admin/login" />;
}

export default AdminProtectedRoute;
