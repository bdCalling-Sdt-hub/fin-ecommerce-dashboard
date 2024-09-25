import React, { useEffect, useState } from "react";
import axios from "axios";
import { ConfigProvider, Table, Tag } from "antd";

const columns = [
  {
    title: "S.ID",
    dataIndex: "serialId",
    responsive: ["md"], // Hide on smaller screens if needed
  },
  {
    title: "Customer Name",
    dataIndex: "customerName",
    render: (text, record) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={record.avatar}
          alt={record.customerName}
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            marginRight: 8,
          }}
        />
        {text}
      </div>
    ),
    responsive: ["sm"], // Adjust visibility based on screen size
  },
  {
    title: "Email",
    dataIndex: "email",
    responsive: ["md"], // Hide on smaller screens if needed
  },
  {
    title: "Date",
    dataIndex: "joiningDate",
    responsive: ["sm"], // Adjust visibility based on screen size
  },
];

const UserTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/userData.json");
        console.log("response", response?.data);
        setData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onChange = (filters, extra) => {
    console.log("params", filters, extra);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "rgb(1,53,100)",
            headerColor: "rgba(255,255,255,0.88)",
            colorBgContainer: "rgb(255,255,255)",
            colorText: "rgb(0,0,0)",
            headerSplitColor: "rgba(151, 198, 234, 1)",
            // borderRadius: 24,
          },
        },
      }}
    >
      <div className="w-full overflow-x-auto border-2 border-[#013564] rounded-xl">
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{ pageSize: 5 }}
          onChange={onChange}
          className="user-table"
          scroll={{ x: true }} // Allows horizontal scrolling for overflow content
        />
      </div>
    </ConfigProvider>
  );
};

export default UserTable;
