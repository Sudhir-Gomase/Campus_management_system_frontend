
import React, { useEffect, useState } from "react";
import { message, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchOverAllCompanyForStudent, fetchSingleStudentData } from "../redux/slices/dataSlice";

function StudentDashboard() {
    const dispatch = useDispatch()
    const [companyId, setCompanyId] = useState(null)
    const [selectedStatus, setSelectedStatus] = useState('approved')
    const [isModalVisible, setIsModalVisible] = useState(false)
    const { overAllCompanyForStudentListData } = useSelector((state) => state?.dataSlice);

    const userDetails = JSON.parse(localStorage.getItem("userdetails"));

    useEffect(() => {
        dispatch(fetchOverAllCompanyForStudent(userDetails?.studentId))
        dispatch(fetchSingleStudentData(userDetails?.studentId))
    }, [userDetails?.studentId, dispatch])


    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Industry Type",
            dataIndex: "industry_type",
            key: "industry_type",
        },
        {
            title: "Headquarters Location",
            dataIndex: "headquarters_location",
            key: "headquarters_location",
        },
        {
            title: "Interview Process",
            dataIndex: "interview_process",
            key: "interview_process",
        },
        {
            title: "CTC Offered",
            dataIndex: "ctc_offered",
            key: "ctc_offered",
        },
        {
            title: "Website",
            dataIndex: "website_url",
            key: "website_url",
            render: (
                record
            ) => (
                <a style={{ color: '#4b95a2', }} href={record} target='blank'>{record}</a>
            )
        },
        {
            title: "Action",
            key: "action",
            width: 150,
            render: (_, record) => (
                <div onClick={() => { setIsModalVisible(true); setCompanyId(record?.company_id) }} style={{ display: "flex", gap: "8px", cursor: 'pointer', color: '#4b95a2', textDecoration: 'underline' }}>
                    Apply
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
                    <h3>Company Table</h3>
                    <div className="flex" style={{ gap: 10 }}>
                        {/* <div>
                            <Select
                                style={{ width: 150 }}
                                placeholder={`Select Status`}
                                onChange={(value) => {
                                    setSelectedStatus(value)
                                }}
                                value={selectedStatus}
                                options={statusOptions || []}
                            />
                        </div> */}
                    </div>
                </div>
                <Table dataSource={overAllCompanyForStudentListData} columns={columns} pagination={{ pageSize: 5 }} />
            </div>
        </div>
    );
}

export default StudentDashboard;
