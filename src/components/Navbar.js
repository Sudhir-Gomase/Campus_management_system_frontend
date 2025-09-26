
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
      <div className="navbar-right flex" style={{ alignItems: 'center' }}>
        <Link onClick={handleLogout} className="login-icon">
          <LogoutOutlined />
        </Link>
        <div onClick={() => navigate("/account")} style={{ marginLeft: 8, fontSize: 22, background: '#4b95a2', color: '#fff', borderRadius: 50, width: 35, height: 35, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          {userName?.charAt(0).toUpperCase()}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
