import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  WechatWorkOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { FaGraduationCap  } from "react-icons/fa";
import { HiOutlineOfficeBuilding } from "react-icons/hi";


const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider
      collapsible
      theme="dark"
      style={{ minHeight: "100vh" }}
    >
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
      <Menu mode="inline" defaultSelectedKeys={["1"]}>
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
    </Sider>
  );
};

export default Sidebar;
