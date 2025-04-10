/* eslint-disable no-unused-vars */
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
import axios from "axios";
import orders from "../../../../public/images/icon/orders.svg";
import { EyeOutlined } from "@ant-design/icons";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../../Redux/api/ordersApi";
import Swal from "sweetalert2";
import { getImageUrl } from "../../../utils/baseUrl";
import moment from "moment/moment";

// const url = "http://10.0.70.35:8025/";
const url = getImageUrl();

const statuses = ["confirmed", "processing", "completed", "cancelled"];

export default function Orders() {
  // const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  // const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const { data: allOrders, isLoading, refetch } = useGetAllOrdersQuery();
  const [orderUpdateStatus] = useUpdateOrderStatusMutation();

  // console.log("orderData", allOrders);

  // The early return happens after all hooks are called
  if (isLoading) {
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

  const handleStatusChange = async (value, record) => {
    try {
      const response = await orderUpdateStatus({ id: record._id, data: value });
      console.log("response status", response);

      if (response?.data?.success) {
        Swal.fire({
          title: "Success!",
          text: response?.data?.message,
          icon: "success",
        });
        refetch();
      } else if (response?.error?.data?.success === false) {
        Swal.fire({
          title: "Error!",
          text: response?.error?.data?.message,
          icon: "success",
        });
        refetch();
      }
    } catch (error) {
      console.log("error==", error);
      if (error?.data?.success === false) {
        Swal.fire({
          title: "Error!",
          text: error?.data?.message,
          icon: "error",
        });
      }
    }

    console.log("value", value);
    console.log("record", record);
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
              <p className="font-bold">
                {allOrders?.data?.totalCompletedOrders}
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
              dataSource={allOrders?.data?.result}
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
              <Table.Column
                title="Order Number"
                render={(_, record) => record.orderNumber || "N/A"}
                key="email"
              />
              <Table.Column
                title="Customer Name"
                render={(_, record) => record.fullName || "N/A"}
                key="countryName"
              />
              <Table.Column
                title="Customer Email"
                render={(_, record) => record.email || "N/A"}
                key="countryName"
              />
              <Table.Column
                title="Order Date"
                render={(_, record) => {
                  return record.orderDate ? moment(record.orderDate).format('YYYY-MM-DD') : "N/A";
                }}
                key="createdAt"
              />
              {/* <Table.Column
                title="Customer City"
                render={(_, record) => `${record.city}` || "N/A"}
                key="createdAt"
              /> */}
              <Table.Column
                title="Cupon Code"
                render={(_, record) =>
                  `${record.cuponCode ? record.cuponCode : "N/A"}`
                }
                key="createdAt"
              />
              <Table.Column
                title="Order Price"
                render={(_, record) => `$${record.totalPrice}` || "N/A"}
                key="createdAt"
              />
              <Table.Column
                title="Status"
                key="status"
                render={(_, record) => {
                  let color = "";
                  switch (record.status.toLowerCase()) {
                    case "pending":
                      color = "black";
                      break;
                    case "delivered":
                      color = "green";
                      break;
                    case "processing":
                      color = "orange";
                      break;
                    case "cancelled":
                      color = "red";
                      break;
                    default:
                      color = "gray";
                  }

                  return (
                    <span
                      style={{
                        color: color,
                        fontWeight: "bold",
                        textTransform: "capitalize",
                       
                      }}
                    >
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
                        width: 120,
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

        <Modal
          open={modalVisible}
          onCancel={handleCancel}
          footer={null}
          centered
          // style={{ textAlign: "center" }}
          width={700}
        >
          {currentRecord && (
            <div className="p-4">
              <div>
                <div>
                  {currentRecord?.productsList?.map((pItem, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 mb-5 rounded"
                    >
                      <div className="">
                        {/* <div className="grid grid-cols-4 gap-2">
                          {pItem?.productId?.selectMaterialpItems?.map(
                            (item, index) => {
                              if (
                                item._id && pItem.materialId && item._id.toString() === pItem.materialId.toString()
                              ) {
                                return (
                                  <div key={index}>
                                    {item?.images?.map((img, imgIndex) => ( 
                                      <img 
                                        key={imgIndex} 
                                        src={`${url}${img}`} 
                                        alt={item?.selectMaterial} 
                                        className="w-40 h-40" 
                                      />
                                    ))}
                                  </div>
                                );
                              }else{
                                return <div> no image show</div>
                              }
                            }
                          )}
                        </div> */}
                        <div className="">
                          {pItem?.productId?.selectMaterialItems?.map(
                            (item, index) => {
                              // Ensure materialId exists and matches the item._id
                              if (
                                item._id &&
                                pItem.materialId &&
                                item._id.toString() ===
                                  pItem.materialId.toString()
                              ) {
                                return (
                                  <div
                                    key={index}
                                    className="grid grid-cols-4 gap-2"
                                  >
                                    {item?.images?.length > 0 ? (
                                      item.images.map((img, imgIndex) => (
                                        <img
                                          key={imgIndex}
                                          src={`${url}${img}`}
                                          alt={item?.selectMaterial}
                                          className="w-40 h-40"
                                        />
                                      ))
                                    ) : (
                                      <div>No images available</div>
                                    )}
                                  </div>
                                );
                              } else {
                                return null;
                              }
                            }
                          )}
                        </div>

                        <div className="p-4">
                          <p className="text-base ">
                            <span className="text-gray-600">Product Name:</span>{" "}
                            {pItem?.productId?.name}
                          </p>
                          <p className="text-base">
                            <span className="text-gray-600">Quantity:</span>{" "}
                            {pItem?.quantity}
                          </p>
                          <p className="text-base">
                            <span className="text-gray-600">
                              Select Material:
                            </span>{" "}
                            {pItem?.selectMaterial}
                          </p>
                          <p className="text-base">
                            <span className="text-gray-600">
                              Product Price:
                            </span>{" "}
                            {pItem?.price}
                          </p>
                          <p className="text-base">
                            <span className="text-gray-600">
                              Product Discount:
                            </span>{" "}
                            {pItem?.discount}
                          </p>
                          <p className="text-base">
                            <span className="text-gray-600">
                              Product Discount Price:
                            </span>{" "}
                            {pItem?.discountPrice}
                          </p>
                          <p className="text-base">
                            <span className="text-gray-600">
                              Previews Order ID:
                            </span>{" "}
                            {pItem?.previewsOrderId
                              ? pItem?.previewsOrderId
                              : "N/A"}
                          </p>
                          <p className="text-base">
                            <span className="text-gray-600">
                            initialText:
                            </span>{" "}
                            {pItem?.initialText
                              ? pItem?.initialText
                              : "N/A"}
                          </p>
                          <div>
                            {pItem?.productId?.category === "fingerprint" && (
                              <>
                                <p>
                                  <span className="text-gray-600 mr-2">
                                    NeedFingerPrint:
                                  </span>
                                  {pItem?.needFingerPrint === true
                                    ? "Yes"
                                    : "No"}
                                </p>

                                {pItem?.needFingerPrint === false && (
                                  <div className="grid grid-cols-3 gap-2">
                                    {pItem?.finger1Image && (
                                      <img
                                        key={index}
                                        src={`${url}${pItem.finger1Image}`}
                                        alt={pItem.needFingerPrint}
                                        className="w-40 h-40"
                                      />
                                    )}
                                    {pItem?.finger2Image && (
                                      <img
                                        key={index}
                                        src={`${url}${pItem.finger2Image}`}
                                        alt={pItem.needFingerPrint}
                                        className="w-40 h-40"
                                      />
                                    )}
                                    {pItem?.finger3Image && (
                                      <img
                                        key={index}
                                        src={`${url}${pItem.finger3Image}`}
                                        alt={pItem.needFingerPrint}
                                        className="w-40 h-40"
                                      />
                                    )}
                                  </div>
                                )}
                              </>
                            )}
                            {pItem?.productId?.category === "handwriting" &&
                              (pItem?.handRightingImage ? (
                                <div>
                                  <span className="text-gray-600 mr-2">
                                    HandRighting Custom Design: Yes
                                  </span>
                                  <div className="flex gap-1">
                                    <div>
                                    <img
                                    key={index}
                                    src={`${url}${pItem.handRightingImage[0]}`}
                                    alt={pItem.needFingerPrint}
                                    className="w-40 h-40"
                                  />
                                    </div>
                                    {
                                      pItem.handRightingImage[1] && <div>
                                      <img
                                      key={index}
                                      src={`${url}${pItem.handRightingImage[1]}`}
                                      alt={pItem.needFingerPrint}
                                      className="w-40 h-40"
                                    />
                                      </div>
                                    }
                                    
                                  </div>
                                  
                                </div>
                              ) : (
                                <span className="text-gray-600 mr-2">
                                  HandRighting Custom Design: No
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <h3>
                    <span className="text-gray-600 mr-2 font-bold">
                      Use Coupon Code :
                    </span>
                    (Extra 10% discount)
                  </h3>
                  <p>
                    {currentRecord?.cuponCode
                      ? currentRecord?.cuponCode
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold mt-3 text-gray-600">
                    Order Delivery Location :
                  </h3>
                  <div>
                    <p className="text-base">
                      <span className="text-gray-600 mr-2">Name:</span>
                      {currentRecord?.fullName ? currentRecord?.fullName : "N/A"}
                    </p>
                    <p className="text-base">
                      <span className="text-gray-600 mr-2">Email:</span>
                      {currentRecord?.email ? currentRecord?.email : "N/A"}
                    </p>
                    <p className="text-base">
                      <span className="text-gray-600 mr-2">Address:</span>
                      {currentRecord?.address ? currentRecord?.address : "N/A"}
                    </p>
                    <p className="text-base mr-2">
                      <span className="text-gray-600 mr-2">City:</span>
                      {currentRecord?.city ? currentRecord?.city : "N/A"}
                    </p>
                    <p className="text-base mr-2">
                      <span className="text-gray-600 mr-2">Phone Number:</span>
                      {currentRecord?.phoneNumber
                        ? currentRecord?.phoneNumber
                        : "N/A"}
                    </p>
                    <p className="text-base mr-2">
                      <span className="text-gray-600 mr-2">Post Code:</span>
                      {currentRecord?.postalCode
                        ? currentRecord?.postalCode
                        : "N/A"}
                    </p>
                    <p className="text-base mr-2">
                      <span className="text-gray-600 mr-2">Order Note:</span>
                      {currentRecord?.orderNote
                        ? currentRecord?.orderNote
                        : "N/A"}
                    </p>
                    <p className="text-base mr-2">
                      <span className="text-gray-600 mr-2">
                        Payment Status:
                      </span>
                      {currentRecord?.paymentStatus
                        ? currentRecord?.paymentStatus
                          ? "Paid"
                          : "Unpaid"
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div>
                  <hr className="mt-5" />
                  <div className="flex justify-between pItems-center">
                    <h3 className="font-bold mt-3 text-gray-600">
                      Total Paid Amount :
                    </h3>
                    <p className="text-base font-bold">
                      ${currentRecord?.totalPrice}
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
      </div>
    </div>
  );
}
