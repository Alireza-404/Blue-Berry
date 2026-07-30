import FullScreenLoader from "../components/Ui/FullScreenLoader/FullScreenLoader";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <FullScreenLoader />;

  if (user) {
    return <Navigate to={"/"} replace />;
  }

  return children;
}
