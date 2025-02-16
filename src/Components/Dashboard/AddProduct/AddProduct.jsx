import React, { useState } from "react";
import { Form, Input, Button, Upload, Select, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import Swal from "sweetalert2";
import { useCreateProductMutation, useGetAllProductsQuery } from "../../../Redux/api/productsApi";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

export const AddProduct = () => {
  const [form] = Form.useForm();
  const [color, setColor] = useColor("#561ecb");
  const [categorySelect, setCategorySelect] = useState();
  const [colors, setColors] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const navigate = useNavigate();

  const [productCreate] = useCreateProductMutation();

  const {
      data: allProducts,
      isLoading,
      refetch,
    } = useGetAllProductsQuery(null);



const handleUpload = ({ fileList }) => {
  setFileList(fileList);
};
const handleUpload2 = ({ fileList2 }) => {
  setFileList2(fileList2);
};

 

  const handleAddColor = () => {
    setColors((prevColors) => [...prevColors, color.hex]);
  };

  // const handleUpload = (info) => {
  //   if (info.file.status === "done") {
  //     console.log(`${info.file.name} file uploaded successfully.`);
  //   } else if (info.file.status === "error") {
  //     console.log(`${info.file.name} file upload failed.`);
  //   }
  // };

  console.log('colors ====', colors);

  const onFinish = async (values) => {
    if (!values.images || values.images.fileList.length === 0) {
      Swal.fire('Please upload at least one product image!');
      return;
    }
  
    if (!values.coverImage || values.coverImage.fileList.length === 0) {
      Swal.fire('Please upload a cover image!');
      return;
    }
  
    console.log("Form values: ", values);
  
    // Extract images (file objects or URLs)
    const coverImage = values.coverImage.fileList.map(file => file.originFileObj || file.url);
    const images = values.images.fileList.map(file => file.originFileObj || file.url);
  
    console.log('colors:', colors);
    console.log('coverImage:', coverImage);
    console.log('images:', images);
  
    const formData = new FormData();
  
    // Append text data
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price);
    formData.append('stock', values.stock);
    formData.append('category', values.category);
    formData.append('subCategory', values.subCategory);
    formData.append('colors', JSON.stringify(colors)); // Convert array to string
    // formData.append('colors', colors); // Convert array to string
  
    // Append cover image (assuming one cover image)
    formData.append('coverImage', coverImage[0]);
  
    // Append all images
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });
  
    try {
      const res = await productCreate(formData).unwrap();
      console.log('Product Create Response:', res);
  
      if (res.success) {
        Swal.fire({
          icon: 'success',
          title: 'Product Created Successfully!',
          text: 'Your product has been added.',
        });
        refetch();
        navigate('/products')
      }
    } catch (error) {
      console.error('Error creating product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Create Product',
        text: error.message || 'Something went wrong!',
      });
    }
  };
  

  return (
    <div className="min-h-[90vh] p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add Product</h2>
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
          <Input required placeholder="Enter Product Name" />
        </Form.Item>
        <Form.Item
          label={<span className="text-black">Product Category</span>}
          name="category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select
            onChange={(value) => setCategorySelect(value)}
            placeholder="Select Category"
          >
            <Option value="fingerprint">Fingerprint</Option>
            <Option value="handwriting">Handwriting</Option>
          </Select>
        </Form.Item>
       
          <Form.Item
            label={<span className="text-black">Product Sub Category</span>}
            name="subCategory"
            rules={[
              // { required: true, message: "Please select a sub category!" },
            ]}
          >
            <Select
              placeholder="Select Sub Category"
              disabled={categorySelect !== "fingerprint"}
            >
              {categorySelect === "fingerprint" ? (
                <>
                  <Option value="1">Fingerprint 1</Option>
                  <Option value="2">Fingerprint 2</Option>
                  <Option value="3">Fingerprint 3</Option>
                </>
              ) : (
                <>
                  <Option value="4">Handwriting 1</Option>
                  <Option value="5">Handwriting 2</Option>
                  <Option value="6">Handwriting 3</Option>
                </>
              )}
            </Select>
          </Form.Item>
        <Form.Item
          label={<span className="text-black">Product Price</span>}
          name="price"
          rules={[{ required: true, message: "Please enter product price!" }]}
        >
          <Input placeholder="Enter Price" type="number" />
        </Form.Item>
        <Form.Item
          label={<span className="text-black">Product Stock</span>}
          name="stock"
          rules={[{ required: true, message: "Please enter product stock!" }]}
        >
          <Input placeholder="Enter stock" type="number" />
        </Form.Item>
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

        <Form.Item label={<span className="text-black">Color Picker</span>}>
          <div className=" ">
            <ColorPicker
              width={1000}
              height={100}
              color={color}
              onChange={setColor}
            />
          </div>
          <Button
            onClick={handleAddColor}
            style={{ backgroundColor: "#E6C379", borderColor: "#E6C379" }}
            className="float-right mt-2"
          >
            Add Color
          </Button>
          <div className="mt-4">
            <span className="text-black font-semibold">Selected Colors: </span>
            <div className="flex gap-1 mt-1">
              {colors.map((c, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: c }}
                ></div>
              ))}
            </div>
          </div>
        </Form.Item>

        <Form.Item
          label={<span className="text-black">Product Images</span>}
          name="images"
        >
          <Upload
            name="file"
            listType="picture"
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleUpload}
            multiple
            rules={[{ required: true, message: "Please enter product Images!" }]}
          >
            <Button
              icon={<UploadOutlined />}
              className="p-10"
              style={{ backgroundColor: "#E6C379", borderColor: "#E6C379" }}
            >
              Upload Images
            </Button>
          </Upload>
        </Form.Item>

        {/* Cover Image */}
        <Form.Item
          label={<span className="text-black">Cover Image</span>}
          name="coverImage"
        >
          <Upload
            name="file"
            listType="picture"
            beforeUpload={() => false}
            fileList={fileList2}
            onChange={handleUpload2}
            rules={[{ required: true, message: "Please enter product cover image!" }]}
          >
            <Button
              icon={<UploadOutlined />}
              className="p-10"
              style={{ backgroundColor: "#E6C379", borderColor: "#E6C379" }}
            >
              Upload Cover Image
            </Button>
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
              Submit Product
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
