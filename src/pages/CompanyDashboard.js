
import React, { useEffect, useState } from "react";
import { Button, Input, message, Modal, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { companyIdApplications, createnotification, getNotficationTemplate, updateStudentStatus } from "../redux/slices/dataSlice";

function CompanyDashboard() {
    const dispatch = useDispatch()
    const [selectedStatus, setSelectedStatus] = useState(null)
    const { companyIdApplicationsData, notficationTemplateData } = useSelector((state) => state?.dataSlice);
    const userDetails = JSON.parse(localStorage.getItem("userdetails"));
    const [modalVisible, setModalVisible] = useState(false);
    const [modalRecord, setModalRecord] = useState(null);
    const [modalStatus, setModalStatus] = useState(null);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        dispatch(companyIdApplications({ id: userDetails?.companyId, status: selectedStatus }))
    }, [userDetails?.companyId, selectedStatus, dispatch])

    useEffect(() => {
        if (notficationTemplateData?.template_message) {
            setModalMessage(notficationTemplateData.template_message);
        }
    }, [notficationTemplateData]);

    const handleApplyClicked = (record) => {
        setModalRecord(record);
        setModalStatus(null);
        setModalMessage("");
        setModalVisible(true);
    }

    const handleModalSubmit = async () => {
        if (!modalStatus) {
            message.error("Please select a status.");
            return;
        }
        try {
            const requestedData = {
                studentId: modalRecord.student_id,
                companyId: userDetails.companyId,
                message: modalMessage
            }

            await dispatch(createnotification(requestedData)).unwrap();
            await dispatch(updateStudentStatus({
                studentId: modalRecord.student_id,
                id: userDetails.companyId,
                status: modalStatus,
            })).unwrap();
            message.success("Status updated successfully");
            setModalVisible(false);
            dispatch(companyIdApplications({ id: userDetails?.companyId, status: selectedStatus }));
        }
        catch (error) {
            message.error("Failed to update status. Please try again.");
        }
    };

    const columns = [
        {
            title: "Student Name",
            dataIndex: "full_name",
            key: "full_name",
        },
        {
            title: "Phone Number",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Department",
            dataIndex: "department_name",
            key: "department_name",
        },
        {
            title: "10th Marks",
            dataIndex: "marks_10th",
            key: "marks_10th",
        },
        {
            title: "12th Marks",
            dataIndex: "marks_12th",
            key: "marks_12th",
        },
        {
            title: "UG Marks",
            dataIndex: "marks_ug",
            key: "marks_ug",
        },
        {
            title: "Backlogs",
            dataIndex: "backlogs",
            key: "backlogs",
        },
        {
            title: "Applied At",
            dataIndex: "applied_at",
            key: "applied_at",
            render: (
                record
            ) => (
                <div>
                    {new Date(record).toLocaleDateString("en-GB", {
                        day: "2-digit", month: "2-digit", year: "numeric"
                    })}
                </div>
            )
        },
        {
            title: "Placement Status",
            dataIndex: "placement_status",
            key: "placement_status",
            render: (record) => {
                let color = "#4b95a2";
                if (record === "applied") color = "#1890ff";
                else if (record === "shortlisted") color = "#faad14";
                else if (record === "interviewed") color = "#13c2c2";
                else if (record === "selected") color = "#52c41a";
                else if (record === "rejected") color = "#f5222d";
                return (
                    <div style={{ color, fontWeight: 500, textTransform: 'capitalize' }}>{record}</div>
                );
            }
        },
        {
            title: "Action",
            key: "action",
            width: 150,
            render: (_, record) => (
                <div onClick={() => handleApplyClicked(record)} style={{ display: "flex", gap: "8px", cursor: 'pointer', color: '#4b95a2', textDecoration: 'underline' }}>
                    Change Status
                </div>
            ),
        },
    ];
    const statusOptions = [
        { value: "applied", label: "Applied" },
        { value: "shortlisted", label: "Shortlisted" },
        { value: "interviewed", label: "Interviewed" },
        { value: "selected", label: "Selected" },
        { value: "rejected", label: "Rejected" },
    ]

    return (
        <div className="form-container">
            <div style={{ marginTop: 16, border: ' 1px solid #dddddd', borderRadius: 10, padding: 10 }}>
                <div className="flex " style={{ justifyContent: 'space-between', width: '100%' }}>
                    <h3>Students Table</h3>
                    <div className="flex" style={{ gap: 10 }}>
                        <div>
                            <Select
                                style={{ width: 150 }}
                                placeholder={`Select Status`}
                                onChange={(value) => {
                                    setSelectedStatus(value)
                                }}
                                value={selectedStatus}
                                options={statusOptions || []}
                                allowClear
                            />
                        </div>
                    </div>
                </div>
                <Table dataSource={companyIdApplicationsData} columns={columns} pagination={{ pageSize: 5 }} />
            </div>
            <Modal
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                title="Change Student Status"
                footer={null}
            >
                <div style={{ marginBottom: 16 }}>
                    <label style={{ fontWeight: 500 }}>Select Status</label>
                    <Select
                        style={{ width: "100%", marginTop: 8 }}
                        placeholder="Select Status"
                        value={modalStatus}
                        options={statusOptions}
                        onChange={(value) => { setModalStatus(value); dispatch(getNotficationTemplate(value)) }}
                    />
                </div>
                {modalStatus && (
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ fontWeight: 500 }}>Message</label>
                        <Input.TextArea
                            rows={3}
                            placeholder="Enter message"
                            value={modalMessage}
                            onChange={e => setModalMessage(e.target.value)}
                        />
                    </div>
                )}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                    <button type='button' className="button-primary" onClick={() => setModalVisible(false)}>Cancel</button>
                    <button type='button' className='button-secondary' onClick={handleModalSubmit}>Submit</button>
                </div>
            </Modal>
        </div>
    );
}

export default CompanyDashboard;
