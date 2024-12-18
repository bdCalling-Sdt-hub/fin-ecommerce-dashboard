/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from "react";
import { Button, ConfigProvider, Input, Modal, Select, Table, Tooltip } from "antd";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import orders from "../../../../public/images/icon/orders.svg";
import { EyeOutlined } from "@ant-design/icons";

export default function Offers() {
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
        const response = await axios.get("data/offers.json");
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
  



  return (
    <div className="min-h-[90vh]">
      <div className=" rounded-lg">
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
              <Table.Column title="Offer Title" render={(_, record) => record.offerTitle || "N/A"} key="offerTitle" />
              <Table.Column title="Start Date"  render={(_, record) => record.startDate || "N/A"} key="startDate" />
              <Table.Column title="End Date" render={(_, record) => record.endDate || "N/A"} key="endDate" />
              <Table.Column title="Discount Type" render={(_, record) => `${record.discountType}` || "N/A"} key="discountType" />
              <Table.Column title="Discount Amount" render={(_, record) => `${record.discountAmount}%` || "N/A"} key="discountAmount" />
              
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
            src={currentRecord?.img || "https://via.placeholder.com/150"}
            alt="Product"
            className="w-full h-auto"
          />
        </div>

        {/* Right Side: Details */}
        <div className="w-3/4 text-left">
          <h4 className="text-xl font-bold text-[#E6C379] mb-2">Offer Details</h4>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Offer Title:</span> {currentRecord?.offerTitle}
          </p>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Offer Type:</span> {currentRecord.offerType}
          </p>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Discount Type:</span> {currentRecord.discountType}
          </p>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Start Date:</span>{" "}
            {currentRecord.startDate ? new Date(currentRecord.startDate).toLocaleDateString() : "N/A"}
          </p>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">End Date:</span>{" "}
            {currentRecord.endDate ? new Date(currentRecord.endDate).toLocaleDateString() : "N/A"}
          </p>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Discount Amount:</span>{" "}
            {currentRecord.discountAmount}
          </p>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Offer Details:</span>{" "}
            {currentRecord.offerDetails}
          </p>
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
