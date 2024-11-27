import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { ConfigProvider, Modal, Table, Input, Button, Upload, Switch, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const OrdersReceived = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [placement, setPlacement] = useState(''); // Consider defaulting this to a known value or leave it as an empty string

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/orders.json");
        setData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on search text
  const filteredData = useMemo(() => {
    if (!searchText) return data;
    return data.filter((item) => item.productName.toLowerCase().includes(searchText.toLowerCase()));
  }, [data, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  // Handle placement change for dropdown (if needed)
  const placementChange = (e) => {
    setPlacement(e.target.value); // Assuming you're using this somewhere for the dropdowns
  };

  // Order status list (with a key prop for React)
  const status = [
    {
      id: 1,
      name: "New Order",
    },
    {
      id: 2,
      name: "Process Order",
    },
    {
      id: 3,
      name: "Delivery Order",
    },
  ];

  return (
    <div>
      {/* Status buttons */}
      <div className="flex justify-between items-center mb-10">
        <div>
          {status.map((item) => (
            <button key={item.id} className="mr-8 font-semibold text-md text-[#3399ff]">
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Search and header */}
      <div className="flex justify-between p-6 bg-[#D3E6F9] rounded">
        <h1 className="text-3xl font-bold text-black">Orders Delivery Lists</h1>
        <div className="flex gap-4 items-center">
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  colorTextPlaceholder: "rgb(0, 0, 0,0.5)",
                  colorBgContainer: "white",
                },
              },
            }}
          >
            <Input
              placeholder="Search..."
              value={searchText}
              onChange={(e) => onSearch(e.target.value)}
              className="text-base font-semibold"
              prefix={<SearchOutlined className="text-[#97C6EA] font-bold text-lg mr-2" />}
              style={{
                width: 280,
                padding: "8px 16px",
                backgroundColor: "#F3F3F3",
                border: "1px solid white",
                color: "#010515",
              }}
            />
          </ConfigProvider>
        </div>
      </div>

      {/* Data table */}
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#F3F3F3",
              headerColor: "black",
              colorBgContainer: "rgb(255,255,255)",
              colorText: "rgb(0,0,0)",
              headerSplitColor: "rgba(151, 198, 234, 1)",
            },
          },
        }}
      >
        <div className="w-full overflow-x-auto border-2 border-none ">
          <Table
            columns={[
              {
                title: "S.ID",
                dataIndex: "index",
                render: (text, record, index) => <span>{index + 1}</span>,
                responsive: ["md"],
              },
              {
                title: "Name",
                dataIndex: "productName",
                render: (text, record) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={record.images[0]}
                      alt={record.productName}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        marginRight: 8,
                      }}
                    />
                    <NavLink to={`/orders-received-details/${record.id}`}>
                      <span
                        style={{
                          color: "#3399ff",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "17px",
                        }}
                      >
                        {text}
                      </span>
                    </NavLink>
                  </div>
                ),
                responsive: ["sm"],
              },
              {
                title: "Selling Price",
                dataIndex: "price",
                responsive: ["md"],
              },
              {
                title: "Date",
                dataIndex: "orderData",
                responsive: ["sm"],
              },
              {
                title: "Status",
                dataIndex: "status",
                responsive: ["sm"],
              },
              {
                title: "Actions",
                responsive: ["sm"],
                render: () => (
                  <Select
                    defaultValue="Mark as"
                    style={{ width: 120 }}
                    popupMatchSelectWidth={false}
                    placement={placement}
                    options={[
                      {
                        value: 'new-order',
                        label: 'New Order',
                      },
                      {
                        value: 'process-order',
                        label: 'Process Order',
                      },
                      {
                        value: 'delivery-order',
                        label: 'Delivery Order',
                      },
                    ]}
                  />
                ),
              },
            ]}
            dataSource={filteredData}
            loading={loading}
            pagination={{ pageSize: 4 }}
            className="user-table"
            scroll={{ x: true }}
          />
        </div>
      </ConfigProvider>
    </div>
  );
};

export default OrdersReceived;
