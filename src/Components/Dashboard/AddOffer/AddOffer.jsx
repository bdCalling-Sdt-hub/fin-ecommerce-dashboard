import React from "react";
import { Form, Input, Button, DatePicker, Select, Upload, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

export const AddOffer = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      console.log(`${info.file.name} file uploaded successfully.`);
    } else if (info.file.status === "error") {
      console.log(`${info.file.name} file upload failed.`);
    }
  };

  const onFinish = (values) => {
    // console.log('files', values.offerImage.file);
    
    console.log("Form values: ", values);
    if(values){
        Swal.fire({
            title: "Offer Published Successfully!",
            text: "The offer has been success!.",
            icon: "success",
          });
          navigate("/offers");
    }
  };

  return (
    <div className="min-h-[90vh] p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Create Offer</h2>
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

        {/* Offer Title */}
        <Form.Item
          label={<span className="text-black">Offer Title</span>}
          name="offerTitle"
          rules={[{ required: true, message: "Please enter offer title!" }]}
        >
          <Input placeholder="Enter Your Offer Title" />
        </Form.Item>

        {/* Offer Type */}
        <Form.Item
          label={<span className="text-black">Offer Type</span>}
          name="offerType"
          rules={[{ required: true, message: "Please select offer type!" }]}
        >
          <Select placeholder="Select Offer Type">
            <Option value="Discount">Discount Offer</Option>
            <Option value="Special">Special Offer</Option>
            <Option value="Flash">Flash Sale</Option>
          </Select>
        </Form.Item>

        {/* Discount Type */}
        <Form.Item
          label={<span className="text-black">Discount Type</span>}
          name="discountType"
          rules={[{ required: true, message: "Please enter discount type!" }]}
        >
          <Input placeholder="e.g., Percentage or Flat Amount" />
        </Form.Item>

        {/* Start Date */}
        <Form.Item
          label={<span className="text-black">Start Date</span>}
          name="startDate"
          rules={[{ required: true, message: "Please select start date!" }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>

        {/* End Date */}
        <Form.Item
          label={<span className="text-black">End Date</span>}
          name="endDate"
          rules={[{ required: true, message: "Please select end date!" }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>

        {/* Discount Amount */}
        <Form.Item
          label={<span className="text-black">Discount Amount</span>}
          name="discountAmount"
          rules={[{ required: true, message: "Please enter discount amount!" }]}
        >
          <Input placeholder="Enter Discount Value" />
        </Form.Item>

        {/* Upload Offer Picture */}
        <Form.Item label={<span className="text-black">Upload Offer Picture</span>} name="offerImage">
          <Upload
            name="file"
            listType="picture"
            beforeUpload={() => false}
            onChange={handleUpload}
            className=""
          >
            <Button icon={<UploadOutlined />} className="w-full p-5" style={{ backgroundColor: "#E6C379", borderColor: "#E6C379" }}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        {/* Offer Description */}
        <Form.Item
          label={<span className="text-black">Offer Description</span>}
          name="offerDescription"
          className="col-span-1 md:col-span-3"
          rules={[{ required: true, message: "Please enter offer description!" }]}
        >
          <TextArea rows={4} placeholder="Write detailed offer description here..." />
        </Form.Item>

        {/* Buttons */}
        <Form.Item className="col-span-1 md:col-span-3 flex justify-end gap-4">
            <Space><Button htmlType="reset" style={{ backgroundColor: "#FE3838", borderColor: "#FE3838", color: "white" }} >
            Cancel
          </Button>
          <Button type="primary" style={{ backgroundColor: "#E6C379", borderColor: "#E6C379" }} htmlType="submit">
            Publish Offer
          </Button></Space>
          
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddOffer;
