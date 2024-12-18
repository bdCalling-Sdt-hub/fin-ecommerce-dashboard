/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from "react";
import { Button, ConfigProvider, Input, Modal, Select, Table, Tooltip } from "antd";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import orders from "../../../../public/images/icon/orders.svg";
import { EyeOutlined } from "@ant-design/icons";

const statuses = ["pending", "processing", "pelivered", "canceled"];

export default function Orders() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  // const { data: allUser, isLoading, refetch } = useAllUsersQuery();

  // const userData = allUser?.data;

  // console.log("allUser", userData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("data/orders.json");
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

  console.log({data})

  // Move useMemo before any returns
  const filteredData = useMemo(() => {
    if (!searchText) return data;
    return data.filter((item) =>
      item.email.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

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
    console.log('recode ', record);
    
    console.log("Block");
    setCurrentRecord(record);
    setModalVisible(true);
  };
  

  console.log({currentRecord});
  

  const handleStatusChange = (value, record) => {
    // setData((prevData) =>
    //   prevData.map((item) =>
    //     item.orderId === record.orderId ? { ...item, orderStatus: value } : item
    //   )
    // );

    console.log('value', value);
    console.log('record', record);
    
  };


  return (
    <div className="min-h-[90vh]">
      <div className=" rounded-lg">
        <div className=" flex mb-5">
            <div className="flex justify-start bg-[#E6C379] px-5 py-2">
            <div className="mr-2">
                <img src={orders} alt="" className="w-10" />
            </div>
            <div>
                <h3>Total Order Completed</h3>
                <p className="font-bold">30</p>
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
              dataSource={filteredData}
              loading={loading}
              pagination={{ pageSize: 10}}
              rowKey={(record) => record.serialId}
              scroll={{ x: true }}
            >
              <Table.Column
                title="S.ID"
                dataIndex="serialId"
                key="serialId"
                render={(_, __, index) => index + 1}
              />
              <Table.Column title="Email" render={(_, record) => record.userId?.email || "N/A"} key="email" />
              <Table.Column title="Country Name"  render={(_, record) => record.userId?.countryName || "N/A"} key="countryName" />
              <Table.Column title="Product Name" render={(_, record) => record.orderId?.productName || "N/A"} key="createdAt" />
              <Table.Column title="Quantity" render={(_, record) => `${record.orderId?.quantity}` || "N/A"} key="createdAt" />
              <Table.Column title="Product Price" render={(_, record) => `$${record.orderId?.price}` || "N/A"} key="createdAt" />
              <Table.Column
  title="Status"
  key="status"
  render={(_, record) => {
    let color = ""; // Default color
    switch (record.status.toLowerCase()) {
      case "pending":
        color = "black";
        break;
      case "delivered":
        color = "green";
        break;
      case "processing":
        color = "orange"; // Yellow-like color
        break;
      case "cancelled":
        color = "red";
        break;
      default:
        color = "gray";
    }

    return (
      <span style={{ color: color, fontWeight: "bold", textTransform: "capitalize" }}>
        {record.status}
      </span>
    );
  }}
/>

<Table.Column
            title="Change Status"
            dataIndex="status"
            key="changeStatus"
            render={(status, record) => (
              <ConfigProvider
                theme={{
                  components: {
                    Select: {
                      optionSelectedBg: "rgb(254,188,96)",
                      optionActiveBg: "rgb(255,217,165)",
                    },
                  },
                }}
              >
                <Select
                  value={status}
                  onChange={(value) => handleStatusChange(value, record)}
                  options={statuses.map((status) => ({
                    value: status,
                    label: status,
                  }))}
                  style={{
                    width: 150,
                    backgroundColor: "!black", // Sets the background color for the select box itself
                    color: "white",
                    zIndex: 1,
                  }}
                />
              </ConfigProvider>
            )}
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
  width={800}
>
  {currentRecord && (
    <div className="p-4">
      {/* Flex container for image and details */}
      <div className="flex gap-8 items-start">
        {/* Left Side: Image */}
        <div className="w-2/3">
          <img
            src={currentRecord.orderId?.images[0] || "https://via.placeholder.com/150"}
            alt="Product"
            className="w-full h-auto  shadow-lg"
          />
        </div>

        {/* Right Side: Details */}
        <div className="w-3/4 text-left">
          <h4 className="text-xl font-bold text-[#E6C379] mb-2">Order Details</h4>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Product:</span> {currentRecord.orderId?.productName}
          </p>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Price:</span> ${currentRecord.orderId?.price}
          </p>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Discount Total Price:</span> ${currentRecord.totalAmount}
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
                  : "text-red-500"
              }`}
            >
              {currentRecord.status.charAt(0).toUpperCase() + currentRecord.status.slice(1)}
            </span>
          </p>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Delivery Address:</span>{" "}
            {currentRecord.deliveryAddress}
          </p>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Order Date:</span>{" "}
            {currentRecord.orderDate ? new Date(currentRecord.orderDate).toLocaleDateString() : "N/A"}
          </p>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Postal Code:</span>{" "}
            {currentRecord.postalCode}
          </p>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">City:</span>{" "}
            {currentRecord.city}
          </p>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Shiping Method:</span>{" "}
            {currentRecord.shippingMethod}
          </p>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Payment Method:</span>{" "}
            {currentRecord.paymentMethod}
          </p>

          <div>
            <h4 className="text-xl font-bold text-[#E6C379] mb-2 mt-4">User Details</h4>
            <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Email:</span> {currentRecord.userId?.email}
          </p>
            <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Country Name:</span> {currentRecord.userId?.countryName}
          </p>
            <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Phone no:</span> {currentRecord.userId?.phone}
          </p>
          </div>
        </div>
      </div>

      {/* Cancel Button */}
      <button
        onClick={handleCancel}
        className="bg-[#E6C379] text-white font-bold py-2 text-lg px-5  mt-6 w-full hover:bg-[#E6C379] transition duration-300"
      >
        Cancel
      </button>
    </div>
  )}
</Modal>




        {/* Block Confirmation Modal */}
        {/* <Modal
          open={isBlockModalVisible}
          // onOk={handleBlock}
          onCancel={handleCancel}
          okText="Block"
          cancelText="Cancel"
          centered
          style={{ textAlign: "center" }}
          footer={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "40px",
              }}
            >
              <Button
                onClick={handleCancel}
                style={{
                  marginRight: 12,
                  background: "rgba(221, 221, 221, 1)",
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                style={{ background: "#E6C379" }}
                onClick={handleDeleted}
              >
                Deleted
              </Button>
            </div>
          }
        >
          <p className="text-lg font-semibold pt-10 pb-4">
            Are you sure you want to Deleted this user?
          </p>
        </Modal> */}

       
      </div>
    </div>
  );
}
