// import React, { useState } from "react";
// import {
//   Form,
//   Input,
//   Button,
//   Upload,
//   Select,
//   Space,
//   ConfigProvider,
//   Table,
// } from "antd";
// import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
// import { ColorPicker, useColor } from "react-color-palette";
// import "react-color-palette/css";
// import Swal from "sweetalert2";
// import {
//   useCreateProductMutation,
//   useGetAllProductsQuery,
// } from "../../../Redux/api/productsApi";
// import { useNavigate } from "react-router-dom";

// const { TextArea } = Input;
// const { Option } = Select;

// export const AddProduct = () => {
//   const [form] = Form.useForm();
//   const [categorySelect, setCategorySelect] = useState();
//   const [fileList, setFileList] = useState();
//   const [fileList2, setFileList2] = useState();
//   const [imageList, setImageList] = useState([]); 
//   const navigate = useNavigate();
//   const [materialproductItems, setMaterialProductItems] = useState([]);
//   const [productCreate] = useCreateProductMutation();
//   const {
//     data: allProducts,
//     isLoading,
//     refetch,
//   } = useGetAllProductsQuery(null);

//   console.log(imageList);

//   const handleUpload2 = ({ fileList2 }) => {
//     setFileList2(fileList2);
//   };

  

//   // Handle file upload
//   const handleUpload = (info) => {
//     const newFileList = info.fileList;
//     console.log("newFileList==", newFileList);
//     setFileList(newFileList);
//   };





//   const onFinish = async (values) => {
//     console.log('onFinish2 values==',values);
//     setMaterialProductItems(...materialproductItems, values)
    
//   };

//   console.log('materialproductItems==',materialproductItems);

//   const handleSubmitProducts = async (values) => {
  


//     // try {
//     //   const res = await productCreate(formData).unwrap();
//     //   console.log("Product Create Response:", res);

//     //   if (res.success) {
//     //     Swal.fire({
//     //       icon: "success",
//     //       title: "Product Created Successfully!",
//     //       text: "Your product has been added.",
//     //     });
//     //     refetch();
//     //     navigate("/products");
//     //   }
//     // } catch (error) {
//     //   console.error("Error creating product:", error);
//     //   Swal.fire({
//     //     icon: "error",
//     //     title: "Failed to Create Product",
//     //     text: error.message || "Something went wrong!",
//     //   });
//     // }


//   };

//   const productItems = [
//     {
//       _id: "1",
//       selectMaterial: "solid_gold",
//       color: "#FFD700",
//       price: 100,
//       stock: 10,
//       category: "fingerPrint",
//       subCategory: "1",
//       name: "Product 1",
//       details: "Details 1",
//       images: [],
//     },
//     {
//       _id: "2",
//       selectMaterial: "gold_vermeil",
//       color: "#FFD700",
//       price: 100,
//       stock: 10,
//       category: "handWriting",
//       subCategory: "2",
//       name: "Product 2",
//       details: "Details 2",
//       images: [],
//     },
//   ];

//   const selectMaterialOptions = [
//     { value: "solid_gold", label: "Solid Gold", color: "#FFD700" },
//     { value: "gold_vermeil", label: "Gold Vermeil", color: "#FFD700" },
//     { value: "gold_plated", label: "Gold Plated", color: "#DAA520" },
//     {
//       value: "rose_gold_vermeil",
//       label: "Rose Gold Vermeil",
//       color: "#B76E79",
//     },
//     { value: "rose_gold_plated", label: "Rose Gold Plated", color: "#B76E79" },
//     { value: "sterling_silver", label: "Sterling Silver", color: "#C0C0C0" },
//   ];

//   return (
//     <div className="min-h-[90vh] p-6">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">Add Product</h2>
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//       >
       

//         <Form.Item
//           className="col-span-1"
//           label={<span className="text-black">Product Category</span>}
//           name="category"
//           rules={[{ required: true, message: "Please select a category!" }]}
//         >
//           <Select
//             onChange={(value) => setCategorySelect(value)}
//             placeholder="Select Category"
//           >
//             <Option value="fingerprint">Fingerprint</Option>
//             <Option value="handwriting">Handwriting</Option>
//           </Select>
//         </Form.Item>
//         <div></div>
//         <div></div>

