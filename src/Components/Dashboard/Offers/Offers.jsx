/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  InputNumber,
  Modal,
  Select,
  Table,
} from "antd";
import Swal from "sweetalert2";
import { DeleteFilled } from "@ant-design/icons";
import { useCreateOfferMutation, useDeleteOfferMutation,  useGetAllProductOffersQuery } from "../../../Redux/api/offerProduct";
import { useGetAllProductsQuery } from "../../../Redux/api/productsApi";
import axios from "axios";
import { el } from "react-day-picker/locale";

export default function Offers() {
  const [form] = Form.useForm();
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const { data: allProducts } = useGetAllProductsQuery(null);
  const { data: allOffers, isLoading, refetch } = useGetAllProductOffersQuery(null);
  console.log('allProducts',allProducts);
  const [addOffer] = useCreateOfferMutation ();
  const [deleteOffer] = useDeleteOfferMutation();

  const offerData = allOffers?.data;

  console.log("offerData", offerData);

 

  const onFinish = async(values) => {
    console.log("Form Values:", values);
    try {
      const res = await addOffer(values).unwrap();
      console.log('add offer res', res);
      if(res.success) {
        Swal.fire({
          title: "Offer Created Successfully!",
          text: "The offer has been created.",
          icon: "success",
        })
        refetch();
        handleCancel();
      }
      
    } catch (error) {
      if(error?.data?.message) {
        Swal.fire({
          title: "Error!",
          text: error?.data?.message,
          icon: "error",
        })
      console.log('offer create error', error);
      
    }
    // Close modal after submission
  };
}

  const handleCancel = () => {
    // setIsViewModalVisible(false);
    // setIsDeleteModalVisible(false);
    setModalVisible(false);
  };

  const showViewModal = (data) => {
    console.log("data data", data);

    console.log("Block");
    setCurrentRecord(data);
    setModalVisible(true);
  };

 
  




  console.log({ currentRecord });

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
          const res = await deleteOffer(id).unwrap();
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
      <div>
        <button
          onClick={() => showViewModal(true)}
          className="bg-[#E6C379] px-8 py-2 mb-5 text-[#000] text-xl font-semibold float-right"
        >
          Add Offer
        </button>
      </div>
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
              dataSource={offerData}
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
                title="Product Name"
                render={(_, record) => record.productId.name || "N/A"}
                key="offerTitle"
              />
              <Table.Column
                title="Offter Parcentage" 
                render={(_, record) => `${record.offer} %` || "N/A"}
                key="offerTitle"
              />
              <Table.Column
                title="Start Date"
                render={(_, record) => 
                  record.startDate ? new Date(record.startDate).toLocaleDateString("en-US") : "N/A"
                }
                key="startDate"
              />
              <Table.Column
                title="End Date"
                render={(_, record) => 
                  record.startDate ? new Date(record.endDate).toLocaleDateString("en-US") : "N/A"
                }
                key="endDate"
              />
              <Table.Column
                title="Action"
                key="action"
                render={(_, record) => (
                  <div style={{ display: "flex", gap: "8px" }}>
                    {/* View Button */}
                    <Button
                      type="link"
                      onClick={() => deletedHandler(record._id)}
                      style={{ color: "#E6C379" }}
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

        {/* View Modal */}

        <Modal
      open={modalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      width={400}
      style={{ borderRadius: "none" }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          productName: "Due Fingerprint Necklace",
          offerPercentage: 10,
        }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-black text-center">
          Create Offer
        </h2>

        {/* Product Name Dropdown */}
        <Form.Item
          name="productId"
          label={<span className="font-medium text-gray-700">Product Name*</span>}
          rules={[{ required: true, message: "Please select a product" }]}
        >
          <Select className="w-full">
            {
              allProducts?.data?.result?.map((product) => (
                <Option key={product._id} value={product._id}>
                  {product.name}
                </Option>
              ))
            }
          </Select>
        </Form.Item>

        {/* Offer Percentage */}
        <Form.Item
          name="offer"
          label={<span className="font-medium text-gray-700">Offer Percentage*</span>}
      
          rules={[{ required: true, message: "Please enter an offer percentage" }]}
        >
          <InputNumber type="number" className="w-full" min={1} max={100} addonAfter="%" />
        </Form.Item>

        {/* Start Date */}
        <Form.Item
          name="startDate"
          label={<span className="font-medium text-gray-700">Start Date*</span>}
          rules={[{ required: true, message: "Please select a start date" }]}
        >
          <DatePicker type="date" className="w-full" />
        </Form.Item>

        {/* End Date */}
        <Form.Item
          name="endDate"
          label={<span className="font-medium text-gray-700">End Date*</span>}
          rules={[{ required: true, message: "Please select an end date" }]}
        >
          <DatePicker type="date" className="w-full" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ background: "#E6C379" }}
            className="bg-[#E6C379] text-white font-bold w-full rounded-none hover:bg-[#caa152] transition duration-300"
          >
            submit
          </Button>
        </Form.Item>
      </Form>
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
