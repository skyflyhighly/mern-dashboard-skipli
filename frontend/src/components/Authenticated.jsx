import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthenticationContext";

function Authenticated({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    return children;
  }
  return <Navigate to={"/login"} replace state={{path: location.pathname}} />;
}

export default Authenticated;
