/* eslint-disable no-unused-vars */
import { ConfigProvider, Table } from "antd";
import { useAllUsersQuery } from "../../Redux/api/usersApi";

const columns = [
  {
    title: "S.ID",
    dataIndex: "serialId",
    responsive: ["md"], // Hide on smaller screens (below medium)
    render: (text, record, index) => index + 1,
  },
  {
    title: "Users Name",
    dataIndex: "fullName",
    render: (text, record) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* <img
          src={record.avatar}
          alt={record.customerName}
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            marginRight: 8,
          }}
        /> */}
        {text}
      </div>
    ),
    responsive: ["xs", "sm"], // Visible on small and extra-small screens
  },
  {
    title: "Email",
    dataIndex: "email",
    responsive: ["lg"], // Hide on screens smaller than large
  },
  {
    title: "Contact Number",
    dataIndex: "phone",
    responsive: ["md"], // Hide on smaller screens
  },
  {
    title: "Role",
    dataIndex: "role",
    render: (text, record) => (
      <span>{record.role.charAt(0).toUpperCase() + record.role.slice(1)}</span>
    ),
    responsive: ["xs", "sm", "md"], // Visible on all screen sizes
  },
];

const UserTable = () => {
  const { data: allUser, isLoading } = useAllUsersQuery();

  const userData = allUser?.data;

  console.log(userData);

  const onChange = (filters, extra) => {
    console.log("params", filters, extra);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#FAFAFA",
            headerColor: "#1F2852",
            colorBgContainer: "rgb(255,255,255)",
            colorText: "rgb(0,0,0)",
            headerSplitColor: "rgba(151, 198, 234, 1)",
          },
        },
      }}
    >
      <div className="w-full overflow-x-auto rounded-xl p-4">
        <Table
          columns={columns}
          dataSource={userData}
          loading={isLoading}
          pagination={{ pageSize: 5, responsive: true }}
          // pagination={{ pageSize: 5, showSizeChanger: true, responsive: true }}
          onChange={onChange}
          className="user-table"
          scroll={{ x: "100%" }} // Ensure horizontal scroll on small screens
        />
      </div>
    </ConfigProvider>
  );
};

export default UserTable;
