
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa"; // Login icon
import "../styles/navbar.css";
import {
  LogoutOutlined,
} from "@ant-design/icons";
function Navbar() {
  const userName = localStorage.getItem('userName')
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");
      navigate("/login");
    };
  return (
    <nav className="navbar">
      <div className="navbar-left">
        Hello ! {userName}
      </div>
      <div className="navbar-right">
        <Link onClick={handleLogout} className="login-icon">
          <LogoutOutlined />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
