import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Modal } from "antd";
import { NavLink } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../../Redux/api/productsApi";

const url = "http://10.0.70.35:8025/";
// const url = "http://209.38.133.53:8025/";
// http://10.0.70.35:8025/uploads//products//2-1741068078797-610931184.jpg

function Products() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedImage, setSelectedImage] = useState({});

  // Handle the color click to update the selected image for the product

  const {
    data: allProducts,
    isLoading,
    refetch,
  } = useGetAllProductsQuery(null);
  const [deleteProduct] = useDeleteProductMutation();

  console.log("===products====", allProducts);

  // Function to handle color click and show the corresponding image
  // const handleColorClick = (productId, image, color) => {
  //   setSelectedColors((prev) => ({
  //     ...prev,
  //     [productId]: color, // Update selected color
  //   }));

  //   setSelectedImage((prev) => ({
  //     ...prev,
  //     [productId]: { image: image }, // Update selected image for the specific product
  //   }));
  // };

  const [selectedMaterials, setSelectedMaterials] = useState({});

  // Handle the material click to update the selected material for the product
  const handleMaterialClick = (productId, material) => {
    setSelectedMaterials((prev) => ({
      ...prev,
      [productId]: material, // Update selected material
    }));
  };

  console.log("selectedImage===", selectedImage);
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

  const [selectedMaterial, setSelectedMaterial] = useState(null);

  useEffect(() => {
    if (currentRecord && currentRecord.selectMaterialItems.length > 0) {
      // Set the first material as default when currentRecord changes
      setSelectedMaterial(currentRecord.selectMaterialItems[0]);
    }
  }, [currentRecord]);

  // Handle material change (e.g., when user clicks on different material)
  const handleMaterialChange = (material) => {
    setSelectedMaterial(material);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("currentRecord==", currentRecord);

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

      {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {allProducts?.data?.result?.length > 0 ? (
          allProducts?.data?.result?.map((product, index) => {
            // Get the selected material or default to the first material
            const selectedMaterial =
              selectedMaterials[product._id] || product.selectMaterialItems[0];

            return (
              <div className="bg-white p-4 rounded-none shadow-md" key={index}>
                {/* Show the selected material's image */}
                {selectedMaterial?.images?.[0] && (
                  <div className="mt-4">
                    <img
                      src={`${url}${selectedMaterial.images[0]}`}
                      alt="Selected Material"
                      className="w-full h-56 object-cover mt-2 border rounded mb-3"
                    />
                  </div>
                )}

                {/* Color selection buttons for each material */}
                <div className="flex mt-2">
                  {product?.selectMaterialItems?.map((material, idx) => (
                    <div
                      key={idx}
                      className={`w-6 h-6 rounded-full border border-gray-300 mr-2 cursor-pointer ${
                        selectedMaterial?.color === material.color
                          ? "border-2 border-blue-500"
                          : ""
                      }`}
                      style={{ backgroundColor: material.color }}
                      onClick={() => handleMaterialClick(product._id, material)} // Set selected material
                    ></div>
                  ))}
                </div>

                {/* Display the product name and price */}
                <h2 className="text-lg font-semibold">
                  {selectedMaterial.name}
                </h2>
                <p className="text-gray-600">
                  Price: ${selectedMaterial.price}
                </p>

                {/* Action buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => showViewModal(product)}
                    className="bg-[#EAEAEA] text-black px-4 py-2 rounded-none transition duration-300"
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

                {/* Add/Edit Info Button */}
                <NavLink to={`/product-other-info/${product._id}`}>
                  {/* {product?.faqAdd?.length !== 0 ||
                  Object.keys(product?.sizeMaterialAdd).length > 0 ? (
                    <button className="bg-[#bda46f] hover:bg-yellow-600 text-white px-4 py-2 rounded-none transition duration-300 w-full mt-4">
                      Edit Info
                    </button>
                  ) : (
                    <button className="bg-[#bda46f] hover:bg-yellow-600 text-white px-4 py-2 rounded-none transition duration-300 w-full mt-4">
                      Add Info
                    </button>
                  )} */}
                  <button className="bg-[#bda46f] hover:bg-yellow-600 text-white px-4 py-2 rounded-none transition duration-300 w-full mt-4">
                      Add Info
                    </button>
                </NavLink>
              </div>
            );
          })
        ) : (
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
        width={900}
      >
        {currentRecord && selectedMaterial && (
          <div className="p-4">
            {/* Product Image Section */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#E6C379] mb-2">
                Product Image:
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {selectedMaterial?.images?.map((image, index) => (
                  <img
                    key={index}
                    src={`${url}${image}`}
                    alt="Product"
                    className="w-full h-52 object-cover rounded-lg shadow-lg"
                  />
                ))}
              </div>
            </div>

            {/* Material Selection Buttons */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[#E6C379] mb-3">
                Select Material:
              </h3>
              <div className="flex space-x-4">
                {currentRecord?.selectMaterialItems?.map((material, index) => (
                  <button
                    key={index}
                    className={`py-2 px-4 rounded-lg border-2 ${
                      selectedMaterial._id === material._id
                        ? "border-[#E6C379] bg-[#E6C379] text-white"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleMaterialChange(material)}
                  >
                    {material.materialName}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="w-full text-left mb-6">
              <h4 className="text-xl font-bold text-[#E6C379] my-5">
                Product Details
              </h4>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-700 mb-1 text-base">
                  <span className="font-semibold text-gray-800">
                    Product Name:
                  </span>{" "}
                  {selectedMaterial?.name || "N/A"}
                </p>
                <p className="text-gray-800 mb-1 text-base">
                  <span className="font-semibold text-[#E6C379]">
                    Product Offer:
                  </span>{" "}
                  {selectedMaterial?.offer || "N/A"}
                </p>
              </div>

              <p className="text-gray-800 mb-1 text-base">
                <span className="font-semibold">Product Category:</span>{" "}
                {currentRecord?.category || "N/A"}
              </p>
              <p className="text-gray-800 mb-1 text-base">
                <span className="font-semibold">Product Sub Category:</span>
                {selectedMaterial?.subCategory === "1"
                  ? "fingerprint 1"
                  : selectedMaterial?.subCategory === "2"
                  ? "fingerprint 2"
                  : selectedMaterial?.subCategory === "3"
                  ? "fingerprint 3"
                  : "N/A"}
              </p>
              <p className="text-gray-800 mb-1 text-base">
                <span className="font-semibold">Product Price:</span> $
                {selectedMaterial?.price || "N/A"}
              </p>
              <p className="text-gray-800 mb-1 text-base">
                <span className="font-semibold">Available Stock:</span>{" "}
                {selectedMaterial?.availableStock || "N/A"}
              </p>
              <p className="text-gray-800 mb-1 text-base">
                <span className="font-semibold">Product Color Code:</span>
                <div className="flex">
                  <div
                    className="w-6 h-6 rounded-full border border-gray-300 mr-2"
                    style={{
                      backgroundColor: selectedMaterial?.color || "#000000",
                    }}
                  ></div>
                </div>
              </p>
              <p className="text-gray-800 mb-1 text-base">
                <span className="font-semibold">Product Description:</span>{" "}
                {selectedMaterial?.description || "N/A"}
              </p>
              <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">FAQs</h2>
              {selectedMaterial?.faqAdd?.length > 0 ? (
                selectedMaterial?.faqAdd?.map((faq, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-4 p-4 border rounded-lg shadow-sm"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No FAQs available.</p>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">
                Size and Material Details
              </h2>
              {Object.keys(selectedMaterial?.sizeMaterialAdd || {}).length >
              0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p>
                      <span className="font-semibold">ID:</span>{" "}
                      {selectedMaterial?.sizeMaterialAdd?.id || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Chain:</span>{" "}
                      {selectedMaterial?.sizeMaterialAdd?.chain || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Chain Length:</span>{" "}
                      {selectedMaterial?.sizeMaterialAdd?.chainLength || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Main Material:</span>{" "}
                      {selectedMaterial?.sizeMaterialAdd?.mainMaterial || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">Pendant Height:</span>{" "}
                      {selectedMaterial?.sizeMaterialAdd?.pendantHeight ||
                        "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Pendant Thickness:</span>{" "}
                      {selectedMaterial?.sizeMaterialAdd?.pendantThickness ||
                        "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Style Collection:</span>{" "}
                      {selectedMaterial?.sizeMaterialAdd?.styleCollection ||
                        "N/A"}
                    </p>
                  </div>
                </div>
              ) : (
                <p>No size and material information available.</p>
              )}
            </div>

            </div>

            {/* FAQ Section */}

            {/* <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">FAQs</h2>
              {currentRecord?.faqAdd?.length > 0 ? (
                currentRecord?.faqAdd?.map((faq, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-4 p-4 border rounded-lg shadow-sm"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No FAQs available.</p>
              )}
            </div> */}

            {/* Size and Material Information Section */}

            {/* <div>
              <h2 className="text-lg font-semibold mb-2">
                Size and Material Details
              </h2>
              {Object.keys(selectedMaterial?.sizeMaterialAdd || {}).length >
              0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p>
                      <span className="font-semibold">ID:</span>{" "}
                      {selectedMaterial?.sizeMaterialAdd?.id || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Chain:</span>{" "}
                      {selectedMaterial?.sizeMaterialAdd?.chain || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Chain Length:</span>{" "}
                      {selectedMaterial?.sizeMaterialAdd?.chainLength || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Main Material:</span>{" "}
                      {selectedMaterial?.sizeMaterialAdd?.mainMaterial || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-semibold">Pendant Height:</span>{" "}
                      {selectedMaterial?.sizeMaterialAdd?.pendantHeight ||
                        "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Pendant Thickness:</span>{" "}
                      {selectedMaterial?.sizeMaterialAdd?.pendantThickness ||
                        "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Style Collection:</span>{" "}
                      {selectedMaterial?.sizeMaterialAdd?.styleCollection ||
                        "N/A"}
                    </p>
                  </div>
                </div>
              ) : (
                <p>No size and material information available.</p>
              )}
            </div> */}

            {/* Cancel Button */}
            <div className="mt-6">
              <button
                onClick={handleCancel}
                className="bg-[#E6C379] text-white font-bold py-2 text-lg px-5 w-full rounded-lg hover:bg-[#D4B96E] transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Products;
