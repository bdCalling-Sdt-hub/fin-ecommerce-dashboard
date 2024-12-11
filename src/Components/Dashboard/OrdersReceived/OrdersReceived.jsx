/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import { ConfigProvider, Table, Input, Select } from "antd";
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../../Redux/api/ordersApi";
import moment from "moment";
import { toast } from "sonner";

const OrdersReceived = () => {
  const [searchText, setSearchText] = useState("");
  const [placement, setPlacement] = useState("");

  const { data: allOrders, isLoading, refetch } = useGetAllOrdersQuery();
  // console.log("allOrders", allOrders?.data.result);
  const [updateStatus] = useUpdateOrderStatusMutation();

  const mappedOrders = allOrders?.data.result.map((order) => {
    return {
      orderId: order._id,
      userId: order.userId,
      totalQuantity: order.quantity,
      orderPaymentStatus: order.orderPaymentStatus,
      status: order.status,
      totalAmount: order.totalAmount,
      products: order.productIds.map((productId, index) => ({
        productId: productId,
        productName: order.productInfoId?.name,
        price: order.productInfoId?.price,
        quantity: order.quantity,
      })),
      createdAt: new Date(order.createdAt).toLocaleString(),
    };
  });

  // console.log("mapped", mappedOrders);

  const orderData = allOrders?.data.result;
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

  // console.log("filteredData", filteredData);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const placementChange = (e) => {
    setPlacement(e.target.value);
  };

  // const status = [
  //   {
  //     id: 1,
  //     name: "New Order",
  //   },
  //   {
  //     id: 2,
  //     name: "Process Order",
  //   },
  //   {
  //     id: 3,
  //     name: "Delivery Order",
  //   },
  // ];

  // Handling the order status update
  const handleStatusChange = async (orderId, newStatus) => {
    console.log({ newStatus });
    try {
      await updateStatus({ id: orderId, data: { status: newStatus } }).unwrap();
      toast.success(`Order status updated to ${newStatus}`);
      refetch();
    } catch (error) {
      toast.error("Failed to update order status");
      console.log(error);
    }
  };

  return (
    <div>
      {/* Status buttons */}
      {/* <div className="flex justify-between items-center mb-10">
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
      </div> */}

      {/* Search and header */}
      <div className="flex justify-between p-6 bg-[#D3E6F9] rounded">
        <h1 className="text-3xl font-bold text-black">Orders Lists</h1>
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
                dataIndex: "name",
                render: (text, record) => {
                  console.log("record", record);

                  const product = record.productInfoId;
                  console.log("aasdfsdfsdf", product);
                  const productName = product?.name;
                  return (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {/* Check if the product has an image URL and render it */}
                      {product?.images?.[0] && (
                        <img
                          src={`http://192.168.12.235:8008/${product.images[0]}`}
                          alt={productName} // Alt text for the image
                          className="size-8 rounded-full mr-2"
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                          }} // Example styling for the image
                        />
                      )}
                      <Link
                        to={`/orders-received-details/${product?._id}`}
                        state={record}
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
                  const product = record.productInfoId;
                  const productPrice = product?.price || "N/A";

                  return <span>{productPrice} Fcfa</span>;
                },
                responsive: ["md"],
              },
              {
                title: "Date",
                dataIndex: "createdAt",
                key: "createdAt",
                render: (date) => moment(date).format("MMM DD, YYYY, h:mm A"),
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
                render: (_, record) => {
                  // console.log("selected record", record); // Logs the record to the console
                  return (
                    <Select
                      defaultValue="Mark as"
                      style={{ width: 160 }}
                      popupMatchSelectWidth={false}
                      placement={placement}
                      onChange={(value) =>
                        handleStatusChange(record._id, value)
                      }
                      options={[
                        {
                          value: "New order",
                          label: "New Order",
                        },
                        {
                          value: "In the procss",
                          label: "Process Order",
                        },
                        {
                          value: "Odrer delivered",
                          label: "Delivery Order",
                        },
                      ]}
                    />
                  );
                },
              },
            ]}
          />
        </div>
      </ConfigProvider>
    </div>
  );
};

export default OrdersReceived;
