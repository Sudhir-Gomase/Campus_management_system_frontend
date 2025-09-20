import React, { useState, useEffect } from "react";
import { message, Modal, Radio, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchOverAllCompanyDataList, updateStatusOfCompany } from "../redux/slices/dataSlice";


function Student() {
  const dispatch = useDispatch()
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [companyId, setCompanyId] = useState(null)
  const [approvedValue, setApprovedValue] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
//   const { overAllCompanyListData } = useSelector((state) => state?.dataSlice);
const overAllCompanyListData =[]

  useEffect(() => {
    let queryParams = ''
    if (selectedStatus === 'approved') {
      queryParams += '?is_approved=true'
    } else if (selectedStatus === 'rejected') {
      queryParams += '?is_approved=false'
    }
    dispatch(fetchOverAllCompanyDataList(queryParams))
  }, [dispatch, selectedStatus])

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
      title: "Offer Type",
      dataIndex: "offer_type",
      key: "offer_type",
    },
    {
      title: "Preferred Location",
      dataIndex: "preferred_locations",
      key: "preferred_locations",
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
      title: "Status",
      dataIndex: "is_approved",
      key: "is_approved",
      render: (
        record
      ) => (
        <div>{record === 'true' ? 'Approved' : 'Rejected'}</div>
      )
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (_, record) => (
        <div onClick={() => { setIsModalVisible(true); setCompanyId(record?.company_id) }} style={{ display: "flex", gap: "8px", cursor: 'pointer', color: '#4b95a2', textDecoration: 'underline' }}>
          Edit Status
        </div>
      ),
    },
  ];


  const statusOptions = [
    { value: 'approved', label: "Approved" },
    { value: 'rejected', label: "Rejected" },
  ]

  const handleEdit = () => {
    dispatch(updateStatusOfCompany(`/${companyId}/${approvedValue}`)).unwrap().then((res) => {
      message.success('Status changed')
      setApprovedValue(null)
      setIsModalVisible(false)
      let queryParams = ''
      if (selectedStatus === 'approved') {
        queryParams += '?is_approved=true'
      } else if (selectedStatus === 'rejected') {
        queryParams += '?is_approved=false'
      }
      dispatch(fetchOverAllCompanyDataList(queryParams))
    })
  }
  return (
    <div style={{ margin: 16, border: ' 1px solid #dddddd', borderRadius: 10, padding: 10 }}>
        <div className="flex " style={{ justifyContent: 'space-between', width: '100%' }}>
                <h3>Student Table</h3>
                <div className="flex" style={{ gap: 10 }}>
                  {/* <div>
                    <Select
                      style={{ width: 150 }}
                      placeholder={`Select Status `}
                      onChange={(value) => {
                        setSelectedStatus(value)
                      }}
                      value={selectedStatus}
                      options={statusOptions || []}
                      allowClear
                    />
                  </div> */}
                </div>
              </div>
      <Table dataSource={overAllCompanyListData} columns={columns} pagination={{ pageSize: 5 }} />

      {/* <Modal
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        footer={null}
        title={'Edit Status'}
      >
        <Radio.Group
          value={approvedValue}
          onChange={(e) => {
            setApprovedValue(e.target.value)
          }}
        >
          <Radio value={true}>Approved</Radio>
          <Radio value={false}>Rejected</Radio>
        </Radio.Group>
        <div className="flex" style={{ gap: '10px', justifyContent: 'end' }}>
          <button style={{ padding: '7px 16px', border: '1px solid #4b95a2', color: ' #4b95a2', borderRadius: 5, backgroundColor: 'transparent', cursor: 'pointer' }} onClick={() => setIsModalVisible(false)}>Cancel</button>
          <button style={{ padding: '7px 16px', background: 'linear-gradient(135deg, #66cbea, #4b95a2)', border: 0, color: ' white', borderRadius: 5, cursor: 'pointer' }} onClick={handleEdit}>Submit</button>
        </div>
      </Modal> */}
    </div>
  );
}

export default Student;
