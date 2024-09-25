import { useEffect, useState } from "react";
import axios from "axios";
import { ConfigProvider, Table, Tag } from "antd";

const columns = [
  {
    title: "S.ID",
    dataIndex: "serialId",
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
  },
  {
    title: "Joining Date",
    dataIndex: "joiningDate",
  },
  {
    title: "Contact Number",
    dataIndex: "contactNumber",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Category",
    key: "category",
    dataIndex: "category",
    render: (category) => {
      const isUser = category === "user";
      const tagColor = isUser ? "#A3D3F9" : "#3F5362";
      const textColor = isUser ? "black" : "white";

      return (
        <Tag
          color={tagColor}
          style={{ color: textColor, padding: "3px 12px", borderRadius: "4px" }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Tag>
      );
    },
    filters: [
      {
        text: "Merchant",
        value: "merchant",
      },
      {
        text: "User",
        value: "user",
      },
    ],
    onFilter: (value, record) => record.category.indexOf(value) === 0,
  },
];

const UserDetails = () => {
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
            headerBg: "rgba(151, 198, 234, 1)",
            headerColor: "rgba(26, 26, 26, 1)",
            marginXXS: 4,
            colorBgContainer: "#010515",
            colorText: "rgb(255, 255, 255)",
            headerSplitColor: "rgba(151, 198, 234, 1)",
            headerBorderRadius: 0,
            footerBg: "rgb(37,37,37)",
          },
        },
      }}
    >
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 15 }}
        onChange={onChange}
        className="user-table"
      />
    </ConfigProvider>
  );
};

export default UserDetails;
