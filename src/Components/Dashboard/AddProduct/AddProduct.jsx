import React, { useState } from "react";
import { Form, Input, Button, Upload, Select, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

const { TextArea } = Input;
const { Option } = Select;

export const AddProduct = () => {
  const [form] = Form.useForm();
  const [color, setColor] = useColor("#561ecb");
  const [colors, setColors] = useState([]);
  console.log('color code', colors);

  const handleAddColor = () => {
    setColors((prevColors) => [...prevColors, color.hex]);
  };
  

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      console.log(`${info.file.name} file uploaded successfully.`);
    } else if (info.file.status === "error") {
      console.log(`${info.file.name} file upload failed.`);
    }
  };

  const onFinish = (values) => {
    console.log("Form values: ", values);
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
          name="productName"
          rules={[{ required: true, message: "Please enter product name!" }]}
        >
          <Input placeholder="Enter Product Name" />
        </Form.Item>

        {/* Price */}
        <Form.Item
          label={<span className="text-black">Price</span>}
          name="price"
          rules={[{ required: true, message: "Please enter product price!" }]}
        >
          <Input placeholder="Enter Price" type="number" />
        </Form.Item>

        {/* Product Material */}
        <Form.Item
          label={<span className="text-black">Product Material</span>}
          name="productMaterial"
        >
          <Input placeholder="e.g., Gold, Diamond" />
        </Form.Item>

        {/* Product Details */}
        <Form.Item
          label={<span className="text-black">Product Details</span>}
          name="productDetails"
          rules={[{ required: true, message: "Please enter product details!" }]}
        >
          <TextArea placeholder="Luxury gold necklace with embedded diamond." rows={4} />
        </Form.Item>

        {/* Product Size & Material */}
       
        <Form.Item
          label={<span className="text-black">Shipping & Return</span>}
          name="shippingReturn"
        >
          <TextArea placeholder="Free shipping within 7 days. Return within 14 days." rows={3} />
        </Form.Item>

        {/* Product Instruction */}
        <Form.Item
          label={<span className="text-black">Product Instruction</span>}
          name="productInstraction"
        >
          <TextArea placeholder="Keep away from chemicals and water." rows={3} />
        </Form.Item>

        {/* Shipping & Return */}
        {/* <Form.Item
          label={<span className="text-black">Shipping & Return</span>}
          name="shippingReturn"
        >
          <TextArea placeholder="Free shipping within 7 days. Return within 14 days." rows={3} />
        </Form.Item> */}
         <Form.Item
          label={<span className="text-black">Product Size</span>}
          name="productSize"
        >
          <Input placeholder="e.g., 18 inches, 24k gold" />
        </Form.Item>
        

        {/* Category */}
        <Form.Item
          label={<span className="text-black">Category</span>}
          name="categoryId"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select placeholder="Select Category">
            <Option value="1">Jewelry</Option>
            <Option value="2">Accessories</Option>
            <Option value="3">Luxury Items</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={<span className="text-black">Product Material</span>}
          name="productMaterial"
        >
          <Input placeholder="e.g., 18 inches, 24k gold" />
        </Form.Item>

      

       {/* Color Picker */}
       <Form.Item
          label={<span className="text-black">Color Picker</span>}
        >
          <div className=" ">
            <ColorPicker width={1000} height={100}  color={color} onChange={setColor} />
            
          </div>
          <Button type="primary" onClick={handleAddColor} className="bg-blue-500 hover:bg-blue-600 float-right mt-2">
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

<Form.Item label={<span className="text-black">Product Images</span>} name="images">
          <Upload
            name="file"
            listType="picture"
            beforeUpload={() => false}
            onChange={handleUpload}
            multiple
          >
            <Button icon={<UploadOutlined />} className="p-10" style={{ backgroundColor: "#E6C379", borderColor: "#E6C379" }}>
              Upload Images
            </Button>
          </Upload>
        </Form.Item>

          {/* Cover Image */}
          <Form.Item label={<span className="text-black">Cover Image</span>} name="coverImage">
          <Upload
            name="file"
            listType="picture"
            beforeUpload={() => false}
            onChange={handleUpload}
          >
            <Button icon={<UploadOutlined />} className="p-10" style={{ backgroundColor: "#E6C379", borderColor: "#E6C379" }}>Upload Cover Image</Button>
          </Upload>
        </Form.Item>

        {/* Buttons */}
        <Form.Item className="col-span-1 md:col-span-3 flex justify-end gap-4">
          <Space>
            <Button htmlType="reset" className="bg-gray-300 text-black hover:bg-gray-400">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="bg-blue-500 hover:bg-blue-600">
              Submit Product
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