//         {/* table start */}
//         <div className="col-span-3">
//           <ConfigProvider
//             theme={{
//               components: {
//                 Table: {
//                   headerBg: "#18191B",
//                   colorBgContainer: "rgb(255,255,255)",
//                   colorText: "rgb(0,0,0)",
//                   borderColor: "rgb(255,255,255)",
//                   headerSplitColor: "rgb(255,255,255)",
//                   headerColor: "#E6C379",
//                   footerBg: "rgb(255,255,255)",
//                   // borderRadius: 20,
//                 },
//               },
//             }}
//           >
//             <Table
//               dataSource={productItems}
//               loading={isLoading}
//               // pagination={{ pageSize: 10 }}
//               pagination={false}
//               rowKey={(record) => record.serialId}
//               scroll={{ x: true }}
//             >
//               <Table.Column
//                 title="S.ID"
//                 dataIndex="serialId"
//                 key="serialId"
//                 render={(_, __, index) => index + 1}
//               />
//               <Table.Column
//                 title="Product Name"
//                 render={(_, record) => record.name || "N/A"}
//                 key="name"
//               />
//               <Table.Column
//                 title="Select Material"
//                 render={(_, record) => `${record.selectMaterial}` || "N/A"}
//                 key="selectMaterial"
//               />
//               <Table.Column
//                 title="Category"
//                 render={(_, record) => record.category || "N/A"}
//                 key="createdAt"
//               />
//               <Table.Column
//                 title="Price"
//                 render={(_, record) => `$${record.price}` || "N/A"}
//                 key="createdAt"
//               />
//               <Table.Column
//                 title="Stock"
//                 render={(_, record) => `${record.stock}` || "N/A"}
//                 key="createdAt"
//               />

//               {/* <Table.Column
//                 title="Action"
//                 key="action"
//                 render={(_, record) => (
//                   <div style={{ display: "flex", gap: "8px" }}>
                 
//                     <Button
//                       type="link"
//                       onClick={() => showViewModal(record)}
//                       style={{ color: "#E6C379" }}
//                     >
//                       <EyeOutlined style={{ fontSize: 18 }} />
//                     </Button>

                
//                   </div>
//                 )}
//               /> */}
//             </Table>
//           </ConfigProvider>
//         </div>

//    <div className="col-span-3">
//    <Form  form={form}
//         layout="vertical"
//         onFinish={onFinish}
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//      <Form.Item
//           label={<span className="text-black">Select Material</span>}
//           name="selectMaterial"
//           rules={[{ required: true, message: "Please select a material!" }]}
//         >
//           <Select
//             // onChange={(value) => setCategorySelect(value)}
//             placeholder="Select Material"
//           >
//             {selectMaterialOptions.map((option) => (
//               <Option key={option.value} value={option.value}>
//                 <div className="flex items-center">
//                   <span
//                     className="w-4 h-4 inline-block mr-2"
//                     style={{ backgroundColor: option.color }}
//                   ></span>
//                   {option.label}
//                 </div>
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item
//           label={<span className="text-black">Product Price</span>}
//           name="price"
//           rules={[{ required: true, message: "Please enter product price!" }]}
//         >
//           <Input placeholder="Enter Price" type="number" />
//         </Form.Item>
//         <Form.Item
//           label={<span className="text-black">Product Stock</span>}
//           name="stock"
//           rules={[{ required: true, message: "Please enter product stock!" }]}
//         >
//           <Input placeholder="Enter stock" type="number" />
//         </Form.Item>
//         <Form.Item
//           label={<span className="text-black">Product Details</span>}
//           name="description"
//           rules={[{ required: true, message: "Please enter product details!" }]}
//         >
//           <TextArea
//             placeholder="Luxury gold necklace with embedded diamond."
//             rows={4}
//           />
//         </Form.Item>

//         <Form.Item
//           label={<span className="text-black">Product Sub Category</span>}
//           name="subCategory"
//           rules={[]}
//         >
//           <Select
//             placeholder="Select Sub Category"
//             disabled={categorySelect !== "fingerprint"}
//           >
//             {categorySelect === "fingerprint" ? (
//               <>
//                 <Option value="1">Fingerprint 1</Option>
//                 <Option value="2">Fingerprint 2</Option>
//                 <Option value="3">Fingerprint 3</Option>
//               </>
//             ) : (
//               <>
//                 <Option value="4">Handwriting 1</Option>
//                 <Option value="5">Handwriting 2</Option>
//                 <Option value="6">Handwriting 3</Option>
//               </>
//             )}
//           </Select>
//         </Form.Item>

