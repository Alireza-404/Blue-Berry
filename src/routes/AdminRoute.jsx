import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import FullScreenLoader from "../components/Ui/FullScreenLoader/FullScreenLoader";

export default function AdminRoute({ children }) {
  const { user, initialized } = useSelector((state) => state.auth);

  if (!initialized) {
    return <FullScreenLoader />;
  }

  if (!user) {
    return <Navigate to={"/auth/login"} replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to={"/"} replace />;
  }

  return children;
}
