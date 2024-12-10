/* eslint-disable no-unused-vars */
import { useState, useMemo, useEffect } from "react";

import {
  ConfigProvider,
  Modal,
  Table,
  Input,
  Button,
  Upload,
  Switch,
  Select,
  InputNumber,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import {
  useCreateProductMutation,
  useEditProductMutation,
  useGetUniqueProductsQuery,
} from "../../../Redux/api/shopApi";
import TextArea from "antd/es/input/TextArea";
import { useGetAllCategoryQuery } from "../../../Redux/api/categoryApi";
import { toast } from "sonner";

const Shop = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState();
  const [productDescription, setProductDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState();
  const [categoryItem, setCategoryItem] = useState("");
  const [productImages, setProductImages] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(null);

  const { data: allProducts, isLoading, refetch } = useGetUniqueProductsQuery();
  console.log("allProducts", allProducts?.data);
  const { data: allCategory } = useGetAllCategoryQuery();
  console.log("allCategory", allCategory?.data);

  const [createProduct] = useCreateProductMutation();
  const [editProduct] = useEditProductMutation();

  useEffect(() => {
    if (allProducts?.data) {
      const mappedData = allProducts?.data.map((product) => {
        // const firstProduct = product.firstProduct || {};
        return {
          productId: product._id || "",
          productName: product.name || "",
          price: product.price || "",
          description: product.description || "",
          imageUlrs: product.images[0],
          category: product.categoryId || "",
          productCount: product.productCount || "",
          createdAt: product.createdAt || "",
          updatedAt: product.updatedAt || "",
          qrCodeUrl: product.qrCodeUrl || "",
          isDeleted:
            product.isDeleted !== undefined ? product.isDeleted : false, // Default to false if undefined
          isHidden: product.isHidden !== undefined ? product.isHidden : false, // Default to false if undefined
          isSold: product.isSold !== undefined ? product.isSold : false, // Default to false if undefined
          addId: product.addId || "",
        };
      });
      setProductData(mappedData);
    }
  }, [allProducts?.data]); // This will run whenever allProducts.data changes
  console.log("productData", productData);

  const filteredData = useMemo(() => {
    if (!searchText) return productData;
    return productData.filter((item) =>
      item.productName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [productData, searchText]);

  console.log("Filtered Data:", filteredData);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const handleCreateProduct = async () => {
    if (!productImages) {
      alert("Image is required");
      return;
    }

    const formData = new FormData();

    const payload = {
      name: productName,
      price: productPrice,
      categoryId: categoryItem,
      quantity: productQuantity,
      description: productDescription,
    };

    // Append the data and the product images to the FormData
    formData.append("data", JSON.stringify(payload));
    productImages.forEach((file) => {
      formData.append("files", file);
    });

    for (let pair of formData.entries()) {
      console.log(pair);
    }

    try {
      const res = await createProduct(formData).unwrap();
      console.log("Product created:", res);
      setIsCreateModalVisible(false); // Close the modal after creation
      setProductName(""); // Reset product name
      setProductDescription(""); // Reset description
      setProductPrice(""); // Reset price
      setProductImages(null); // Reset product images
      setImagePreviews([]); // Reset image previews
      toast.success("Product Added Succesfully");
      refetch(); // Refresh the product list
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  const handleFileChange = (info) => {
    let files = [...info.fileList].slice(0, 5); // Limit to 5 files

    setFileList(files); // Update fileList for display
    console.log(files);

    const rawFiles = files.map((file) => file.originFileObj || file.url);
    setProductImages(rawFiles);

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

    Promise.all(previews).then((images) => setImagePreviews(images));
  };

  const handleEditProduct = async () => {
    if (!selectedProduct) {
      alert("No product selected to edit");
      return;
    }

    if (!productImages && !imagePreviews.length) {
      alert("Image is required");
      return;
    }

    console.log("Editing Product:", selectedProduct);

    const formData = new FormData();

    // Construct the updated product details
    const updatedProduct = {
      name: productName || selectedProduct.name,
      price: productPrice || selectedProduct.price,
      categoryId: categoryItem || selectedProduct.categoryId,
      quantity: productQuantity || selectedProduct.quantity,
      description: productDescription || selectedProduct.description,
    };

    // Append the updated product data as JSON to FormData
    formData.append("data", JSON.stringify(updatedProduct));

    // If there are new images, append them to FormData
    if (productImages && productImages.length > 0) {
      productImages.forEach((file) => {
        formData.append("files", file);
      });
    } else {
      if (imagePreviews.length > 0) {
        imagePreviews.forEach((url) => {
          formData.append("existingFiles", url); // Send existing image URLs if applicable
        });
      }
    }

    try {
      const res = await editProduct({
        id: selectedProduct.productId, // Ensure you send the correct product ID
        data: formData,
      }).unwrap();
      console.log("Product updated:", res);

      // Reset state and close the modal
      setIsEditModalVisible(false); // Close the modal after update
      setProductName(""); // Reset product name
      setProductDescription(""); // Reset description
      setProductPrice(""); // Reset price
      setProductImages(null); // Reset product images
      setImagePreviews([]); // Reset image previews

      toast.success("Product Updated Successfully");
      refetch(); // Refresh the product list
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error("Failed to update product. Please try again.");
    }
  };

  const showEditModal = (product) => {
    console.log("product", product);

    const existingFiles = product?.images?.map((img, index) => ({
      uid: index, // A unique id for each image
      name: `image-${index + 1}`, // Give each image a name
      status: "done",
      url: img, // The URL of the existing image
    }));

    setFileList(existingFiles);
    setImagePreviews(product.images);
    setSelectedProduct(product);
    setIsEditModalVisible(true);
  };

  console.log("image previews", imagePreviews);

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
                dataIndex: "productId",
                render: (text, record, index) => (
                  <div>
                    <img
                      src={`http://192.168.12.235:8008/${record.imageUlrs}`}
                      alt={record.name}
                      className="size-12 rounded-full"
                    />
                  </div>
                ),
                responsive: ["md"],
              },
              {
                title: "Name",
                dataIndex: "productName",
                render: (text, record) => (
                  <span
                    className="text-[#3B82F6] cursor-pointer text-lg font-semibold"
                    onClick={() => showEditModal(record)}
                  >
                    {text}
                  </span>
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
                dataIndex: "categoryId",
                render: (text, record) => {
                  return record.category ? record.category.categoryName : "N/A";
                },
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
            type="text"
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
              color: "black",
            }}
            options={allCategory?.data.map((item) => ({
              value: item.id,
              label: item.categoryName,
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
            onClick={() =>
              handleEditProduct({
                productName,
                productDescription,
                productPrice,
                categoryItem,
                productImages: fileList.map(
                  (file) => file.url || file.response?.url
                ), // Process image URLs if needed
              })
            }
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

        {/* Product Name */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}
          >
            Product Name
          </label>
          <Input
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
        </div>

        {/* Product Price */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}
          >
            Price
          </label>
          <InputNumber
            value={productPrice}
            onChange={(value) => setProductPrice(value)}
            style={{ width: "100%", marginBottom: "20px" }}
            min={0}
          />
        </div>

        {/* Product Category */}
        <div style={{ marginBottom: "20px" }}>
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
            options={allCategory?.data.map((item) => ({
              value: item._id,
              label: item.categoryName,
            }))}
          />
        </div>

        {/* Image Upload */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}
          >
            Product Images
          </label>
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
      </Modal>
    </div>
  );
};

export default Shop;
