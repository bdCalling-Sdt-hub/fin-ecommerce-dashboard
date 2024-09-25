import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, Modal, Table, Tooltip } from "antd";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoEye } from "react-icons/go";

export default function Users() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/userData.json");
        console.log("Fetched data:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return data;
    return data.filter((item) =>
      item.customerName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const showBlockModal = () => {
    setIsBlockModalVisible(true);
  };

  const handleDelete = () => {
    // Handle delete action here
    setIsDeleteModalVisible(false);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
    setIsBlockModalVisible(false);
  };

  const handleBlock = () => {
    console.log("Block");
    setIsBlockModalVisible(false);
  };

  return (
    <div className="min-h-[90vh]">
      <div className="bg-[#013564] rounded-lg">
        <div className="flex justify-between p-6">
          <h1 className="text-3xl font-bold text-white">Users List</h1>
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
        <div>
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  headerBg: "rgb(255,255,255)",
                  colorBgContainer: "rgb(255,255,255)",
                  colorText: "rgb(0,0,0)",
                  borderColor: "rgb(73,72,72)",
                  headerColor: "#013564",
                  footerBg: "rgb(255,255,255)",
                  // borderRadius: 20,
                },
              },
            }}
          >
            <Table
              dataSource={filteredData}
              loading={loading}
              pagination={{ pageSize: 15 }}
              rowKey={(record) => record.serialId}
              scroll={{ x: true }}
            >
              <Table.Column title="S.ID" dataIndex="serialId" key="serialId" />
              <Table.Column
                title="Full Name"
                dataIndex="customerName"
                key="customerName"
                // render={(text, record) => (
                //   <div style={{ display: "flex", alignItems: "center" }}>
                //     <img
                //       src={record.avatar}
                //       alt={record.customerName}
                //       style={{
                //         width: 28,
                //         height: 28,
                //         borderRadius: "50%",
                //         marginRight: 8,
                //       }}
                //     />
                //     {text}
                //   </div>
                // )}
              />
              <Table.Column title="Email" dataIndex="email" key="email" />
              <Table.Column
                title="Uploaded Story"
                dataIndex="uploadedStory"
                key="uploadedStory"
              />{" "}
              <Table.Column
                title="Joining Date"
                dataIndex="joiningDate"
                key="joiningDate"
              />
              <Table.Column
                title="Action"
                key="action"
                render={(_, record) => (
                  <>
                    <div>
                      <Tooltip placement="right" title="View Details">
                        <Button
                          style={{
                            background: "white",
                            padding: 0,
                            border: "1px solid #013564",
                            color: "#013564",
                          }}
                          onClick={() => showViewModal(record)}
                        >
                          <p className="px-5 font-semibold">Details</p>
                        </Button>
                      </Tooltip>
                    </div>
                  </>
                )}
              />
            </Table>
          </ConfigProvider>
        </div>

        {/* View Modal */}
        <Modal
          title={
            <div className="pt-7">
              <h2 className="text-[#010515] text-3xl font-bold">
                Users Details
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#989898",
                  marginTop: "10px",
                }}
              >
                See all details about {currentRecord?.customerName}
              </p>
            </div>
          }
          open={isViewModalVisible}
          onCancel={handleCancel}
          footer={null}
          centered
          style={{ textAlign: "center" }}
          width={450}
          className=""
        >
          {currentRecord && (
            <div>
              <div className="flex items-center justify-center gap-5 mt-8">
                <img
                  src={currentRecord.avatar}
                  alt={currentRecord.customerName}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                  }}
                />
                <p className="text-2xl text-[#013564] font-bold">
                  {currentRecord.customerName}
                </p>
              </div>
              <p className="text-2xl font-bold my-2">User Information</p>
              <div className="flex flex-col text-lg font-semibold gap-y-2 text-start w-[80%] mx-auto">
                <p>
                  <span>Name:</span> {currentRecord.customerName}
                </p>
                <p>
                  <span>Email:</span> {currentRecord.email}
                </p>
                <p>
                  <span>Story Uploaded:</span> {currentRecord.uploadedStory}
                </p>
              </div>
              <button
                onClick={showBlockModal}
                className="bg-[#013564] text-white font-bold py-2 text-lg px-5 rounded-lg mt-8 w-[80%]"
              >
                Block
              </button>
            </div>
          )}
        </Modal>

        {/* Block Confirmation Modal */}
        <Modal
          open={isBlockModalVisible}
          onOk={handleBlock}
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
                style={{ background: "#013564" }}
                onClick={handleBlock}
              >
                Block
              </Button>
            </div>
          }
        >
          <p className="text-lg font-semibold pt-10 pb-4">
            Are you sure you want to block this user?
          </p>
        </Modal>

        {/* Delete Modal */}
        {/* <Modal
          // title="Confirm Delete"
          open={isDeleteModalVisible}
          onOk={handleDelete}
          onCancel={handleCancel}
          okText="Delete"
          cancelText="Cancel"
          centered
          style={{ textAlign: "center" }}
          // styles.body={{ textAlign: "center" }}
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
                style={{ background: "rgba(136, 24, 24, 1)" }}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          }
        >
          <p className="text-lg font-semibold pt-10 pb-4">
            Want to delete this house?
          </p>
        </Modal> */}
      </div>
    </div>
  );
}
