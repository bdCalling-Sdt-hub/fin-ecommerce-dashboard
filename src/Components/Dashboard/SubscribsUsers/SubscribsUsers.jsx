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
import { DeleteFilled } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { useDeleteSubscribsUsersMutation, useGetAllSubscribsUsersQuery } from "../../../Redux/api/subscribsUserApi";

export default function SubscribsUsers() {

  const {
    data: allSubsUsers,
    isLoading,
    refetch,
  } = useGetAllSubscribsUsersQuery();

  const [deletedSubscribeUser] = useDeleteSubscribsUsersMutation();

  const subcriptionsUsersData = allSubsUsers?.data;

  console.log("subcriptionsUsersData", subcriptionsUsersData);

 

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
          const res = await deletedSubscribeUser(id).unwrap();
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
        <div className="float-right mr-2 mb-3">
          
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
              dataSource={subcriptionsUsersData}
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
                title="User Email"
                render={(_, record) => record.email || "N/A"}
                key="email"
              />
              <Table.Column
                title="User Phone"
                render={(_, record) => record.phone || "N/A"}
                key="phone"
              />
              <Table.Column
                title="Cupon Code"
                render={(_, record) => record.cuponCode || "N/A"}
                key="phone"
              />

              <Table.Column
                title="Action"
                key="action"
                render={(_, record) => (
                  console.log('recode', record)
,
                  <div style={{ display: "flex", gap: "8px" }}>
                    {/* View Button */}

                    <Button
                      type="link"
                      onClick={() => deletedHandler(record._id)}
                      style={{ color: "#E6C379" }}
                      // className="text-red-700"
                    >
                      <DeleteFilled style={{ fontSize: 18 }} />
                    </Button>

                    {/* Delete Button */}
                  </div>
                )}
              />
            </Table>
          </ConfigProvider>
        </div>

      </div>
    </div>
  );
}
