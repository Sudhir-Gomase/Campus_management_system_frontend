import React, { useState, useEffect } from "react";
import { message, Modal, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, downloadStudentTemplate, fetchAcademicYearData, fetchCompanyDataList, fetchDepartmentList, registerBulkEmployee, } from "../redux/slices/dataSlice";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from "../components/ConfirmationModal";


function Student() {
  const dispatch = useDispatch()
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [selectYear, setSelectYear] = useState('2024-2025')
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [studentId, setStudentId] = useState(null)
  const [selectedFileName, setSelectedFileName] = useState("") // <-- Add this line
  const { departmentList, companyListData, academicYearData } = useSelector((state) => state?.dataSlice);


  useEffect(() => {
    dispatch(fetchDepartmentList())
    dispatch(fetchCompanyDataList())
  }, [dispatch])

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

  useEffect(() => {
    if (departmentList?.length > 0) {
      setSelectedDepartment(departmentList?.[0]?.department_id)
    }
  }, [departmentList])

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
        <div onClick={() => { setDeleteModal(true); setStudentId(record?.student_id) }} style={{ display: "flex", gap: "8px", cursor: 'pointer', color: '#4b95a2', textDecoration: 'underline' }}>
          <MdDelete />
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

  const selectYearOptions = [
    { value: "2022-2023", label: "2022-2023" },
    { value: "2023-2024", label: "2023-2024" },
    { value: "2024-2025", label: "2024-2025" },
    { value: "2025-2026", label: "2025-2026" },
  ]

  const handleDownloadTemplete = () => {
    dispatch(downloadStudentTemplate()).unwrap().then((res) => {
      if (res) {
        const blob = new Blob([res], {
          type: "application/json",
        });

        //check only 1 columns for action delete
        //check employee_id name should be employee_id
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `template.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        message.error("Failed to download excel template");
      }
    })
  }
  // filepath: d:\Zaheer\campas-project\src\pages\Students.js
  const handleUploadEmployeeChange = async (event) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith(".csv")) {
      try {
        const formData = new FormData();
        formData.append("file", file); // key should match backend
        console.log("formData to send:", [...formData]);
        await dispatch(registerBulkEmployee({
          departmentId: selectedDepartment, // goes into query params
          file: formData,                   // goes as body
        })).unwrap();
        message.success("Successfully Uploaded the file.");
        event.target.value = "";
        setIsModalVisible(false)
        setSelectedFileName('')
        dispatch(fetchAcademicYearData(`?year=${selectYear}&department_id=${selectedDepartment}`))
      } catch (error) {
        message.error(error?.response?.data || "Upload failed");
        event.target.value = "";
      }
    }
  };

  const handleDeleteStudent = async () => {
    dispatch(deleteStudent(studentId)).unwrap().then((res) => {
      message.success("Student deleted successfully");
      setDeleteModal(false)
      dispatch(fetchAcademicYearData(`?year=${selectYear}&department_id=${selectedDepartment}`))
    }).catch((error) => {
      message.error(error?.response?.data || "Delete failed");
      setDeleteModal(false)
    })
  };

  return (
    <div>
      <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3>Student Table</h3>
        <div className="flex" style={{ gap: '10px', }}>
          <button style={{ padding: '7px 16px', border: '1px solid #4b95a2', color: ' #4b95a2', borderRadius: 5, backgroundColor: 'transparent', cursor: 'pointer' }} onClick={handleDownloadTemplete}>Download bulk upload template</button>
          <button style={{ padding: '7px 16px', background: 'linear-gradient(135deg, #66cbea, #4b95a2)', border: 0, color: ' white', borderRadius: 5, cursor: 'pointer' }} onClick={() => setIsModalVisible(true)}>Upload bulk students</button>
        </div>
      </div>

      <div style={{ border: ' 1px solid #dddddd', borderRadius: 10, padding: 10 }}>
        <div className="flex" style={{ gap: 10, display: 'flex', justifyContent: 'end' }}>
          <div>
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
              allowClear
            />
          </div>
        </div>
        <Table dataSource={academicYearData} columns={columns} pagination={{ pageSize: 5 }} />
      </div>
      <Modal
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedFileName('')
        }}
        footer={null}
        title={'Edit Status'}
      >
        <Select
          style={{ width: '100%' }}
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
        <div
          style={{
            border: '2px dashed #4b95a2',
            borderRadius: 8,
            padding: '24px 16px',
            margin: '16px 0',
            textAlign: 'center',
            background: '#f7fbfc',
            cursor: 'pointer',
            position: 'relative'
          }}
          onClick={() => document.getElementById('student-upload-input').click()}
        >
          <input
            type="file"
            accept=".csv"
            id="student-upload-input"
            style={{ display: 'none' }}
            onChange={e => {
              setSelectedFileName(e.target.files?.[0]?.name || "");
            }}
          />
          {selectedFileName ? (
            <span style={{ color: '#4b95a2', fontWeight: 500 }}>
              {selectedFileName}
            </span>
          ) : (
            <span style={{ color: '#aaa' }}>
              Click or drag CSV file here to upload
            </span>
          )}
        </div>
        <div className="flex" style={{ gap: 10, justifyContent: 'flex-end' }}>
          <button style={{ padding: '10px 16px', border: '1px solid #4b95a2', color: ' #4b95a2', borderRadius: 5, backgroundColor: 'transparent', cursor: 'pointer' }} onClick={() => { setIsModalVisible(false); setSelectedFileName('') }}>Cancel</button>
          <button
            style={{
              padding: '10px 16px',
              background: 'linear-gradient(135deg, #66cbea, #4b95a2)',
              border: 0,
              color: 'white',
              borderRadius: 5,
              cursor: 'pointer',
            }}
            onClick={() => {
              const input = document.getElementById('student-upload-input');
              if (input && input.files.length > 0) {
                handleUploadEmployeeChange({ target: input });
              } else {
                message.error("Please select a CSV file to upload.");
              }
            }}
          >
            Submit
          </button>
        </div>
      </Modal>

      <ConfirmationModal
        isVisible={deleteModal}
        onConfirm={handleDeleteStudent}
        message="Are you sure you want to delete this goal?"
        onCancel={() => {
          setDeleteModal(false);
        }}
      />
    </div>
  );
}

export default Student;
