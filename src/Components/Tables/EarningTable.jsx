// import React, { useState } from "react";
// import {
//   Button,
//   ConfigProvider,
//   Input,
//   Modal,
//   Space,
//   Table,
//   Tooltip,
// } from "antd";
// import { DeleteOutlined } from "@ant-design/icons";
// import Column from "antd/es/table/Column";
// import JustModal from "../../utils/Modal";

// const data = [
//   {
//     serialNo: "#1",
//     company: "Company 1",
//     // logo: earningImage1,
//     amount: -731.0,
//     timeAgo: "2h 22mim ago",
//   },
//   {
//     serialNo: "#2",
//     company: "Company 2",
//     // logo: earningImage2,
//     amount: 587.0,
//     timeAgo: "6h 37mim ago",
//   },
//   {
//     serialNo: "#3",
//     company: "Company 3",
//     // logo: earningImage3,
//     amount: 420.0,
//     timeAgo: "53min ago",
//   },
//   {
//     serialNo: "#4",
//     company: "Company 4",
//     // logo: earningImage1,
//     amount: 333.0,
//     timeAgo: "14h 19min ago",
//   },
//   {
//     serialNo: "#5",
//     company: "Company 5",
//     // logo: earningImage3,
//     amount: -661.0,
//     timeAgo: "1h 17min ago",
//   },
//   {
//     serialNo: "#6",
//     company: "Company 6",
//     // logo: earningImage2,
//     amount: 739.0,
//     timeAgo: "13h 56min ago",
//   },
//   {
//     serialNo: "#7",
//     company: "Company 7",
//     // logo: earningImage1,
//     amount: -663.0,
//     timeAgo: "5h 29min ago",
//   },
//   {
//     serialNo: "#8",
//     company: "Company 8",
//     // logo: earningImage2,
//     amount: 473.0,
//     timeAgo: "59min ago",
//   },
//   {
//     serialNo: "#9",
//     company: "Company 9",
//     // logo: earningImage3,
//     amount: -308.0,
//     timeAgo: "2min ago",
//   },
//   {
//     serialNo: "#10",
//     company: "Company 10",
//     // logo: earningImage1,
//     amount: 261.0,
//     timeAgo: "7h 1min ago",
//   },
// ];

// const EarningTable = () => {
//   const [profileModalOpen, setProfileModalOpen] = useState(false);

//   const onView = () => {
//     console.log("On View Function");
//     setProfileModalOpen(true);
//   };

//   const renderCompany = (text, record) => (
//     <div style={{ display: "flex", alignItems: "center" }}>
//       <img
//         src={record.logo}
//         alt={record.company}
//         style={{ width: "25px", height: "25px", marginRight: "10px" }}
//       />
//       <span>{record.company}</span>
//     </div>
//   );

//   const renderAmount = (value) => {
//     const amountStyle = {
//       color: value < 0 ? "#E4414E" : "#29606C",
//     };
//     const formattedValue = `$${Math.abs(value)}`;
//     return (
//       <span style={amountStyle}>
//         {value < 0 ? `-$${Math.abs(value)}` : formattedValue}
//       </span>
//     );
//   };

//   const onDelete = () => {
//     console.log("Clicked On Delete");
//   };

//   return (
//     <div className="rounded-lg">
//       <ConfigProvider
//         theme={{
//           components: {
//             Modal: {
//               contentBg: "rgb(74, 74, 74)",
//               colorIcon: "#e1e1e1",
//               borderRadiusLG: 0,
//             },
//           },
//         }}
//       >
//         <JustModal
//           width={500}
//           showModal={profileModalOpen}
//           setShowModal={setProfileModalOpen}
//         >
//           <div className="rounded-xl p-4 flex flex-col items-center justify-center gap-32 mt-10">
//             <div>
//               <p className="text-[#29606C] text-3xl font-semibold text-center mb-7">
//                 Are you sure!
//               </p>
//               <p className="text-white text-2xl">
//                 You want to delete this transaction ?
//               </p>
//             </div>
//             <button
//               onClick={onDelete}
//               className="bg-[#dd1122] px-40 py-4 rounded text-[#e1e1e1] text-xl font-semibold"
//             >
//               Confirm
//             </button>
//           </div>
//         </JustModal>
//       </ConfigProvider>
//       <div className=" mx-auto py-3 bg-[#1D1D1D] shadow-md rounded-lg">
//         <h1 className="text-2xl p-2 font-bold text-[#29606C]">Transactions</h1>
//         <div className="mx-auto bg-[#1D1D1D] shadow-md rounded-lg">
//           <ConfigProvider
//             theme={{
//               components: {
//                 Table: {
//                   headerBg: "rgb(221, 17, 34)",
//                   headerSplitColor: "rgb(221, 17, 34)",
//                   colorBgContainer: "rgb(29, 29, 29)",
//                   headerBorderRadius: 0,
//                 },
//                 Pagination: {
//                   colorText: "rgb(255, 255, 255)",
//                 },
//               },
//             }}
//           >
//             <Table dataSource={data} pagination={{ pageSize: 5 }}>
//               <Column title="S.ID" dataIndex="serialNo" key="serialNo" />
//               {/* <Column title="Transactions" dataIndex="company" key="company" /> */}
//               <Column
//                 title="Transactions"
//                 dataIndex="company"
//                 key="company"
//                 render={renderCompany}
//               />
//               <Column title="Time" dataIndex="timeAgo" key="timeAgo" />
//               <Column
//                 title="Amount"
//                 dataIndex="amount"
//                 key="amount"
//                 render={(text, record) => renderAmount(text)}
//               />
//               <Column
//                 title="Action"
//                 key="action"
//                 render={(_, record) => (
//                   <Space size="middle">
//                     <Tooltip placement="left" title="Delete this transaction">
//                       <Button
//                         style={{
//                           background: "#4a4a4a",
//                           border: "none",
//                           color: "#1d1d1d",
//                         }}
//                         onClick={onView}
//                       >
//                         <DeleteOutlined style={{ fontSize: "24px" }} />
//                       </Button>
//                     </Tooltip>
//                   </Space>
//                 )}
//               />
//             </Table>
//           </ConfigProvider>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default EarningTable;
