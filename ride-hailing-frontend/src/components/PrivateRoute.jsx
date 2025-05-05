import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  //   const { user, loading } = useAuth();
  const user = localStorage.getItem("user");
  //   if (loading) return <div>Loading...</div>; // Optional: Spinner

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
