import React from "react";
import { useState, useEffect, useMemo } from "react";
import {
  Button,
  ConfigProvider,
  Input,
  Modal,
  Select,
  Table,
  Tooltip,
} from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import axios from "axios";
import orders from "../../../../public/images/icon/user.svg";
import { EyeOutlined } from "@ant-design/icons";
import { useAllEarningsQuery } from "../../../Redux/api/earningApi";

export const Earnings = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const { data: allEarnings, isLoading, refetch } = useAllEarningsQuery();

  // const userData = allUser?.data;

  console.log("allEarnings", allEarnings);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("data/orders.json");
        console.log("response", response);

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

  console.log({ data });

  // The early return happens after all hooks are called
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleCancel = () => {
    // setIsViewModalVisible(false);
    // setIsDeleteModalVisible(false);
    setModalVisible(false);
  };

  const showViewModal = (record) => {
    console.log("recode ", record);

    console.log("Block");
    setCurrentRecord(record);
    setModalVisible(true);
  };

  console.log({ currentRecord });

  return (
    <div>
      <div className="min-h-[90vh]">
        <div className=" rounded-lg">
          <div className=" flex mb-5">
            <div className="flex justify-start bg-[#E6C379] px-5 py-2">
              <div className="mr-2">
                <img src={orders} alt="" className="w-6" />
              </div>
              <div>
                <h3>Total Earning</h3>
                <p className="font-bold">
                  {allEarnings?.data?.result?.totalEarnings}
                </p>
              </div>
            </div>
            <div></div>
            <div></div>
          </div>
          <div>
            <ConfigProvider
              theme={{
                components: {
                  Table: {
                    headerBg: "#18191B",
                    colorBgContainer: "rgb(255,255,255)",
                    colorText: "rgb(0,0,0)",
                    borderColor: "rgb(255,255,255)",
                    headerSplitColor: "rgb(255,255,255)",
                    headerColor: "#E6C379",
                    footerBg: "rgb(255,255,255)",
                    // borderRadius: 20,
                  },
                },
              }}
            >
              <Table
                dataSource={allEarnings?.data?.result?.result}
                loading={loading}
                pagination={{ pageSize: 10 }}
                rowKey={(record) => record.serialId}
                scroll={{ x: true }}
              >
                <Table.Column
                  title="S.ID"
                  dataIndex="serialId"
                  key="serialId"
                  render={(_, __, index) => index + 1}
                />
                <Table.Column
                  title="Order ID Number"
                  render={(_, record) => record.orderId?.orderNumber || "N/A"}
                  key="createdAt"
                />
                <Table.Column
                  title="Email"
                  render={(_, record) => record.email || "N/A"}
                  key="email"
                />
                <Table.Column
                  title="Total Price"
                  render={(_, record) => record.orderId?.totalPrice || "N/A"}
                  key="createdAt"
                />
                <Table.Column
                  title="Payment Status"
                  render={(_, record) =>
                    `${record.status === "paid" ? "Paid" : "Unpaid"}` || "N/A"
                  }
                  key="createdAt"
                />
                <Table.Column
                  title="Payment Method"
                  render={(_, record) => `${record.method}` || "N/A"}
                  key="createdAt"
                />

                <Table.Column
                  title="Action"
                  key="action"
                  render={(_, record) => (
                    <div style={{ display: "flex", gap: "8px" }}>
                      {/* View Button */}
                      <Button
                        type="link"
                        onClick={() => showViewModal(record)}
                        style={{ color: "#E6C379" }}
                      >
                        <EyeOutlined style={{ fontSize: 18 }} />
                      </Button>

                      {/* Delete Button */}
                    </div>
                  )}
                />
              </Table>
            </ConfigProvider>
          </div>

          {/* View Modal */}

          <Modal
            open={modalVisible}
            onCancel={handleCancel}
            footer={null}
            centered
            style={{ textAlign: "center" }}
            width={500}
          >
            {currentRecord && (
              <div className="p-4">
                <div className="flex gap-8 items-start">
                  {/* <div className="w-2/3">
                    <img
                      src={
                        currentRecord.orderId?.images[0] ||
                        "https://via.placeholder.com/150"
                      }
                      alt="Product"
                      className="w-full h-auto  shadow-lg"
                    />
                  </div> */}

                  <div className="w-3/4 text-left">
                    <h4 className="text-xl font-bold text-[#E6C379] mb-2">
                      Order Details
                    </h4>
                    <p className="text-gray-700 mb-1 text-base">
                      <span className="font-semibold">Product ID:</span>{" "}
                      {currentRecord.orderId?.orderNumber}
                    </p>
                    <p className="text-gray-700 mb-1 text-base">
                      <span className="font-semibold">Price:</span> $
                      {currentRecord.totalPrice}
                    </p>
                  
                    <p className="text-gray-700 mb-1 text-base">
                      <span className="font-semibold">Status:</span>{" "}
                      <span
                        className={`font-bold ${
                          currentRecord.status === "pending"
                            ? "text-black"
                            : currentRecord.status === "delivered"
                            ? "text-green-500"
                            : currentRecord.status === "processing"
                            ? "text-yellow-500"
                            : "text-green-600"
                        }`}
                      >
                        {currentRecord.status.charAt(0).toUpperCase() +
                          currentRecord.status.slice(1)}
                      </span>
                    </p>
                    <p className="text-gray-700 mb-1 text-base">
                      <span className="font-semibold">Delivery Address:</span>{" "}
                      {currentRecord.orderId.address}
                    </p>
                    <p className="text-gray-700 mb-1 text-base">
                      <span className="font-semibold">Order Date:</span>{" "}
                      {currentRecord.transactionDate
                        ? new Date(currentRecord.transactionDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                    
                   
                    <p className="text-gray-700 mb-1 text-base">
                      <span className="font-semibold">Payment Method:</span>{" "}
                      {currentRecord.method}
                    </p>

                    <div>
                      <h4 className="text-xl font-bold text-[#E6C379] mb-2 mt-4">
                        User Details
                      </h4>
                      <p className="text-gray-700 mb-1 text-base">
                        <span className="font-semibold">Email:</span>{" "}
                        {currentRecord.email}
                      </p>
                      <p className="text-gray-700 mb-1 text-base">
                        <span className="font-semibold">Country Name:</span>{" "}
                        {currentRecord.orderId?.address}
                      </p>
                      <p className="text-gray-700 mb-1 text-base">
                        <span className="font-semibold">Phone no:</span>{" "}
                        {currentRecord.orderId?.orderNumber}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCancel}
                  className="bg-[#E6C379] text-white font-bold py-2 text-lg px-5  mt-6 w-full hover:bg-[#E6C379] transition duration-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};
