/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from "react";
import { Button, ConfigProvider, Input, Modal, Table, Tooltip } from "antd";
import { useAllUsersQuery, useBlockUserMutation } from "../../Redux/api/usersApi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

export default function Users() {
  const [searchText, setSearchText] = useState("");
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const { data: allUser, isLoading, refetch } = useAllUsersQuery();

  const [blockUser] = useBlockUserMutation();

  const userData = allUser?.data;

  // console.log("allUser", userData);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("data/userData.json");
  //       const recentData = response.data?.slice(0, 5);

  //       setData(recentData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // console.log({data})

  // Move useMemo before any returns
  const filteredData = useMemo(() => {
    if (!searchText) return userData;
    return data.filter((item) =>
      item.fullName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [userData, searchText]);

  // The early return happens after all hooks are called
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSearch = (value) => {
    setSearchText(value);
  };

  // const showViewModal = (record) => {
  //   setCurrentRecord(record);
  //   setIsViewModalVisible(true);
  // };

  // const showDeleteModal = (record) => {
  //   setCurrentRecord(record);
  //   // showViewModal(record);
  //   // setIsDeleteModalVisible(true);
  // };

  // const showBlockModal = () => {
  //   setIsBlockModalVisible(true);
  // };

  // const handleDelete = () => {
  //   // Handle delete action here
  //   setIsDeleteModalVisible(false);
  // };

  const handleCancel = () => {
    // setIsViewModalVisible(false);
    // setIsDeleteModalVisible(false);
    setIsBlockModalVisible(false);
  };

  const showDeleteModal = (record) => {
    console.log('recode ', record);
    
    console.log("Block");
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };
  const handleDeleted = async() => {
    console.log("Block");

    console.log("currentRecord._id", currentRecord._id);


    try {

      const res = await blockUser(currentRecord._id).unwrap();
      console.log('res',res);

      if (res.success) {
        Swal.fire({
          title: "User Block Successfully!",
          text: "The user has been block!.",
          icon: "success",
        });
        refetch();
        setIsBlockModalVisible(false);
      } else {
        Swal.fire({
          title: "Error",
          text: "There was an issue user block .",
          icon: "error",
        });
      }
      
    } catch (error) {
      
    }





    
  //   if(currentRecord.serialId){
  //     Swal.fire({
  //       title: "User deleted Successfull!!",
  //       text: "The user has been deleted!.",
  //       icon: "success",
  //     });
  // };
}

  console.log({currentRecord});
  


  return (
    <div className="min-h-[90vh]">
      <div className=" rounded-lg">
        {/* <div className="flex justify-between p-6">
          <h1 className="text-3xl font-bold text-black">Users List</h1>
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
        </div> */}
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
              loading={isLoading}
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
              <Table.Column title="Full Name" dataIndex="fullName" key="email" />
              <Table.Column title="Email" dataIndex="email" key="email" />
              <Table.Column title="Active/Inactive" render={(text, record) => record.isActive ? "Active" : "Inactive"} dataIndex="countryName" key="countryName" />
              <Table.Column 
              title="Joining Date" 
              render={(text, record) => new Date(record.createdAt).toLocaleDateString('en-US')}
              dataIndex="createdAt" 
              key="createdAt" />
              <Table.Column title="Role" dataIndex="role" key="role" />
              <Table.Column
  title="Action"
  key="action"
  render={(_, record) => (
    <div style={{ display: "flex", gap: "8px" }}>
      {/* View Button */}
      {/* <Button
        type="link"
        onClick={() => showViewModal(record)}
        style={{ color: "#1890ff" }}
      >
        View
      </Button> */}

      {/* Delete Button */}
      <Button
        type="link"
        danger
        onClick={() => showDeleteModal(record)}
        style={{ color: "#E6C379", borderColor: "#E6C379" }}
      >
        {record.isActive ? "Block" : "Unblock"}
      </Button>
    </div>
  )}
/>
          
            </Table>
          </ConfigProvider>
        </div>

        {/* View Modal */}


        {/* <Modal
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
                See all details about {currentRecord?.email}
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
        </Modal> */}




        {/* Block Confirmation Modal */}
        <Modal
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
                submit
              </Button>
            </div>
          }
        >
          <p className="text-lg font-semibold pt-10 pb-4">
            Are you sure you want to it?
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
