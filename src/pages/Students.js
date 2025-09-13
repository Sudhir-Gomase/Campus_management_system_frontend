// import React, { useState } from "react";
// import "../styles/login.css";
// import { Select } from "antd";

// function Students() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "full_name",
//       key: "full_name",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Placement Status",
//       dataIndex: "placement_status",
//       key: "placement_status",
//     },
//   ];

//   return (
//     <div style={{ margin: 16, border: ' 1px solid #dddddd', borderRadius: 10, padding: 10 }}>
//       <div className="flex " style={{ justifyContent: 'space-between', width: '100%' }}>
//         <h3>Student Table</h3>
//         <div className="flex" style={{ gap: 10 }}>
//           <div>
//             <Select
//               style={{ width: 150 }}
//               placeholder={`Select Status`}
//               onChange={(value) => {
//                 setSelectedStatus(value)
//               }}
//               value={selectedStatus}
//               options={statusOptions || []}
//             />
//           </div>
//           <div>
//             <Select
//               style={{ width: 150 }}
//               placeholder={`Select Company`}
//               onChange={(value) => {
//                 setSelectedCompany(value)
//               }}
//               value={selectedCompany}
//               options={companyListData?.data?.map((item) => ({
//                 value: item?.company_id,
//                 label: item?.name
//               })) || []}
//             />
//           </div>
//         </div>
//       </div>
//       <Table dataSource={academicYearData} columns={columns} pagination={{ pageSize: 5 }} />
//     </div>
//   );
// }

// export default Students;
