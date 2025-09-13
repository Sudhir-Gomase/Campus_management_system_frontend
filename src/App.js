import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { routes } from "./pages/routes";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AppLayout from "./pages/AppLayout";

function App() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    if (accessToken) {
      if (currentPath === '/login') {
        navigate('/');
      } else {
        navigate(currentPath);
      }
    } else {
      navigate("/login");
    }
  }, [accessToken, currentPath, navigate]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<AppLayout />} >
        {
          routes?.map((route, index) => (
            <Route
              key={index}
              path={route.path}   // ✅ use route.path
              element={route.element}
            />
          ))
        }
      </Route>
      </Routes>
    </>
  );
}

export default App;
