
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import {
  LogoutOutlined,
  NotificationFilled,
  NotificationOutlined,
} from "@ant-design/icons";
import { IoIosNotifications } from "react-icons/io";
function Navbar() {
  const userName = localStorage.getItem('userName')
  const userDetails = JSON.parse(localStorage.getItem("userdetails"));
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
        {userDetails?.role === 'student' &&
          <Link to={'/notification'} className="login-icon">
            <IoIosNotifications />
          </Link>
        }
        <div onClick={() => navigate("/account")} style={{ marginLeft: 8,marginRight: 8, fontSize: 22, background: '#4b95a2', color: '#fff', borderRadius: 50, width: 35, height: 35, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          {userName?.charAt(0).toUpperCase()}
        </div>
        <Link onClick={handleLogout} className="login-icon">
          <LogoutOutlined />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
