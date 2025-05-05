import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import RideStatusPage from "./pages/RideStatusPage";
import RideBookingPage from "./pages/RideBookingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const { loading } = useAuth(); // ✅ Access loading state

  if (loading) return <div>Loading...</div>; // Or a spinner component

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/book"
          element={
            <PrivateRoute>
              <RideBookingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/ride/:id"
          element={
            <PrivateRoute>
              <RideStatusPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
