import React, { useEffect, useState } from "react";
import { message, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { studentOnGoingProcess } from "../redux/slices/dataSlice";

function StudentOngoingProcess() {
    const dispatch = useDispatch()
    const [selectedStatus, setSelectedStatus] = useState('applied')
    const { studentOnGoingProcessData } = useSelector((state) => state?.dataSlice);

    const userDetails = JSON.parse(localStorage.getItem("userdetails"));

    useEffect(() => {
        dispatch(studentOnGoingProcess(userDetails?.studentId))
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
                    <div style={{ color, fontWeight: 500 }}>{record}</div>
                );
            }
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
                        <div>
                            <Select
                                style={{ width: 150 }}
                                placeholder={`Select Status`}
                                onChange={(value) => {
                                    setSelectedStatus(value)
                                }}
                                value={selectedStatus}
                                options={statusOptions || []}
                            />
                        </div>
                    </div>
                </div>
                <Table dataSource={studentOnGoingProcessData?.filter((item)=> item?.placement_status === selectedStatus)} columns={columns} pagination={{ pageSize: 5 }} />
            </div>
        </div>
    );
}

export default StudentOngoingProcess;
