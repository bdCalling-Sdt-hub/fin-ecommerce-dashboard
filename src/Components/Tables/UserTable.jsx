/* eslint-disable no-unused-vars */
import { Button, ConfigProvider, Table } from "antd";
import { useAllUsersQuery } from "../../Redux/api/usersApi";
import { useEffect, useState } from "react";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";



const UserTable = () => {
  // const { data: allUser, isLoading } = useAllUsersQuery();

  // const userData = allUser?.data;

  const [data, setData] = useState([]);
  console.log(data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("data/userData.json");
        const recentData = response.data?.slice(0, 5);

        setData(recentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const onChange = (filters, extra) => {
    console.log("params", filters, extra);
  };

  const handleDelete = (id)=>{
    console.log('id', id)
    if(id){
      Swal.fire({
        title: "User Deleted Successfully!",
        text: "The user has been deleted!.",
        icon: "success",
      });
    }

  }

  const columns = [
    {
      title: "S.ID",
      dataIndex: "serialId",
      responsive: ["md"], // Hide on smaller screens (below medium)
      render: (text, record, index) => index + 1,
    },
    {
      title: "Acount Email",
      dataIndex: "email",
      responsive: ["xs", "sm"], // Visible on small and extra-small screens
    },
    {
      title: "Country/Region",
      dataIndex: "countryName",
      responsive: ["lg"], // Hide on screens smaller than large
    },
    {
      title: "Date",
      dataIndex: "createdAt",
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
    {
      title: "Action",
      render: (_, record) => {
        // console.log('recordsss', record); // Log the record for debugging
    
        return (
          <Button
            onClick={() => handleDelete(record.serialId)}
            style={{
              border: "none",
              background: "transparent",
              boxShadow: "none",
            }}
          >
            <RiDeleteBin6Line />
          </Button>
        );
      },
    }
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#18191B",
            headerColor: "#E6C379",
            colorBgContainer: "rgb(255,255,255)",
            colorText: "rgb(0,0,0)",
            headerSplitColor: "rgba(151, 198, 234, 1)",
          },
        },
      }}
    >
      <div className="w-full overflow-x-auto">
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{ pageSize: 5, responsive: true }}
          // pagination={{ pageSize: 5, showSizeChanger: true, responsive: true }}
          onChange={onChange}
          className="user-table"
          scroll={{ x: "100%" }}

        />
      </div>
    </ConfigProvider>
  );
};

export default UserTable;
