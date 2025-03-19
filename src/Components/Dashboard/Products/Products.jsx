import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Modal } from "antd";
import { NavLink } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../../Redux/api/productsApi";

// const url = "http://10.0.70.35:8025/";
const url = "http://209.38.133.53:8025/";
// http://10.0.70.35:8025/uploads//products//2-1741068078797-610931184.jpg

function Products() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const {
    data: allProducts,
    isLoading,
    refetch,
  } = useGetAllProductsQuery(null);
  const [deleteProduct] = useDeleteProductMutation();

  console.log("===products====", allProducts);

  const [selectedImage, setSelectedImage] = useState({});
  const [selectedColors, setSelectedColors] = useState({});

  // Function to handle color click and show the corresponding image
  const handleColorClick = (productId,image, color) => {
    // setSelectedImage({ image, color }); // Set both image and color
    setSelectedImage((prevState) => ({
      ...prevState,
      [productId]: { image, color },
    }));
    setSelectedColors((prevState) => ({
      ...prevState,
      [productId]: color,
    }));
  };

  console.log('selectedImage===',selectedImage);
  useEffect(() => {
    const defaultImages = {};
    const defaultColors = {};
    allProducts?.data?.result?.forEach((product) => {
      // Set the first image and color as the default image and color for each product
      defaultImages[product._id] = {
        image: product?.images?.[0]?.image,
        color: product?.images?.[0]?.color,
      };
      defaultColors[product._id] = product?.images?.[0]?.color; // Set default color
    });
    setSelectedImage(defaultImages); // Set default images for each product
    setSelectedColors(defaultColors); // Set default colors for each product
  }, [allProducts]);

  const handleCancel = () => {
    // setIsViewModalVisible(false);
    // setIsDeleteModalVisible(false);
    setModalVisible(false);
  };

  const showViewModal = (record) => {
    console.log("recode =====", record);

    console.log("Block");
    setCurrentRecord(record);
    setModalVisible(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

 

  const deleteHandler = async (id) => {
    console.log("Block id ", id);
    if (id) {
      const result = await Swal.fire({
        title: "Do you want to Delete it?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        buttonsStyling: false,
        customClass: {
          confirmButton: "swal2-confirm",
          cancelButton: "swal2-cancel",
        },
        didOpen: () => {
          // Style the Confirm button
          const confirmBtn = document.querySelector(".swal2-confirm");
          if (confirmBtn) {
            confirmBtn.style.backgroundColor = "#E6C379";
            confirmBtn.style.color = "#fff";
            confirmBtn.style.border = "none";
            confirmBtn.style.padding = "8px 20px";
            confirmBtn.style.borderRadius = "5px";
            confirmBtn.style.marginRight = "5px";
          }

          // Style the Cancel button
          const cancelBtn = document.querySelector(".swal2-cancel");
          if (cancelBtn) {
            cancelBtn.style.backgroundColor = "#d33";
            cancelBtn.style.color = "#fff";
            cancelBtn.style.border = "none";
            cancelBtn.style.padding = "8px 20px";
            cancelBtn.style.borderRadius = "5px";
          }
        },
      });

      if (result.isConfirmed) {
        try {
          const res = await deleteProduct(id).unwrap();
          console.log("Subscribe user deleted res", res);

          if (res.success) {
            await Swal.fire("Deleted!", "", "success");
            refetch();
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      } else if (result.isDismissed) {
        Swal.fire("Action Cancelled", "", "info");
      }
    }
  };
  return (
    <div className="min-h-[90vh]">
      <h1 className="text-3xl font-bold mb-4">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {allProducts?.data?.result?.length > 0 ? allProducts?.data?.result?.map((product, index) => (
          <div className="bg-white p-4 rounded-none shadow-md" key={index}>
            {selectedImage[product._id] && selectedImage[product._id].image && (
              <div className="mt-4">
                <img
                  // src={`${url}${selectedImage.image}`} // Show image associated with selected color
                  src={`${url}${selectedImage[product._id].image}`}
                  alt="Selected Color"
                  className="w-full h-56 object-cover mt-2 border rounded mb-3"
                />
              </div>
            )}
            <p className="text-gray-600 flex ">
              {product?.images?.map((c, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 rounded-full border border-gray-300 mr-2 cursor-pointer ${
                    selectedColors[product._id] === c.color
                      ? 'border-2  border-blue-500'
                      : ''
                  }`} 
                  style={{ backgroundColor: c.color }}
                  onClick={() => handleColorClick(product._id,c.image, c.color)} 
                ></div>
              ))}
            </p>
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">Price: ${product.price}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => showViewModal(product)}
                className="bg-[#EAEAEA]  text-black px-4 py-2 rounded-none transition duration-300"
              >
                See Details
              </button>
              <NavLink to={`/products/${product._id}`}>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-none transition duration-300">
                  Edit
                </button>
              </NavLink>

              <button
                onClick={() => deleteHandler(product._id)}
                className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-none transition duration-300"
              >
                Delete
              </button>
            
            </div>
            <NavLink to={`/product-other-info/${product._id}`}>
            {
              product?.faqAdd?.length !== 0 || Object.keys(product?.sizeMaterialAdd).length > 0  ? <><button className="bg-[#bda46f] hover:bg-yellow-600 text-white px-4 py-2 rounded-none transition duration-300 w-full mt-4">
              edit-info
            </button></> : <> <button className="bg-[#bda46f] hover:bg-yellow-600 text-white px-4 py-2 rounded-none transition duration-300 w-full mt-4">
                  add-info
                </button></>
            }
               
                
              </NavLink>
          </div>
        )) : (
          <h1 className="text-3xl text-center mt-64 font-bold text-[#E6C379]">
            No Products Found
          </h1>
        )}
      </div>
      <Modal
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        // style={{ textAlign: "center" }}
        width={800}
      >
        {currentRecord && (
          <div className="p-4">
            <div className="">
              <h2 className="text-xl font-bold text-[#E6C379] mb-2">
                Product Image:
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {currentRecord?.images?.map((image, index) => (
                  <img
                    key={index}
                    src={`${url}${image.image}`}
                    alt="Product"
                    className="w-full h-52"
                  />
                ))}
              </div>

              {/* Right Side: Details */}
              <div className="w-3/4 text-left">
                <h4 className="text-xl font-bold text-[#E6C379] my-5">
                  Product Details
                </h4>
                <div className="flex justify-between items-center w-full ">
                  <p className="text-gray-700 mb-1 text-base">
                    <span className="font-semibold text-gray-800">
                      Product Name:
                    </span>{" "}
                    {currentRecord?.name}
                  </p>
                  <p className="text-gray-800 mb-1 text-base">
                    <span className="font-semibold text-[#E6C379]">
                      Product Offer:
                    </span>{" "}
                    {currentRecord?.isOffer?.offer
                      ? currentRecord?.isOffer?.offer
                      : "N/A"}
                  </p>
                </div>
                <p className="text-gray-800 mb-1 text-base">
                  <span className="font-semibold">Product Category:</span>{" "}
                  {currentRecord?.category}
                </p>
                <p className="text-gray-800 mb-1 text-base">
                  <span className="font-semibold">Product Sub Category:</span>{" "}
                  {currentRecord?.category
                    ? Number(currentRecord?.subCategory) === 1
                      ? "fingerprint 1"
                      : Number(currentRecord?.subCategory) === 2
                      ? "fingerprint 2"
                      : Number(currentRecord?.subCategory) === 3
                      ? "fingerprint 3"
                      : "N/A"
                    : "N/A"}
                </p>

                <p className="text-gray-800 mb-1 text-base">
                  <span className="font-semibold">Product Price:</span>{" "}
                  {currentRecord?.price}
                </p>
                <p className="text-gray-800 mb-1 text-base">
                  <span className="font-semibold">
                    Product Available Stock:
                  </span>{" "}
                  {currentRecord?.availableStock}
                </p>
                <p className="text-gray-800 flex ">
                  <span className="font-semibold mr-2">
                    Product Color Code:
                  </span>{" "}
                  {currentRecord?.images?.map((c, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border border-gray-300 mr-2"
                      style={{ backgroundColor: c.color }}
                    ></div>
                  ))}
                </p>
                <p className="text-gray-800 mb-1 text-base">
                  <span className="font-semibold">Product Details:</span>{" "}
                  {currentRecord?.description}
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
