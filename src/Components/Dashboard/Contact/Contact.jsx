/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from "react";
import {
  Button,
  ConfigProvider,
  Input,
  Modal,
  Table,
  Upload,
  Space,
  Form,
} from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import { DeleteFilled, EyeOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import {
  useDeleteContactUsersMutation,
  useGetAllContactUsersQuery,
} from "../../../Redux/api/contactApi";

export default function Contact() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const {
    data: allContactUsers,
    isLoading,
    refetch,
  } = useGetAllContactUsersQuery();

  const [deletedContactUser] = useDeleteContactUsersMutation();

  const contactUsersData = allContactUsers?.data;

  console.log("contactUsersData", contactUsersData);

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

  const deletedHandler = async (id) => {
    console.log("Block id ", id);
    if (id) {
      const result = await Swal.fire({
        title: "Do you want to Delete it?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        buttonsStyling: false,
        customClass: {
          confirmButton: "swal2-confirm",
          cancelButton: "swal2-cancel",
        },
        didOpen: () => {
          // Style the Confirm button
          const confirmBtn = document.querySelector(".swal2-confirm");
          if (confirmBtn) {
            confirmBtn.style.backgroundColor = "#E6C379";
            confirmBtn.style.color = "#fff";
            confirmBtn.style.border = "none";
            confirmBtn.style.padding = "8px 20px";
            confirmBtn.style.borderRadius = "5px";
            confirmBtn.style.marginRight = "5px";
          }

          // Style the Cancel button
          const cancelBtn = document.querySelector(".swal2-cancel");
          if (cancelBtn) {
            cancelBtn.style.backgroundColor = "#d33";
            cancelBtn.style.color = "#fff";
            cancelBtn.style.border = "none";
            cancelBtn.style.padding = "8px 20px";
            cancelBtn.style.borderRadius = "5px";
          }
        },
      });

      if (result.isConfirmed) {
        try {
          const res = await deletedContactUser(id).unwrap();
          console.log("Subscribe user deleted res", res);

          if (res.success) {
            await Swal.fire("Deleted!", "", "success");
            refetch();
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      } else if (result.isDismissed) {
        Swal.fire("Action Cancelled", "", "info");
      }
    }
  };

  return (
    <div className="min-h-[90vh]">
      <div className=" rounded-lg">
        <div className="float-right mr-2 mb-3"></div>
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
              dataSource={contactUsersData}
              loading={isLoading}
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
              {/* <Table.Column title="Category Image"  render={(_, record) => record.categoryImage || "N/A"} key="categoryImage" /> */}
              {/* <Table.Column
                title="User Email"
                render={(_, record) =>
                  record.categoryImage ? (
                    <img
                      src={record.categoryImage}
                      alt="Category"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  ) : (
                    "N/A"
                  )
                }
                key="categoryImage"
              /> */}
              <Table.Column
                title="Name"
                render={(_, record) => record.name || "N/A"}
                key="phone"
              />
              <Table.Column
                title="User Email"
                render={(_, record) => record.email || "N/A"}
                key="email"
              />

          

              <Table.Column
                title="Message"
                render={(_, record) => {
                  const message = record.message || "N/A";
                  const words = message.split(" ");
                  const displayMessage =
                    words.length > 10
                      ? words.slice(0, 12).join(" ") + "..."
                      : words.join(" ");

                  return displayMessage || "N/A";
                }}
                key="phone"
              />

              <Table.Column
                title="Action"
                key="action"
                render={(_, record) => (
                  console.log("recode", record),
                  (
                    <div style={{ display: "flex", gap: "8px" }}>
                      {/* View Button */}


                      <Space>
                        <Button
                          type="link"
                          onClick={() => showViewModal(record)}
                          style={{ color: "#E6C379" }}
                        >
                          <EyeOutlined style={{ fontSize: 18 }} />
                        </Button>
                        <Button
                          type="link"
                          onClick={() => deletedHandler(record._id)}
                          style={{ color: "#E6C379" }}
                          // className="text-red-700"
                        >
                          <DeleteFilled style={{ fontSize: 18 }} />
                        </Button>
                      </Space>

                      {/* Delete Button */}
                    </div>
                  )
                )}
              />
            </Table>
          </ConfigProvider>
        </div>
        <Modal
          open={modalVisible}
          onCancel={handleCancel}
          footer={null}
          centered
          // style={{ textAlign: "center" }}
          width={600}
        >
          {currentRecord && (
            <div className="p-4">
              <div>
                <div className="text-center text-lg font-bold mb-5">
                  Contact Details
                </div>
                <p>
                  <span className="text-base font-bold mr-3">Name:</span>
                  {currentRecord.name}
                </p>
                <p>
                  <span className="text-base font-bold mr-3">Email:</span>
                  {currentRecord.email}
                </p>
                <p>
                  <span className="text-base font-bold mr-3">Message:</span>
                  {currentRecord.message}
                </p>
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
  );
}
