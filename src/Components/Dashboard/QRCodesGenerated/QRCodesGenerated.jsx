import React, { useEffect, useState } from "react";
import axios from "axios";
import { ConfigProvider, Modal, Table, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const QRCodesGenerated = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null); // To store the selected record

  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [availableItems, setAvailableItems] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Store image preview

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/category.json");
        setData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateCategory = () => {
    const newCategory = { name: categoryName, id: categoryId, availableItems: availableItems, img: categoryImage };
    console.log("New Category:", newCategory);
    setIsCreateModalVisible(false);
  };

  const handleEditCategory = () => {
    const updatedCategory = {
      name: categoryName,
      id: categoryId,
      availableItems: availableItems,
      img: categoryImage,
    };
    console.log("Edited Category:", updatedCategory);
    setIsEditModalVisible(false);
  };

  // Show Edit Modal and prefill the form with the clicked record data
  const showEditModal = (record) => {
    // console.log('record', record);
    setCurrentRecord(record); 
    setCategoryName(record.name); 
    setCategoryId(record.categoryID); 
    setAvailableItems(record.available); 
    if (record.img) {
      // If the record has an image, set it as the preview
      setImagePreview(record.img);
    } else {
      setImagePreview(null); // If no image, clear the preview
    }

    setIsEditModalVisible(true); 
  };

  const handleFileChange = (info) => {
    const file = info.file; // Extract the file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Only trigger when the reading is finished
        setImagePreview(reader.result); // Set the base64 image
      };
      reader.readAsDataURL(file); // Convert to base64
      setCategoryImage(file); // Store the file
    }
  };
  

  return (
    <div>
      <Button
        type="primary"
        className="float-right mb-5 text-base font-semibold py-5 px-8"
        onClick={() => setIsCreateModalVisible(true)}
      >
        Create a Category
      </Button>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#D3E6F9",
              headerColor: "black",
              colorBgContainer: "rgb(255,255,255)",
              colorText: "rgb(0,0,0)",
              headerSplitColor: "rgba(151, 198, 234, 1)",
            },
          },
        }}
      >
        <div className="w-full overflow-x-auto border-2 border-[#3399FF] rounded-xl">
          <Table
            columns={[
              {
                title: "S.ID",
                dataIndex: "index",
                render: (text, record, index) => <span>{index + 1}</span>,
                responsive: ["md"],
              },
              {
                title: "Customer Name",
                dataIndex: "name",
                render: (text, record) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={record.img}
                      alt={record.name}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        marginRight: 8,
                      }}
                    />
                    <span
                      style={{
                        textDecoration: "underline",
                        color: "#3B82F6",
                        cursor: "pointer",
                      }}
                     
                    >
                      {text}
                    </span>
                  </div>
                ),
                responsive: ["sm"],
              },
              {
                title: "Available",
                dataIndex: "available",
                responsive: ["md"],
              },
              {
                title: "CategoryID",
                dataIndex: "categoryID",
                responsive: ["sm"],
              },
              {
                title: "Actions",
                responsive: ["sm"],
                render: (record) => (
                  <NavLink to={`/qr-code-generated/${record.serialId}`} > <button className="btn bg-blue-500 text-white px-5 py-2 rounded">
                  Manage
                </button></NavLink>
                 
                ),
              },
            ]}
            dataSource={data}
            loading={loading}
            pagination={{ pageSize: 5 }}
            className="user-table"
            scroll={{ x: true }}
          />
        </div>
      </ConfigProvider>

      {/* Create Category Modal */}
      <Modal
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={[
          <Button
            key="back"
            onClick={() => setIsCreateModalVisible(false)}
            style={{
              backgroundColor: "#f5f5f5",
              color: "#000",
              border: "1px solid #d9d9d9",
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleCreateCategory}
            style={{ backgroundColor: "#1890ff", color: "#fff", border: "none" }}
          >
            Confirm
          </Button>,
        ]}
        centered
        bodyStyle={{
          padding: "24px",
          backgroundColor: "#f9fafc",
        }}
        style={{
          borderRadius: "8px",
        }}
        width={500}
      >
        <h2
          className="text-center"
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#333",
          }}
        >
          Create a Category
        </h2>

        <div>
          <label style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>
            Category Name
          </label>
          <Input
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            style={{
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #d9d9d9",
            }}
          />

          <label style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>
            Add ID
          </label>
          <Input
            placeholder="Enter category ID"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            style={{
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #d9d9d9",
            }}
          />

          {/* <label style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>
            Available Items
          </label>
          <Input
            placeholder="Enter available items"
            value={availableItems}
            type="number"
            onChange={(e) => setAvailableItems(e.target.value)}
            style={{
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #d9d9d9",
            }}
          /> */}

          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  marginBottom: "8px",
                  marginRight: "10px",
                }}
              >
                Import a photo
              </label>
              <Upload
                name="photo"
                listType="picture"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleFileChange}
              >
                <Button
                  icon={<UploadOutlined />}
                  style={{
                    backgroundColor: "#e6f7ff",
                    color: "#1890ff",
                    borderRadius: "4px",
                    padding: "5px 15px",
                  }}
                >
                  Click to Upload
                </Button>
              </Upload>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: "100px", height: "100px", marginLeft: "20px", borderRadius: "8px" }}
              />
            )}
          </div>
        </div>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
    visible={isEditModalVisible}
    onCancel={() => setIsEditModalVisible(false)}
    footer={[
      <Button
        key="back"
        onClick={() => setIsEditModalVisible(false)}
        style={{
          backgroundColor: "#f5f5f5",
          color: "#000",
          border: "1px solid #d9d9d9",
        }}
      >
        Cancel
      </Button>,
      <Button
        key="submit"
        type="primary"
        onClick={handleEditCategory}
        style={{ backgroundColor: "#1890ff", color: "#fff", border: "none" }}
      >
        Confirm
      </Button>,
    ]}
    centered
    bodyStyle={{
      padding: "24px",
      backgroundColor: "#f9fafc",
    }}
    style={{
      borderRadius: "8px",
    }}
    width={500}
  >
    <h2
      className="text-center"
      style={{
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#333",
      }}
    >
      Edit Category
    </h2>

    <div>
      <label style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>
        Category Name
      </label>
      <Input
        placeholder="Enter category name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        style={{
          marginBottom: "20px",
          borderRadius: "4px",
          border: "1px solid #d9d9d9",
        }}
      />

      <label style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>
        Add ID
      </label>
      <Input
        placeholder="Enter category ID"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        style={{
          marginBottom: "20px",
          borderRadius: "4px",
          border: "1px solid #d9d9d9",
        }}
      />

      {/* <label style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>
        Available Items
      </label>
      <Input
        placeholder="Enter available items"
        value={availableItems}
        type="number"
        onChange={(e) => setAvailableItems(e.target.value)}
        style={{
          marginBottom: "20px",
          borderRadius: "4px",
          border: "1px solid #d9d9d9",
        }}
      /> */}

      <label
        style={{
          fontSize: "14px",
          fontWeight: "500",
          marginBottom: "8px",
          marginRight: "10px",
        }}
      >
        Import a photo
      </label>
      <Upload
        name="photo"
        listType="picture"
        showUploadList={false}
        beforeUpload={() => false}
        onChange={handleFileChange}
      >
        <Button
          icon={<UploadOutlined />}
          style={{
            backgroundColor: "#e6f7ff",
            color: "#1890ff",
            borderRadius: "4px",
            padding: "5px 15px",
          }}
        >
          Click to Upload
        </Button>
      </Upload>

      {/* Image Preview */}
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          style={{ width: "100px", height: "100px", marginTop: "10px", borderRadius: "8px" }}
        />
      )}
    </div>
  </Modal>
    </div>
  );
};

export default QRCodesGenerated;
