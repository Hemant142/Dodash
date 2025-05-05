import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  //   const { user, loading } = useAuth();
  const token = localStorage.getItem("token");
  console.log(token, "token");
  //   if (loading) return <div>Loading...</div>; // Optional: Spinner

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
