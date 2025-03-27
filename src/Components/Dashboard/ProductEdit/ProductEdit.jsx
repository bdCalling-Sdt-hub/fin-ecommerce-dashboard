import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, Space, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import {
  useCreateProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../../Redux/api/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import { getImageUrl } from "../../../utils/baseUrl";

// const dburl = "http://10.0.70.35:8025/";
const dburl = getImageUrl();

const { TextArea } = Input;

export const ProductEdit = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [imageList, setImageList] = useState([]);
  const navigate = useNavigate();
  const [updateProduct] = useUpdateProductMutation();
  const { data: singleProduct } = useGetSingleProductQuery(id);

  console.log("singleProduct******", singleProduct);

  // State to store selected material details
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  // Set the first material as the default when the component mounts
  useEffect(() => {
    if (
      singleProduct?.data?.selectMaterialItems &&
      singleProduct?.data?.selectMaterialItems.length > 0
    ) {
      // Set the first material as the default
      const defaultMaterial = singleProduct?.data?.selectMaterialItems[0];
      setSelectedMaterial(defaultMaterial);

      // Populate form fields with the first material's data
      form.setFieldsValue({
        name: defaultMaterial?.name,
        price: defaultMaterial?.price,
        stock: defaultMaterial?.stock,
        description: defaultMaterial?.description,
        // images: defaultMaterial?.images,
      });

      setImageList(
        defaultMaterial?.images.map((url) => {
          const fullUrl = `${dburl}${url.replace(/\\/g, "/")}`;
          return {
            uid: fullUrl,
            name: fullUrl.split("/").pop(),
            status: "done",
            url: fullUrl,
          };
        })
      );
    }
  }, [singleProduct, form]);

  // useEffect(() => {
  //   if (singleProduct?.data?.selectMaterialItems) {
  //     const materialImages = singleProduct?.data?.selectMaterialItems.map(
  //       (item) => {
  //         if (item.images && item.images.length > 0) {
  //           console.log('image length', item.images.length)
  //           const initialImageList = item.images.map((url) => {
  //             console.log('url url',url);
  //             const fullUrl = `${dburl}${url.replace(/\\/g, "/")}`;
  //             return {
  //               uid: fullUrl,
  //               name: fullUrl.split("/").pop(),
  //               status: "done",
  //               url: fullUrl,
  //             };
  //           });
  //           console.log('initialImageList00000',initialImageList);
  //           setImageList(initialImageList); // Update the state with the formatted image list
  //         }
  //       }
  //     );
  //   }
  // }, [singleProduct]);

  // console.log("imageList===", imageList);

  // Handle material selection and update the form fields
  const handleSingleMaterial = (id) => {
    const material = singleProduct?.data?.selectMaterialItems?.find(
      (item) => item._id === id
    );
    setSelectedMaterial(material);
    // Populate form fields with selected material info
    form.setFieldsValue({
      name: material?.name,
      price: material?.price,
      stock: material?.stock,
      description: material?.description,
      // images: material?.images,
    });

    // Update the image list when a new material is selected
    const updatedImageList = material?.images.map((url) => {
      const fullUrl = `${dburl}${url.replace(/\\/g, "/")}`;
      return {
        uid: fullUrl,
        name: fullUrl.split("/").pop(),
        status: "done",
        url: fullUrl,
      };
    });

    // Set the image list dynamically based on the selected material
    setImageList(updatedImageList);
  };

  // Handle file upload changes
  const handleUploadChange = ({ fileList: newFileList }) => {
    setImageList(newFileList);
  };

  // Before Upload hook for file validation
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage;
  };
  // Handle form submission
  const onFinish = async (values) => {
    console.log("values==", values);
    const formData = {
      ...values,
      images: imageList
        .filter((img) => img !== undefined && img.originFileObj)
        .map((file) => file.originFileObj),
      materialId: selectedMaterial._id,
    };

    const deleteUrl = imageList
      .filter((file) => file.status === "done")
      .map((file) => file.url.replace(dburl, ""));

    if (deleteUrl.length > 0) {
      formData.deleteUrl = deleteUrl;
    }

    console.log("formData=", formData);

    try {
      const res = await updateProduct({ id, data: formData }).unwrap();
      if (res.success) {
        Swal.fire("Success", "Product updated successfully!", "success");
        // navigate("/products");
      }
    } catch (error) {
      Swal.fire("Error", error.message || "Something went wrong!", "error");
    }
  };

  return (
    <div className="min-h-[90vh] p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Product</h2>

      {/* Material selection buttons */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Select Material</h2>

        <div className="flex gap-4">
          {singleProduct?.data?.selectMaterialItems?.map((item, index) => (
            <button
              key={index}
              onClick={() => handleSingleMaterial(item._id)}
              className={`border-2 px-6 py-2 rounded-none text-lg font-medium transition duration-300 ease-in-out focus:outline-none  focus:ring-gray-500 focus:ring-offset-2 
                ${
                  selectedMaterial?._id === item._id
                    ? "bg-[#E6C379] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                }`}
            >
              {item.materialName}
            </button>
          ))}
        </div>
      </div>

      {/* Form to edit product */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Product Name */}
        <Form.Item
          label={<span className="text-black">Product Name</span>}
          name="name"
          rules={[{ required: true, message: "Please enter product name!" }]}
        >
          <Input required placeholder="Enter Product Name" className="p-2" />
        </Form.Item>

        {/* Product Price */}
        <Form.Item
          label={<span className="text-black">Product Price</span>}
          name="price"
          rules={[{ required: true, message: "Please enter product price!" }]}
        >
          <Input placeholder="Enter Price" type="number" />
        </Form.Item>

        {/* Product Stock */}
        <Form.Item
          label={<span className="text-black">Product Stock</span>}
          name="stock"
          rules={[{ required: true, message: "Please enter product stock!" }]}
        >
          <Input placeholder="Enter stock" type="number" />
        </Form.Item>

        {/* Product Description */}
        <Form.Item
          label={<span className="text-black">Product Details</span>}
          name="description"
          rules={[{ required: true, message: "Please enter product details!" }]}
        >
          <TextArea
            placeholder="Luxury gold necklace with embedded diamond."
            rows={4}
          />
        </Form.Item>

        {/* Image upload */}
        <Form.Item
          label={<span className="text-black">Product Image</span>}
          name="images"
        >
          <Upload
            // action="/upload" // Change this URL to your API endpoint
            listType="picture-card"
            fileList={imageList}
            onChange={handleUploadChange}
            beforeUpload={beforeUpload}
            multiple
            showUploadList={{ showRemoveIcon: true }}
          >
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8, padding: "5px 20pox" }}>
                Image Upload
              </div>
            </div>
          </Upload>
        </Form.Item>

        {/* Buttons */}
        <Form.Item className="col-span-1 md:col-span-3 flex justify-end gap-4">
          <Space>
            <Button
              htmlType="reset"
              style={{ borderRadius: 0 }}
              className="bg-gray-300 text-black hover:bg-gray-400"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#E6C379",
                borderColor: "#E6C379",
                borderRadius: 0,
              }}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Update Product
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductEdit;
