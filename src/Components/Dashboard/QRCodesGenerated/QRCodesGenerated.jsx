import { useState } from "react";
import { ConfigProvider, Modal, Table, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import {
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
} from "../../../Redux/api/categoryApi";

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

  const { data: allCategory, isLoading, refetch } = useGetAllCategoryQuery();
  console.log("data", allCategory?.data);

  const [createCategory] = useCreateCategoryMutation();

  const handleCreateCategory = async () => {
    if (!categoryImage) {
      alert("Image is required");
      return;
    }

    console.log({ categoryImage });

    const formData = new FormData();
    const payload = {
      categoryName,
      addId: categoryId,
    };

    formData.append("data", JSON.stringify(payload)); // Correctly stringify the JSON object
    formData.append("file", categoryImage); // Append the file

    console.log(payload); // Debug to verify the form data contents
    console.log(formData); // Debug to verify the form data contents

    try {
      const res = await createCategory(formData).unwrap();
      console.log("Category created:", res);
      setIsCreateModalVisible(false);
      setCategoryName("");
      setCategoryId("");
      setCategoryImage(null);
      setImagePreview(null);
      refetch(); // Refresh the category list
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  const handleFileChange = (info) => {
    console.log({ info });
    const file = info.file;
    // const file1 = info.fileList[0];

    console.log({ file }); // Extract the file
    if (file) {
      const reader = new FileReader();
      // reader.onloadend = () => {
      reader.onload = () => {
        // Only trigger when the reading is finished
        setImagePreview(reader.result); // Set the base64 image
      };
      reader.readAsDataURL(file); // Convert to base64
      setCategoryImage(file); // Store the file
    }
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
            // dataSource={data}
            columns={[
              {
                title: "S.ID",
                dataIndex: "index",
                render: (text, record, index) => <span>{index + 1}</span>,
                responsive: ["md"],
              },
              {
                title: "Category Name",
                dataIndex: "categoryName",
                render: (text, record) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={record.imageUrl}
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
                title: "Category ID",
                dataIndex: "addId",
                responsive: ["sm"],
              },
              {
                title: "Actions",
                responsive: ["sm"],
                render: (record) => (
                  <NavLink to={`/qr-code-generated/${record._id}`}>
                    {" "}
                    <button className="btn bg-blue-500 text-white px-5 py-2 rounded">
                      Manage
                    </button>
                  </NavLink>
                ),
              },
            ]}
            dataSource={allCategory?.data}
            loading={isLoading}
            pagination={{ pageSize: 5 }}
            className="user-table"
            scroll={{ x: true }}
          />
        </div>
      </ConfigProvider>

      {/* Create Category Modal */}
      <Modal
        open={isCreateModalVisible}
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
            style={{
              backgroundColor: "#1890ff",
              color: "#fff",
              border: "none",
            }}
          >
            Confirm
          </Button>,
        ]}
        centered
        style={{
          borderRadius: "8px",
          padding: "24px",
          backgroundColor: "#f9fafc",
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
          <label
            style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}
          >
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

          <label
            style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}
          >
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
                name="file"
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
                style={{
                  width: "100px",
                  height: "100px",
                  marginLeft: "20px",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>
        </div>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        open={isEditModalVisible}
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
            style={{
              backgroundColor: "#1890ff",
              color: "#fff",
              border: "none",
            }}
          >
            Confirm
          </Button>,
        ]}
        centered
        style={{
          borderRadius: "8px",
          padding: "24px",
          backgroundColor: "#f9fafc",
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
          <label
            style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}
          >
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

          <label
            style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}
          >
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
            name="file"
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
              style={{
                width: "100px",
                height: "100px",
                marginTop: "10px",
                borderRadius: "8px",
              }}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default QRCodesGenerated;
