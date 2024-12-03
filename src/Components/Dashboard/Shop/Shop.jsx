/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";

import {
  ConfigProvider,
  Modal,
  Table,
  Input,
  Button,
  Upload,
  Switch,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import {
  useCreateProductMutation,
  useGetAllProductsQuery,
} from "../../../Redux/api/shopApi";
import TextArea from "antd/es/input/TextArea";

const Shop = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState();
  const [productDescription, setProductDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState();
  const [categoryItem, setCategoryItem] = useState("");
  const [productImages, setProductImages] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(null);

  const { data: allProducts, isLoading, refetch } = useGetAllProductsQuery();
  console.log("data", allProducts?.data);
  const [createProduct] = useCreateProductMutation();

  // Trigger refetch when the component is mounted
  // useEffect(() => {
  //   refetch();
  // }, [refetch]);

  // Use the fetched data or set to an empty array if undefined
  const productData = allProducts?.data || [];

  const filteredData = useMemo(() => {
    if (!searchText) return productData;
    return productData.filter((item) =>
      item.productName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [productData, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const handleCreateProduct = async () => {
    if (!productImages) {
      alert("Image is required");
      return;
    }
    // Prepare the FormData object
    const formData = new FormData();

    const payload = {
      productName,
      price: productPrice,
      category: categoryItem,
      noOfProducts: productQuantity,
      description: productDescription,
    };

    formData.append("data", JSON.stringify(payload)); // Correctly stringify the JSON object
    formData.append("files", productImages); // Append the file

    console.log(payload); // Debug to verify the form data contents
    console.log(formData);
    console.log({ productImages });
    // Call the createProduct mutation to create a new product
    try {
      const res = await createProduct(formData).unwrap();
      console.log("Product created:", res);
      // After successful creation, close the modal and reset form
      setIsCreateModalVisible(false);
      setProductName("");
      setProductPrice("");
      setCategoryItem("");
      setFileList([]);
      setProductImages(null);
      setImagePreviews(null);
      refetch(); // Re-fetch the products to get the updated list
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  const handleEditProduct = () => {
    const editedProduct = {
      productName: productName,
      price: productPrice,
      category: categoryItem,
      images: productImages, // The array of image files
    };
    console.log("Edited Product:", editedProduct);
    setIsEditModalVisible(false);
  };

  const showEditModal = (product) => {
    console.log("product", product);
    // Pre-fill the form with existing product details
    setProductName(product.productName);
    setProductPrice(product.price);
    setCategoryItem(product.category);

    // Pre-fill image previews and fileList with existing images
    const existingFiles = product?.images?.map((img, index) => ({
      uid: index, // A unique id for each image
      name: `image-${index + 1}`, // Give each image a name
      status: "done",
      url: img, // The URL of the existing image
    }));

    setFileList(existingFiles); // Set the fileList with existing images
    setImagePreviews(product.images); // Set the previews for display

    setIsEditModalVisible(true); // Show the modal
  };

  // File change handler for uploading new images or modifying existing ones
  const handleFileChange = (info) => {
    let files = [...info.fileList].slice(0, 5); // Limit to 5 files

    setFileList(files); // Update fileList for display

    // Handle both new file uploads and existing image URLs
    const rawFiles = files.map((file) => file.originFileObj || file.url);
    setProductImages(rawFiles); // Store the raw files or URLs for later submission

    // Generate base64 previews for new files and retain URLs for existing ones
    const previews = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        if (file.originFileObj) {
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file.originFileObj);
        } else {
          resolve(file.url); // Use URL directly for existing images
        }
      });
    });

    // Update image previews state
    Promise.all(previews).then((images) => setImagePreviews(images));
  };

  console.log("image previews", imagePreviews);

  const categorys = [
    {
      id: 1,
      name: "category-1",
    },
    {
      id: 2,
      name: "category-2",
    },
    {
      id: 3,
      name: "category-3",
    },
  ];

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div>
      <div className="flex justify-center items-center mb-10">
        {/* <div>
          {categorys.map((item) => (
            <>
              <button className="mr-8 font-semibold text-md text-[#3399ff]">{item.name}</button>
            </>
          ))}
        </div> */}
        <Button
          type="primary"
          className="text-lg font-semibold py-6 w-full"
          onClick={() => setIsCreateModalVisible(true)}
        >
          + Add A Product
        </Button>
      </div>
      <div className="flex justify-between p-6 bg-[#D3E6F9] rounded">
        <h1 className="text-3xl font-bold text-black">Shop Lists</h1>
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
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#F3F3F3",
              headerColor: "black",
              colorBgContainer: "rgb(255,255,255)",
              colorText: "rgb(0,0,0)",
              headerSplitColor: "rgba(151, 198, 234, 1)",
            },
          },
        }}
      >
        <div className="w-full overflow-x-auto border-2 border-none ">
          <Table
            dataSource={filteredData}
            loading={isLoading}
            pagination={{ pageSize: 5 }}
            className="user-table"
            scroll={{ x: true }}
            columns={[
              {
                title: "S.ID",
                dataIndex: "index",
                render: (text, record, index) => <span>{index + 1}</span>,
                responsive: ["md"],
              },
              {
                title: "Name",
                dataIndex: "productName",
                render: (text, record) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={record?.imageUlrs[0]}
                      alt={record.productName}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        marginRight: 8,
                      }}
                    />
                    {/* Display the product name after the image */}
                    <span
                      style={{
                        color: "#3399ff",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "17px",
                      }}
                      onClick={() => showEditModal(record)}
                    >
                      {text}
                    </span>
                  </div>
                ),
                responsive: ["sm"],
              },
              {
                title: "Selling Price",
                dataIndex: "price",
                responsive: ["md"],
              },
              {
                title: "Category",
                dataIndex: "category",
                responsive: ["sm"],
              },
              {
                title: "Hide/Show",
                responsive: ["sm"],
                render: () => <Switch defaultChecked onChange={onChange} />,
              },
            ]}
          />
        </div>
      </ConfigProvider>

      {/* Create Product Modal */}
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
            onClick={handleCreateProduct}
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
          Add A Product
        </h2>

        <div>
          {/* Product Name */}
          <label
            style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}
          >
            Product Name
          </label>
          <Input
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            style={{
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #d9d9d9",
            }}
          />

          {/* Product Price */}
          <label
            style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}
          >
            Product Price
          </label>
          <Input
            placeholder="Enter product price"
            value={productPrice}
            type="number"
            onChange={(e) => setProductPrice(Number(e.target.value))}
            style={{
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #d9d9d9",
            }}
          />

          <label
            style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}
          >
            Description
          </label>
          <TextArea
            placeholder="Enter product description"
            value={productDescription}
            type="text"
            onChange={(e) => setProductDescription(e.target.value)}
            style={{
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #d9d9d9",
              height: "100px",
            }}
          />

          <label
            style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}
          >
            Product Quantity
          </label>
          <Input
            placeholder="Enter no. of products"
            value={productQuantity}
            type="number"
            onChange={(e) => setProductQuantity(Number(e.target.value))}
            style={{
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #d9d9d9",
            }}
          />

          {/* Product Category */}
          <label
            style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}
          >
            Category
          </label>
          <br />
          <Select
            value={categoryItem} // The selected value
            onChange={(value) => setCategoryItem(value)} // Set the selected value
            style={{
              width: "100%",
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #d9d9d9",
            }}
            options={categorys.map((item) => ({
              value: item.name, // Assuming `name` is the unique identifier
              label: item.name, // Display name of the category
            }))}
          />

          {/* Image Upload Section */}
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
                Import photos (5 photo maximum)
              </label>
              <br />
              <br />
              <Upload
                name="photos"
                listType="picture"
                multiple
                fileList={fileList} // Manage selected files
                showUploadList={true} // Show the uploaded files
                beforeUpload={() => false} // Prevent auto upload
                onChange={handleFileChange} // Handle file selection
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

            {/* Image Previews */}
            {/* <div style={{ display: "flex", marginLeft: "20px" }}>
            {imagePreviews?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Preview ${index + 1}`}
                style={{
                  width: "70px",
                  height: "70px",
                  marginLeft: index === 0 ? "0" : "10px",
                  borderRadius: "8px",
                }}
              />
            ))}
          </div> */}
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
            onClick={handleEditProduct}
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
          Edit Product
        </h2>

        <div>
          {/* Product Name */}
          <label
            style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}
          >
            Product Name
          </label>
          <Input
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            style={{
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #d9d9d9",
            }}
          />

          {/* Product Price */}
          <label
            style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}
          >
            Product Price
          </label>
          <Input
            placeholder="Enter product price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            style={{
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #d9d9d9",
            }}
          />

          {/* Product Category */}
          <label
            style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}
          >
            Category
          </label>
          <Select
            value={categoryItem}
            onChange={(value) => setCategoryItem(value)}
            style={{
              width: "100%",
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #d9d9d9",
            }}
            options={categorys.map((item) => ({
              value: item.name,
              label: item.name,
            }))}
          />

          {/* Image Upload Section */}
          <label
            style={{
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "8px",
              marginRight: "10px",
            }}
          >
            Import a photo (5 photos maximum)
          </label>
          <br />
          <br />
          <Upload
            name="photos"
            listType="picture"
            multiple
            fileList={fileList}
            showUploadList={true}
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

          {/* Image Previews */}
          {/* <div style={{ display: "flex", marginTop: "10px", gap: "10px" }}>
      {imagePreviews && imagePreviews.map((preview, index) => (
        <img
          key={index}
          src={preview}
          alt={`Preview ${index + 1}`}
          style={{ width: "100px", height: "100px", borderRadius: "8px" }}
        />
      ))}
    </div> */}
        </div>
      </Modal>
    </div>
  );
};

export default Shop;
