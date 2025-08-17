import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function AdminRoute({ children }) {
  const { user } = useAuthStore();

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/" />;

  return children;
}
