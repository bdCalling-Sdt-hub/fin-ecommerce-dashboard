/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from "react";
import { Button, ConfigProvider, Input, Modal,  Table, Upload, Space, Form } from "antd";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import orders from "../../../../public/images/icon/orders.svg";
import { DeleteFilled } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";

export default function Category() {
    const [form] = Form.useForm();
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
  const handleUpload = (info) => {
    if (info.file.status === "done") {
      console.log(`${info.file.name} file uploaded successfully.`);
    } else if (info.file.status === "error") {
      console.log(`${info.file.name} file upload failed.`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("data/category.json");
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


  const deletedHandler = (id) => {
    console.log("Block id ",id);
    if(id){
        
          Swal.fire({
            title: "Do you want to Delete it?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: false
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });
    }
   
  };
  

  const onFinish = (values) => {
    console.log("Category values: ", values);
    if(values){
        Swal.fire({
            title: "Category Created Successfully!",
            text: "The Category has been created.",
            icon: "success",
          });
          setModalVisible(false);
    }
  };




  return (
    <div className="min-h-[90vh]">
      <div className=" rounded-lg">
        <div className="float-right mr-2 mb-3">
            <button className="bg-[#E6C379] text-white py-3 px-5 rounded" onClick={() => showViewModal(true)} >+ Add Category</button>
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
              {/* <Table.Column title="Category Image"  render={(_, record) => record.categoryImage || "N/A"} key="categoryImage" /> */}
              <Table.Column
  title="Category Image"
  render={(_, record) => (
    record.categoryImage ? (
      <img
        src={record.categoryImage}
        alt="Category"
        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
      />
    ) : "N/A"
  )}
  key="categoryImage"
/>
              <Table.Column title="Category Name" render={(_, record) => record.categoryName || "N/A"} key="categoryName" />
              
              <Table.Column
              
  title="Action"
  key="action"
  render={(_, record) => (
    // console.log('recode', record)
    
    <div style={{ display: "flex", gap: "8px" }}>
      {/* View Button */}
    
      
      <Button
        type="link"
        onClick={() => deletedHandler(record.serialId)}
        style={{ color: "#b91c1c" }}
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
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="w-full"
      >
        {/* Category Name */}
        <Form.Item
          label={<span className="text-black">Category Name</span>}
          name="categoryName"
          rules={[{ required: true, message: "Please enter category name!" }]}
        >
          <Input placeholder="Enter Category Name" />
        </Form.Item>

        {/* Category Image */}
        <Form.Item
        //   label={<span className="text-black">Category Image</span>}
          name="categoryImage"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Please upload a category image!" }]}
        >
          <Upload
            name="file"
            listType="picture"
            beforeUpload={() => false}
          >
            <Button
              icon={<UploadOutlined />}
              style={{
                backgroundColor: "#E6C379",
                borderColor: "#E6C379",
              }}
              className="p-8"
            >
              Upload Category Image
            </Button>
          </Upload>
        </Form.Item>

        {/* Buttons */}
        <Form.Item className="flex justify-end gap-4">
          <Space>
            <Button
              htmlType="reset"
              onClick={handleCancel}
              className="bg-gray-300 text-black hover:bg-gray-400"
            >
              Cancel
            </Button>
            <Button
              htmlType="submit"
              style={{ backgroundColor: "#E6C379" }}
              className="bg-[#E6C379]"
            >
              Create Category
            </Button>
          </Space>
        </Form.Item>
      </Form>
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
