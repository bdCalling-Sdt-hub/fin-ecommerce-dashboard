import axios from "axios";
import React, { useEffect, useState } from "react";
import juwelary from "../../../../public/images/juwellary.jpg"
import Swal from "sweetalert2";
import { Modal } from "antd";
import {  NavLink} from "react-router-dom";

function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("data/products.json");
        const recentData = response.data;

        setData(recentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log({data})

  const handleCancel = () => {
    // setIsViewModalVisible(false);
    // setIsDeleteModalVisible(false);
    setModalVisible(false);
  };

  const showViewModal = (record) => {
    console.log('recode ', record);
    
    console.log("Block");
    setCurrentRecord(record);
    setModalVisible(true);
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }


  const deleteHandler = async (id) => {
    if(id){
      Swal.fire({
        title: "Product Deleted Successfully!",
        text: "The product has been deleted!.",
        icon: "success",
      });
    }
  };
  return (
    <div className="min-h-[90vh]">
      <h1 className="text-3xl font-bold mb-4">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {
       data?.map((product, index) => (
        <div className="bg-white p-4 rounded-lg shadow-md" key={index}>
          <img
            //  src={product.image || juwelary}
            // src={product.image ? juwelary : product.image}
            src={product.image ? product.image : juwelary}
            alt={product.name}
            className="w-full h-60 object-cover mb-4"
          />
          <p className="text-gray-600 flex ">{product.colorCode.map((c, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full border border-gray-300 mr-2"
                  style={{ backgroundColor: c }}
                ></div>
              ))}</p>
          <h2 className="text-lg font-semibold">{product.productName}</h2>
          <p className="text-gray-600">Price: ${product.price}</p>
          <div className="flex gap-3 mt-4">
  <button onClick={() => showViewModal(product)} className="bg-[#EAEAEA]  text-black px-4 py-2 rounded transition duration-300">
    See Details
  </button>
  <NavLink to={`/products/${product.serialId}`}><button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition duration-300">
    Edit
  </button></NavLink>
  
  <button onClick={() => deleteHandler(product.serialId)} className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300">
    Delete
  </button>
</div>

        </div>
       ))
      }
      </div>
      <Modal
  open={modalVisible}
  onCancel={handleCancel}
  footer={null}
  centered
  style={{ textAlign: "center" }}
  width={800}
>
  {currentRecord && (
    <div className="p-4">
      {/* Flex container for image and details */}
      <div className="flex gap-8 items-start">
        {/* Left Side: Image */}
        <div className="w-2/3">
          <img
            // src={currentRecord?.coverImage || "https://via.placeholder.com/150"}
            src={currentRecord.image ? currentRecord.image : juwelary}
            alt="Product"
            className="w-full h-auto"
          />
        </div>

        {/* Right Side: Details */}
        <div className="w-3/4 text-left">
          <h4 className="text-xl font-bold text-[#E6C379] mb-2">Product Details</h4>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Product Name:</span> {currentRecord?.productName}
          </p>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Product Price:</span> {currentRecord.price}
          </p>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Product Size Material:</span> {currentRecord.productSizeMaterial}
          </p>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Product Instraction:</span>{" "}
            {currentRecord.productInstraction }
          </p>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Shipping Return:</span>{" "}
            {currentRecord.shippingReturn }
          </p>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Product Material:</span>{" "}
            {currentRecord.productMaterial}
          </p>
          <p className="text-gray-700 mb-1 text-base">
            <span className="font-semibold">Color:</span>{" "}
            {currentRecord.colorCode.map((color) => `${color}, `)}
          </p>
        </div>
      </div>

      {/* Cancel Button */}
      <button
        onClick={handleCancel}
        className="bg-[#E6C379] text-white font-bold py-2 text-lg px-5  mt-6 w-full hover:bg-[#E6C379] transition duration-300"
      >
        Cancel
      </button>
    </div>
  )}
</Modal>
    </div>
  );
}

export default Products;