//         <Form.Item label={<span className="text-black">Product Images</span>}>
//           <Upload
//             name="file"
//             listType="picture"
//             beforeUpload={() => false} // Disable auto upload
//             fileList={fileList}
//             onChange={handleUpload}
//             rules={[
//               { required: true, message: "Please enter product Images!" },
//             ]}
//           >
//             <Button
//               icon={<UploadOutlined />}
//               className="p-10"
//               style={{
//                 backgroundColor: "#E6C379",
//                 borderColor: "#E6C379",
//                 borderRadius: "none",
//               }}
//             >
//               Upload Images
//             </Button>
//           </Upload>
//         </Form.Item>
//         <Form.Item className="col-span-1 md:col-span-3 flex justify-end gap-4">
//           <Space>
//             <Button
//               type="primary"
//               htmlType="submit"
//               style={{
//                 backgroundColor: "#E6C379",
//                 borderColor: "#E6C379",
//                 borderRadius: 0,
//               }}
//               className="bg-blue-500 hover:bg-blue-600"
//             >
//               Add Product
//             </Button>
//           </Space>
//         </Form.Item>

//      </Form>
//    </div>

   

//         <Form.Item className="col-span-1 md:col-span-3 flex justify-center  gap-4">
//           <Space>
           
//             <Button
//               type="primary"
//               // htmlType="submit"
//               onClick={handleSubmitProducts}
//               style={{
//                 backgroundColor: "#E6C379",
//                 borderColor: "#E6C379",
//                 borderRadius: 0,
//                 padding: "20px 40px",
//                 // width: "100%"
//               }}
          
//             >
//               Submit Product
//             </Button>
//           </Space>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default AddProduct;



