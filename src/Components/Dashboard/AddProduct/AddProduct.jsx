import React, { useState } from "react";
import { Form, Input, Button, Upload, Select, Space } from "antd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import Swal from "sweetalert2";
import {
  useCreateProductMutation,
  useGetAllProductsQuery,
} from "../../../Redux/api/productsApi";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

export const AddProduct = () => {
  const [form] = Form.useForm();
  const [color, setColor] = useColor("#561ecb");
  const [categorySelect, setCategorySelect] = useState();
  const [fileList, setFileList] = useState();
  const [fileList2, setFileList2] = useState();
  const [imageAndColor, setImageAndColor] = useState([]);
  const [imageList, setImageList] = useState([]); // For storing uploaded images
  const [colorList, setColorList] = useState([]);
  const navigate = useNavigate();
  const [productCreate] = useCreateProductMutation();
  const {
    data: allProducts,
    isLoading,
    refetch,
  } = useGetAllProductsQuery(null);

  console.log(imageList);

  const handleUpload2 = ( {fileList2} ) => {
    setFileList2(fileList2);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  // Handle file upload
  const handleUpload = (info) => {
    const newFileList = info.fileList;
    console.log("newFileList==", newFileList);
    setFileList(newFileList);
  };



  const handleAddImageColor = () => {
    if (fileList.length > 0) {
      const newImageList = fileList.map((file) => file.originFileObj); // Get the uploaded image file objects
      const newColorList = newImageList.map(() => color); // Assign the selected color to each image

      // Update the state with the new image and color
      setImageList((prev) => [
        ...prev,
        {
          color: newColorList,
          image: newImageList,
        },
      ]);

      setFileList(null);
    }
  };

  // console.log("colorList==", colorList);
  // console.log("imageList==", imageList);

  const handleDeleteImageColor = (index) => {
    const updatedImageList = [...imageList];
    updatedImageList.splice(index, 1);
    setImageList(updatedImageList);
  };

  const onFinish = async (values) => {

    // if (!values.coverImage || values.coverImage.fileList.length === 0) {
    //   Swal.fire("Please upload a cover image!");
    //   return;
    // }

    if(imageList.length === 0) {
      Swal.fire("Please upload at least one image and color!");
      return;
    }


    const imageAndColor = imageList.map((item) => {
      return {
        color: item.color.length > 0 ? item.color[0].hex : '',
        image: item.image.length > 0 ? item.image[0] : null // Send the file itself, not the uid
      };
    });

    console.log('imageAndColor====',imageAndColor);


    // Extract images (file objects or URLs)
    // const coverImage = values.coverImage.fileList.map(
    //   (file) => file.originFileObj || file.url
    // );
   
    // console.log("coverImage:--", coverImage);

    const formData = new FormData();

    // // Append text data
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price);
    formData.append('stock', values.stock);
    formData.append('category', values.category);
    formData.append('subCategory', values.subCategory);
    // formData.append('images', JSON.stringify(imageAndColor));
    // imageAndColor.map((item)=>{
    //   formData.append(`productImages_${item.color}`, item.image);
    // })

    imageAndColor.forEach((item) => {
      console.log('item====',item);
      if (item.image) {
        formData.append(`images_${item.color}`, item.image); 
      }
    });

    
    // Append cover image (assuming one cover image)
    // formData.append('coverImage', coverImage[0]);


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
          <Input required placeholder="Enter Product Name" className="p-2" />
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
          rules={
            [
              // { required: true, message: "Please select a sub category!" },
            ]
          }
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
        {/* <Form.Item
          label={<span className="text-black">Cover Image</span>}
          name="coverImage"
        >
          <Upload
            name="file"
            listType="picture"
            beforeUpload={() => false}
            fileList={fileList2}
            onChange={handleUpload2}
            rules={[
              { required: true, message: "Please enter product cover image!" },
            ]}
          >
            <Button
              icon={<UploadOutlined />}
              className="p-10"
              style={{
                backgroundColor: "#E6C379",
                borderColor: "#E6C379",
                borderRadius: "none",
              }}
            >
              Upload Cover Image
            </Button>
          </Upload>
        </Form.Item> */}

        <div>
          <Form.Item label={<span className="text-black">Color Picker</span>}>
            <ColorPicker
              width={500}
              height={80}
              color={color}
              onChange={handleColorChange}
              // onChange={color => setColor(color.hex)}
            />
          </Form.Item>

          <Form.Item label={<span className="text-black">Product Images</span>}>
            <Upload
              name="file"
              listType="picture"
              beforeUpload={() => false} // Disable auto upload
              fileList={fileList}
              onChange={handleUpload}
              rules={[
                { required: true, message: "Please enter product Images!" },
              ]}
            >
              <Button
                icon={<UploadOutlined />}
                className="p-10"
                style={{
                  backgroundColor: "#E6C379",
                  borderColor: "#E6C379",
                  borderRadius: "none",
                }}
              >
                Upload Images
              </Button>
            </Upload>
          </Form.Item>

          <button
          type="button"
            className="bg-[#E6C379] px-4 py-2 text-base float-right"
            onClick={handleAddImageColor}
          >
            Add Image Color
          </button>
        </div>

        <div className="mt-4">
          <h3 className="mb-2">Preview Image And Color:</h3>
          {imageList.map((item, index) => (
            <div key={index} className="flex items-center gap-4 mb-4 w-full border p-1 rounded ">
              <div className="flex items-center border rounded p-2 justify-between w-96 ">
              <img
                src={URL.createObjectURL(item?.image[0])}
                alt={`image-${index}`}
                className="w-20 h-20 object-cover border-2 border-gray-300 rounded-full mr-14"
              />
              <div
                className="w-10 h-10 rounded-full"
                style={{ backgroundColor: item?.color?.[0]?.hex }}
              ></div>
              </div>
              <div className="cursor-pointer ml-10 "> <DeleteOutlined onClick={() => handleDeleteImageColor(index)} className="text-[#E6C379] text-xl" /> </div>
              
            </div>
          ))}
        </div>

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
