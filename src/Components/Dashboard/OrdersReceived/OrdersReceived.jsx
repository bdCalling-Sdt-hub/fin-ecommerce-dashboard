/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import { ConfigProvider, Table, Input, Select } from "antd";
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../../Redux/api/ordersApi";
import moment from "moment";

const OrdersReceived = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [placement, setPlacement] = useState(""); // Consider defaulting this to a known value or leave it as an empty string

  const { data: allOrders, isLoading, refetch } = useGetAllOrdersQuery();
  console.log("allOrders", allOrders?.data.result);

  const orderData = allOrders?.data.result;
  // Filter data based on search text
  const filteredData = useMemo(() => {
    if (!searchText) return orderData;

    return orderData.filter((item) => {
      return item.productIds.some((each) => {
        return each.productName
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
    });
  }, [orderData, searchText]);

  console.log(filteredData);

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
            <button
              key={item.id}
              className="mr-8 font-semibold text-md text-[#3399ff]"
            >
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
              prefix={
                <SearchOutlined className="text-[#97C6EA] font-bold text-lg mr-2" />
              }
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
            dataSource={filteredData}
            loading={isLoading}
            pagination={{ pageSize: 4 }}
            className="user-table"
            scroll={{ x: true }}
            columns={[
              {
                title: "S.ID",
                dataIndex: "index",
                render: (text, record, index) => (
                  <span className="text-[#3399FF]">{index + 1}</span>
                ),
                responsive: ["md"],
              },
              {
                title: "Name",
                dataIndex: "productName", // This may be used for quick column lookup or fallback
                render: (text, record) => {
                  console.log("record", record);

                  const product = record.productIds?.[0];
                  // Access the productName from the productIds array
                  const productName = product?.productName || "N/A";

                  return (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {product?.imageUlrs?.[0] && (
                        <img
                          src={product?.imageUlrs?.[0]}
                          alt={productName}
                          className="size-8 rounded-full mr-2"
                        />
                      )}
                      <Link
                        to={{
                          pathname: `/orders-received-details/${product.id}`,
                          state: { record },
                        }}
                      >
                        <span
                          style={{
                            color: "#3399ff",
                            fontWeight: 500,
                            fontSize: "16px",
                          }}
                        >
                          {productName}
                        </span>
                      </Link>
                    </div>
                  );
                },
              },
              {
                title: "Selling Price",
                dataIndex: "price",
                render: (text, record) => {
                  // Access the productName from the productIds array
                  const productPrice = record.productIds?.[0]?.price || "N/A";

                  return <span>{productPrice} Fcfa</span>;
                },
                responsive: ["md"],
              },
              {
                title: "Date",
                dataIndex: "createdAt",
                key: "createdAt", // Correct syntax for key
                render: (date) => moment(date).format("MMM DD, YYYY, h:mm A"), // Format the date
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
                    style={{ width: 160 }}
                    popupMatchSelectWidth={false}
                    placement={placement}
                    options={[
                      {
                        value: "new-order",
                        label: "New Order",
                      },
                      {
                        value: "process-order",
                        label: "Process Order",
                      },
                      {
                        value: "delivery-order",
                        label: "Delivery Order",
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
        </div>
      </ConfigProvider>
    </div>
  );
};

export default OrdersReceived;
