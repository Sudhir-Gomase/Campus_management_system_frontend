import React, { useEffect, useState } from "react";
import DonutChart from "./DonutChart";
import { message, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchAcademicYearData, fetchCompanyDataList, fetchDepartmentList, fetchDountCount } from "../redux/slices/dataSlice";

function Dashboard() {
  const dispatch = useDispatch()
  const [selectYear, setSelectYear] = useState('2024-2025')
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const { dountChart, departmentList, companyListData, academicYearData } = useSelector((state) => state?.dataSlice);

  useEffect(() => {
    dispatch(fetchDepartmentList())
    dispatch(fetchCompanyDataList())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchDountCount(selectedDepartment))
  }, [selectedDepartment])

  useEffect(() => {
    if (departmentList?.length > 0) {
      setSelectedDepartment(departmentList?.[0]?.department_id)
    }
  }, [departmentList])

  useEffect(() => {
    if (selectYear) {
      let queryParams = `?`;
      if (selectYear) {
        queryParams += `year=${selectYear}&`;
      }
      if (selectedCompany) {
        queryParams += `company_id=${selectedCompany}&`;
      }
      if (selectedDepartment) {
        queryParams += `department_id=${selectedDepartment}&`;
      }
      if (selectedStatus) {
        queryParams += `status=${selectedStatus}&`;
      }

      queryParams = queryParams.slice(0, -1);

      dispatch(fetchAcademicYearData(queryParams))
    }
  }, [dispatch, selectYear, selectedCompany, selectedDepartment, selectedStatus])

  const columns = [
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Placement Status",
      dataIndex: "placement_status",
      key: "placement_status",
    },
  ];

  const dataValues = [dountChart.placed ?? 0, dountChart.unplaced ?? 0];

  const selectYearOptions = [
    { value: "2022-2023", label: "2022-2023" },
    { value: "2023-2024", label: "2023-2024" },
    { value: "2024-2025", label: "2024-2025" },
    { value: "2025-2026", label: "2025-2026" },
  ]

  const statusOptions = [
    { value: "applied", label: "Applied" },
    { value: "shortlisted", label: "Shortlisted" },
    { value: "interviewed", label: "Interviewed" },
    { value: "selected", label: "Selected" },
    { value: "rejected", label: "Rejected" },
  ]

  return (
    <div className="form-container">
      <h2>Dashboard</h2>
      <div className="flex " style={{ gap: 20, float: 'right' }}>
        <div>
          <h4 style={{ marginBottom: 10 }}>Select Year</h4>
          <Select
            style={{ width: 150 }}
            placeholder={`Select Year`}
            onChange={(value) => {
              setSelectYear(value)
            }}
            value={selectYear}
            options={selectYearOptions || []}
          />
        </div>
        <div>
          <h4 style={{ marginBottom: 10 }}>Select Department</h4>
          <Select
            style={{ width: 150 }}
            placeholder={`Select Department`}
            onChange={(value) => {
              setSelectedDepartment(value)
            }}
            value={selectedDepartment}
            options={departmentList?.map((item) => ({
              value: item?.department_id,
              label: item?.code
            })) || []}
          />
        </div>
      </div>
      <div style={{ width: '330px', marginTop: 20 }}>
        <DonutChart labels={["placed", "unplaced"]} datavalues={dataValues} />
      </div>
      <div style={{ margin: 16, border:' 1px solid #dddddd', borderRadius:10, padding:10 }}>
        <div className="flex " style={{ justifyContent: 'space-between', width: '100%' }}>
          <h3>Student Table</h3>
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
            <div>
              <Select
                style={{ width: 150 }}
                placeholder={`Select Company`}
                onChange={(value) => {
                  setSelectedCompany(value)
                }}
                value={selectedCompany}
                options={companyListData?.data?.map((item) => ({
                  value: item?.company_id,
                  label: item?.name
                })) || []}
              />
            </div>
          </div>
        </div>
        <Table dataSource={academicYearData} columns={columns} pagination={{ pageSize: 5 }} />
      </div>
    </div>
  );
}

export default Dashboard;
