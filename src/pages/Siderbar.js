import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  WechatWorkOutlined,
  CopyOutlined
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { FaGraduationCap, } from "react-icons/fa";



const { Sider } = Layout;

const Sidebar = () => {
  const roleType = localStorage.getItem('loginType');
  const location = useLocation();

  // Map routes to menu keys for each role
  const adminKeyMap = {
    "/": "1",
    "/student": "2",
    "/company": "3",
  };
  const studentKeyMap = {
    "/student-dashboard": "1",
    "/student-form": "2",
    "/student-ongoing": "3",
  };

  // Pick the right key map
  const keyMap = roleType === "admin" ? adminKeyMap : studentKeyMap;
  // Find the key for the current path, fallback to "1"
  const selectedKey = keyMap[location.pathname] || "1";

  return (
    <Sider collapsible theme="dark" style={{ minHeight: "100vh" }}>
      {/* Logo */}
      <div
        style={{
          height: 64,
          margin: 16,
          textAlign: "center",
          color: "#4b95a2",
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        <FaGraduationCap /> Campas Management
      </div>

      {/* Menu */}
      {roleType === 'admin' &&
        <Menu mode="inline" selectedKeys={[selectedKey]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/student">Student</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<WechatWorkOutlined />}>
            <Link to="/company">Company</Link>
          </Menu.Item>
        </Menu>
      }
      {roleType === 'student' &&
        <Menu mode="inline" selectedKeys={[selectedKey]}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/student-dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/student-form">Details</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<CopyOutlined />}>
            <Link to="/student-ongoing">Ongoing</Link>
          </Menu.Item>
        </Menu>
      }
    </Sider>
  );
};

export default Sidebar;