import React, { useState } from "react";
import { Form, Input, Button, Upload, Select, Space, Table, ConfigProvider,Popconfirm } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation, useGetAllProductsQuery } from "../../../Redux/api/productsApi";
import { DeleteOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

export const AddProduct = () => {
  const [form] = Form.useForm();
  const [categorySelect, setCategorySelect] = useState();
  const [fileList, setFileList] = useState([]);
  const [materialproductItems, setMaterialProductItems] = useState([]);
  const [color, setColor] = useState('');
  const navigate = useNavigate();
    const [productCreate] = useCreateProductMutation();
  const {
    data: allProducts,
    isLoading,
    refetch,
  } = useGetAllProductsQuery(null);

  const selectMaterialOptions = [
    { value: "solid_gold", label: "Solid Gold", color: "#FFD700" },
    { value: "gold_vermeil", label: "Gold Vermeil", color: "#FFD700" },
    { value: "gold_plated", label: "Gold Plated", color: "#DAA520" },
    { value: "rose_gold_vermeil", label: "Rose Gold Vermeil", color: "#B76E79" },
    { value: "rose_gold_plated", label: "Rose Gold Plated", color: "#B76E79" },
    { value: "sterling_silver", label: "Sterling Silver", color: "#C0C0C0" },
  ];

  const handleSelectChange = (value) => {
    const selectedOption = selectMaterialOptions.find(option => option.value === value);
    setColor(selectedOption ? selectedOption.color : "");
  };

  // Handle file upload
  const handleUpload = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Add the product to the list
  const onFinish = (values) => {
    console.log('values==',values);
    console.log('fileList==',fileList);
    if(fileList?.length === 0){
      return Swal.fire("Images upload is required!!");
    }

    const existingProduct = materialproductItems.find(item => 
      item.name === values.name && item.selectMaterial === values.selectMaterial
  );

  if (existingProduct) {
      return Swal.fire("This product with the same name and material already exists!");
  }


    const newProduct = {
      ...values,
      color:color,
      images: fileList.map((file) => file.originFileObj ), 
    };

    setMaterialProductItems([...materialproductItems, newProduct]);
    // form.resetFields(); 
    form.resetFields(['name', 'selectMaterial', 'price', 'stock', 'description']);
    setFileList([]);
    setColor('')
  };

  console.log('material color', color);

  console.log('materialproductItems==', materialproductItems);


  const deleteProduct = (selectMaterial
  ) => {

    console.log('selectMaterial',selectMaterial)
    // Filter out the product that matches the serialId
    const updatedProducts = materialproductItems.filter(item => item.selectMaterial
      !== selectMaterial
    );
    setMaterialProductItems(updatedProducts);
  };



  // Submit all products
  const handleSubmitProducts = async () => {
    if (materialproductItems.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Products Added",
        text: "Please add at least one product before submitting.",
      });
      return;
    }
console.log("Submitting all products:", materialproductItems);

    const updatedDataFormate = {
      category: materialproductItems[0].category, 
      selectMaterialItems: materialproductItems.map((item) => ({
        materialName: item.selectMaterial, 
        color:item.color,
        name: item.name,
        price: item.price,
        stock: item.stock,
        description: item.description,
        subCategory: item.subCategory,
        images: item.images,
      })),
    };
    console.log('updatedDataFormate==',updatedDataFormate);


    const formData = new FormData();

    // Append regular fields to FormData
    formData.append("category", updatedDataFormate.category);

  updatedDataFormate.selectMaterialItems.forEach((item, index) => {
    // Append fields for each selectMaterialItem
    formData.append(`selectMaterialItems[${index}].materialName`, item.materialName);
    formData.append(`selectMaterialItems[${index}].color`, item.color);
    formData.append(`selectMaterialItems[${index}].name`, item.name);
    formData.append(`selectMaterialItems[${index}].price`, item.price);
    formData.append(`selectMaterialItems[${index}].stock`, item.stock);
    formData.append(`selectMaterialItems[${index}].description`, item.description);
    formData.append(`selectMaterialItems[${index}].subCategory`, item.subCategory);

    // Append images for each item
    (item.images || []).forEach((image, imgIndex) => {
      formData.append(`selectMaterialItems[${index}].images[${imgIndex}]`, image);  
    });
  });

    // formData.append("selectMaterialItems",  updatedDataFormate.selectMaterialItems.forEach((item, index) => {
    //   formData.append(`materialName`, item.materialName);
    //   formData.append(`color`, item.color);
    //   formData.append(`name`, item.name);
    //   formData.append(`price`, item.price);
    //   formData.append(`stock`, item.stock);
    //   formData.append(`description`, item.description);
    //   formData.append(`subCategory`, item.subCategory);
    //   // item.images.forEach((image, imgIndex) => {
    //   //   formData.append(`selectMaterialItems[${index}].images`, image);
    //   // });
    //   (item.images || []).forEach((image, imgIndex) => {
    //     formData.append(`images[${imgIndex}]`, image);  // Ensure correct file key format
    //   });

    // }))
    
    // updatedDataFormate.selectMaterialItems.forEach((item, index) => {
    //   formData.append(`materialName`, item.materialName);
    //   formData.append(`color`, item.color);
    //   formData.append(`name`, item.name);
    //   formData.append(`price`, item.price);
    //   formData.append(`stock`, item.stock);
    //   formData.append(`description`, item.description);
    //   formData.append(`subCategory`, item.subCategory);
    //   // item.images.forEach((image, imgIndex) => {
    //   //   formData.append(`selectMaterialItems[${index}].images`, image);
    //   // });
    //   (item.images || []).forEach((image, imgIndex) => {
    //     formData.append(`images[${imgIndex}]`, image);  // Ensure correct file key format
    //   });

    // });
  


        try {
          console.log('hite hoise try')
      const res = await productCreate(formData).unwrap();
      console.log("Product Create Response:", res);

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Product Created Successfully!",
          text: "Your product has been added.",
        });
        refetch();
        setMaterialProductItems([]);
        navigate("/products");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Create Product",
        text: error.message || "Something went wrong!",
      });
    }

  };

  return (
    <div className="min-h-[90vh] p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add Product</h2>

      {/* Product Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish} // Handles form submission without page reload
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Product Category */}
        <Form.Item
          className="col-span-1"
          label={<span className="text-black">Product Category</span>}
          name="category"
          rules={[{ required: true, message: "Please select a category!" }]}
          // disabled={materialproductItems.length > 0 }
        >
          <Select
            onChange={(value) => setCategorySelect(value)}
            placeholder="Select Category"
            disabled={materialproductItems.length > 0}
          >
            <Option value="fingerprint">Fingerprint</Option>
            <Option value="handwriting">Handwriting</Option>
          </Select>
        </Form.Item>

        <Form.Item label={<span className="text-black">Product Sub Category</span>} name="subCategory" rules={categorySelect === "fingerprint" ? [{ required: true, message: "Please select a sub category!" }] : []}  >
            <Select placeholder="Select Sub Category"  disabled={categorySelect !== "fingerprint"}>
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

        {/* Product Table */}
        <div className="col-span-3">
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
                },
              },
            }}
          >
            <Table
              dataSource={materialproductItems}
              pagination={false}
              rowKey={(record) => record.serialId}
              scroll={{ x: true }}
            >
              <Table.Column title="S.ID" dataIndex="serialId" key="serialId" render={(_, __, index) => index + 1} />
              <Table.Column title="Product Name" render={(_, record) => record.name || "N/A"} key="name" />
              <Table.Column title="Material" render={(_, record) => `${record.selectMaterial}` || "N/A"} key="selectMaterial" />
              <Table.Column title="Category" render={(_, record) => record.category || "N/A"} key="category" />
              <Table.Column title="Price" render={(_, record) => `$${record.price}` || "N/A"} key="price" />
              <Table.Column title="Stock" render={(_, record) => `${record.stock}` || "N/A"} key="stock" />
              <Table.Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Popconfirm
                title="Are you sure you want to delete this product?"
                onConfirm={() => deleteProduct(record.selectMaterial
                )}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  icon={<DeleteOutlined />}
                  type="text"
                  danger
                  style={{ float: 'right' }}
                />
              </Popconfirm>
            )}
          />
            </Table>
          </ConfigProvider>
        </div>

        {/* Add Product Form */}
        <div className="col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Form.Item
            label={<span className="text-black">Select Material</span>}
            name="selectMaterial"
            rules={[{ required: true, message: "Please select a material!" }]}
          >
            <Select placeholder="Select Material" onChange={handleSelectChange} >
              {selectMaterialOptions.map((option) => (
                <Option key={option.value} value={option.value} >
                  <div className="flex items-center">
                    <span className="w-4 h-4 inline-block mr-2" style={{ backgroundColor: option.color }}></span>
                    {option.label}
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label={<span className="text-black">Product Name</span>} name="name" rules={[{ required: true, message: "Please enter product name!" }]} >
            <Input placeholder="Enter Price" type="text" />
          </Form.Item>

          <Form.Item label={<span className="text-black">Product Price</span>} name="price" rules={[{ required: true, message: "Please enter product price!" }]} >
            <Input placeholder="Enter Price" type="number" />
          </Form.Item>

          <Form.Item label={<span className="text-black">Product Stock</span>} name="stock" rules={[{ required: true, message: "Please enter product stock!" }]} >
            <Input placeholder="Enter Stock" type="number" />
          </Form.Item>

          
          </div>
          <Form.Item label={<span className="text-black">Product Details</span>} name="description" rules={[{ required: true, message: "Please enter product details!" }]} >
            <TextArea placeholder="Luxury gold necklace with embedded diamond." rows={4} />
          </Form.Item>

          

          <Form.Item label={<span className="text-black">Product Images</span>} name="images"  rules={[{ required: true, message: "Please upload product images!" }]}>
            <Upload
              name="file"
              listType="picture"
              beforeUpload={() => false}
              fileList={fileList}
              onChange={handleUpload}
              multiple
             
            >
              <Button
                icon={<UploadOutlined />}
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
          

          <Form.Item className="col-span-1 md:col-span-3 flex justify-end gap-4">
            <Space>
              <Button type="primary" htmlType="submit" style={{ backgroundColor: "#E6C379", borderColor: "#E6C379", borderRadius: 0, padding: "20px 40px" }}>
                Add Product
              </Button>
            </Space>
          </Form.Item>
        </div>
      </Form>

      {/* Submit All Products */}
      <Form.Item className="col-span-1 md:col-span-3 flex justify-center gap-4">
        <Space>
          <Button
            type="primary"
            onClick={handleSubmitProducts}
            style={{ backgroundColor: "#E6C379", borderColor: "#E6C379", borderRadius: 0, padding: "20px 40px" }}
          >
            Submit All Products
          </Button>
        </Space>
      </Form.Item>
    </div>
  );
};

export default AddProduct;
