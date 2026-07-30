import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FullScreenLoader from "../components/Ui/FullScreenLoader/FullScreenLoader";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <FullScreenLoader />;

  if (!user) {
    return <Navigate to={"/auth/login"} replace />;
  }

  return children;
}
