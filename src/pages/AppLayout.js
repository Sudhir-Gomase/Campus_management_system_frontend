import React from "react";
import { Layout } from "antd";
import Siderbar from "./Siderbar";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const { Content } = Layout;
const AppLayout = () => {
    const location = useLocation();
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Siderbar />
            <Layout>
            {
                (location?.pathname === '/login' || location?.pathname === '/signup') ? null :
                    <Navbar />
            }
                <Content style={{padding: 24, background: "#fff" }}>
                    <Outlet /> {/* Renders child routes */}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
