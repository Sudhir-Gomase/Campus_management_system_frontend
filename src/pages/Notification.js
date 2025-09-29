import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotificationById, getNotification, getNotificationById } from "../redux/slices/dataSlice";
import { Modal } from "antd";

function Notification() {
    const dispatch = useDispatch();
    const { getNotificationData, getNotificationDataId } = useSelector((state) => state?.dataSlice);
    const userDetails = JSON.parse(localStorage.getItem("userdetails"));

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);

    useEffect(() => {
        dispatch(getNotification({ id: userDetails?.studentId }));
    }, [userDetails?.studentId, dispatch]);

    const handleViewDetails = async (companyId) => {
        await dispatch(getNotificationById({ id: userDetails?.studentId, companyId }));
        setModalVisible(true);
    }

    return (
        <div style={{ margin: "40px auto", }}>
            <h2 style={{ color: "#4b95a2", marginBottom: 24 }}>Notifications</h2>
            {(!getNotificationData || getNotificationData.length === 0) ? (
                <div style={{ color: "#888", textAlign: "center" }}>No notifications found.</div>
            ) : (
                getNotificationData.map((item) => (
                    <div
                        key={item.notification_id}
                        style={{
                            border: "1px solid #e0e0e0",
                            borderRadius: 8,
                            padding: 20,
                            marginBottom: 18,
                            background: "#f7fbfc",
                            boxShadow: "0 2px 8px #4b95a211",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <div>
                            <div style={{ fontWeight: 600, color: "#4b95a2", marginBottom: 8 }}>
                                {item.company_name}
                            </div>
                            <div style={{ color: "#333", fontSize: 16 }}>
                                {item.message_body}
                            </div>
                            <div style={{ color: "#aaa", fontSize: 12, marginTop: 8 }}>
                                {new Date(item.updated_at).toLocaleString()}
                            </div>
                        </div>
                        <button
                            style={{
                                background: "#4b95a2",
                                color: "#fff",
                                border: "none",
                                borderRadius: 5,
                                padding: "8px 16px",
                                cursor: "pointer",
                                marginLeft: 16,
                                fontWeight: 500
                            }}
                            onClick={() => {
                                handleViewDetails(item.company_id);
                                setSelectedCompany(item.company_name);
                            }}
                        >
                            View Details
                        </button>
                    </div>
                ))
            )}

            <Modal
                open={modalVisible}
                onCancel={() => { setModalVisible(false); dispatch(clearNotificationById()) }}
                footer={null}
                title={selectedCompany ? `Notifications from ${selectedCompany}` : ""}
            >
                {getNotificationDataId.length === 0 ? (
                    <div style={{ color: "#888", textAlign: "center" }}>No notifications for this company.</div>
                ) : (
                    getNotificationDataId.map((item) => (
                        <div
                            key={item.notification_id}
                            style={{
                                borderBottom: "1px solid #eee",
                                padding: "12px 0"
                            }}
                        >
                            <div style={{ color: "#333", fontSize: 15, marginBottom: 4 }}>
                                {item.message_body}
                            </div>
                            <div style={{ color: "#aaa", fontSize: 12 }}>
                                {new Date(item.updated_at).toLocaleString()}
                            </div>
                        </div>
                    ))
                )}
            </Modal>
        </div>
    );
}

export default Notification;