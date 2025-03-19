import React, { useState } from "react";

import {
  useGetSingleProductQuery,
  useUpdateProductFaqSizeMaterialMutation,
} from "../../Redux/api/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Form, Input } from "antd";

// const url = "http://10.0.70.35:8025/";
const url = "http://209.38.133.53:8025/";
// http://10.0.70.35:8025/uploads//products//2-1741068078797-610931184.jpg

function ProductOtherInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: singleProduct,
    isLoading,
    refetch,
  } = useGetSingleProductQuery(id);

  const [updateProductFaqAndSizeMaterial] =
    useUpdateProductFaqSizeMaterialMutation();

  const [faqState, setFaqState] = useState(singleProduct?.data?.faqAdd);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [formData, setFormData] = useState({
    id: singleProduct?.data?.sizeMaterialAdd?.id || '',
    chain: singleProduct?.data?.sizeMaterialAdd?.chain || '',
    styleCollection: singleProduct?.data?.sizeMaterialAdd?.styleCollection || '',
    pendantHeight: singleProduct?.data?.sizeMaterialAdd?.pendantHeight || '',
    mainMaterial: singleProduct?.data?.sizeMaterialAdd?.mainMaterial || '',
    chainLength: singleProduct?.data?.sizeMaterialAdd?.chainLength || '',
    pendantThickness: singleProduct?.data?.sizeMaterialAdd?.pendantThickness || '',
    
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || !answer) {
      Swal.fire("Correctly fill-Up form!!");
    }
    if (question && answer) {
      setFaqState([...faqState, { question, answer }]);
      setQuestion("");
      setAnswer("");
    }
  };

  const handleDelete = (index) => {
    const updatedFaqState = faqState.filter((_, i) => i !== index);
    setFaqState(updatedFaqState);
  };

  console.log("faqState==", faqState);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    if (!faqState || faqState.length === 0) {
      return Swal.fire("Faq added required!!");
    }

    // console.log(formData);
    const updateddata = {
      faqAdd: faqState,
      sizeMaterialAdd: formData,
    };

    console.log("updateddata", updateddata);

    try {
      const res = await updateProductFaqAndSizeMaterial({
        id: id,
        data: updateddata,
      }).unwrap();
      console.log("res", res);
      if (res.success) {
        Swal.fire("Add info added successfull!!");
        refetch();
        navigate("/products");

      } else {
        Swal.fire("Something went wrong, please try again.");
      }
    } catch (error) {
      console.log("errror update product", error);
      Swal.fire("Error occurred while updating, please try again.");
    }
  };

  //   const deleteHandler = async (id) => {
  //     console.log("Block id ", id);
  //     if (id) {
  //       const result = await Swal.fire({
  //         title: "Do you want to Delete it?",
  //         showDenyButton: false,
  //         showCancelButton: true,
  //         confirmButtonText: "Delete",
  //         cancelButtonText: "Cancel",
  //         buttonsStyling: false,
  //         customClass: {
  //           confirmButton: "swal2-confirm",
  //           cancelButton: "swal2-cancel",
  //         },
  //         didOpen: () => {
  //           // Style the Confirm button
  //           const confirmBtn = document.querySelector(".swal2-confirm");
  //           if (confirmBtn) {
  //             confirmBtn.style.backgroundColor = "#E6C379";
  //             confirmBtn.style.color = "#fff";
  //             confirmBtn.style.border = "none";
  //             confirmBtn.style.padding = "8px 20px";
  //             confirmBtn.style.borderRadius = "5px";
  //             confirmBtn.style.marginRight = "5px";
  //           }

  //           // Style the Cancel button
  //           const cancelBtn = document.querySelector(".swal2-cancel");
  //           if (cancelBtn) {
  //             cancelBtn.style.backgroundColor = "#d33";
  //             cancelBtn.style.color = "#fff";
  //             cancelBtn.style.border = "none";
  //             cancelBtn.style.padding = "8px 20px";
  //             cancelBtn.style.borderRadius = "5px";
  //           }
  //         },
  //       });

  //       if (result.isConfirmed) {
  //         try {
  //           const res = await deleteProduct(id).unwrap();
  //           console.log("Subscribe user deleted res", res);

  //           if (res.success) {
  //             await Swal.fire("Deleted!", "", "success");
  //             refetch();
  //           }
  //         } catch (error) {
  //           console.error("Error deleting user:", error);
  //           Swal.fire("Error!", "Something went wrong.", "error");
  //         }
  //       } else if (result.isDismissed) {
  //         Swal.fire("Action Cancelled", "", "info");
  //       }
  //     }
  //   };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="min-h-[90vh]">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Add FAQ & Size Material
      </h1>
      <div className="flex justify-center items-center">
        <div className="flex justify-start border border-gray-300 p-2">
          <img
            src={`${url}${singleProduct?.data?.images[0]?.image}`}
            alt="Product"
            className="w-24 h-24 mr-2"
          />
          <div>
            <h2 className="text-lg font-semibold">
              Product Name: {singleProduct?.data?.name}
            </h2>
            <p className="text-gray-600">Price: {singleProduct?.data?.price}</p>
            <p className="text-gray-600">
              Category: {singleProduct?.data?.category}
            </p>
          </div>
        </div>
      </div>

      {/* <div>
    <h2 className="text-lg font-semibold" >FAQ Add Here</h2>
   <div className="grid grid-cols-2">
     
        
     <form action="">
         <label htmlFor="" className="text-base font-semibold inline-block mb-1">Question Here</label><br />
         <input type="text" name="question" className="border py-2 px-2 w-full" /><br />
         <label htmlFor="" className="text-base font-semibold inline-block mt-2 mb-1" >Answer Here</label><br />
         <input type="text" name="answer" className="border py-2 px-2 w-full" /><br />
         <button type="submit" className="bg-orange-300 p-2 text-base font-semibold px-5 mt-2" >Submit</button>
     </form>
     <div>
     {
     faqstate?.map((faq)=> <>
     <div className="flex justify-between">
        <div> <h2>{faq.question}</h2>
        <p>{faq.answer}</p></div>
        <div>Delete</div>
     </div>
     </>)
     }
     </div>
 </div>
   </div> */}

      <div>
        <h2 className="text-lg font-semibold">FAQ Add Here</h2>
        <div className="grid grid-cols-2 gap-8">
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="question"
              className="text-base font-semibold inline-block mb-1"
            >
              Question Here
            </label>
            <br />
            <input
              type="text"
              name="question"
              className="border py-2 px-2 w-full"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <br />
            <label
              htmlFor="answer"
              className="text-base font-semibold inline-block mt-2 mb-1"
            >
              Answer Here
            </label>
            <br />
            <input
              type="text"
              name="answer"
              className="border py-2 px-2 w-full"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <br />
            <button
              type="submit"
              className="bg-orange-300 p-2 text-base font-semibold px-5 mt-2"
            >
              Add
            </button>
          </form>
          <div>
          
            <div>
            <h2 className="text-lg font-semibold ">
                FAQ All Show here
              </h2>
              {faqState?.map((faq, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2 p-2 border rounded"
                >
                  <div>
                    <h2>
                      <span className="font-semibold">Question:</span>{" "}
                      {faq.question}
                    </h2>
                    <p>
                      <span className="font-semibold">Answer:</span>{" "}
                      {faq.answer}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-lg font-semibold">Size & Materials Here</h2>
        <form className="w-1/2" onSubmit={handleSubmit2}>
          <label className="block mb-1">ID</label>
          <input
            type="text"
            name="id"
            placeholder="id here.."
            value={formData.id}
            onChange={handleChange}
            className="border py-2 px-2 w-full mb-2"
            required
            // defaultValue={singleProduct?.data?.sizeMaterialAdd?.id}
          />

          <label className="block mb-1">Chain Type</label>
          <input
            type="text"
            name="chain"
            placeholder="chain here.."
            value={formData.chain}
            onChange={handleChange}
            className="border py-2 px-2 w-full mb-2"
            required
          />

          <label className="block mb-1">Style Collection</label>
          <input
            type="text"
            name="styleCollection"
            placeholder="style Collection here.."
            value={formData.styleCollection}
            onChange={handleChange}
            className="border py-2 px-2 w-full mb-2"
            required
          />

          <label className="block mb-1">Pendant Height</label>
          <input
            type="text"
            name="pendantHeight"
            placeholder="pendant Height here.."
            value={formData.pendantHeight}
            onChange={handleChange}
            className="border py-2 px-2 w-full mb-2"
            required
          />

          <label className="block mb-1">Main Material</label>
          <input
            type="text"
            name="mainMaterial"
            placeholder="main Material here.."
            value={formData.mainMaterial}
            onChange={handleChange}
            className="border py-2 px-2 w-full mb-2"
            required
          />

          <label className="block mb-1">Chain Length</label>
          <input
            type="text"
            name="chainLength"
            placeholder="chain Length here.."
            value={formData.chainLength}
            onChange={handleChange}
            className="border py-2 px-2 w-full mb-2"
            required
          />

          <label className="block mb-1">Pendant Thickness</label>
          <input
            type="text"
            name="pendantThickness"
            placeholder="pendant Thickness here.."
            value={formData.pendantThickness}
            onChange={handleChange}
            className="border py-2 px-2 w-full mb-2"
            required
          />

          <button
            type="submit"
            className="bg-orange-300 p-2 text-base font-semibold px-5 mt-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductOtherInfo;
