import React, { useState, useEffect } from "react";
import {
  useGetSingleProductQuery,
  useUpdateProductFaqSizeMaterialMutation,
} from "../../Redux/api/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getImageUrl } from "../../utils/baseUrl";

// const url = "http://10.0.70.35:8025/";
const url = getImageUrl();

function ProductOtherInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: singleProduct,
    isLoading,
    refetch,
  } = useGetSingleProductQuery(id);

  console.log("singleProduct", singleProduct);

  const [updateProductFaqAndSizeMaterial] =
    useUpdateProductFaqSizeMaterialMutation();

  // Track the selected material and FAQ/Size data for that material
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [faqState, setFaqState] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    chain: "",
    styleCollection: "",
    pendantHeight: "",
    mainMaterial: "",
    chainLength: "",
    pendantThickness: "",
  });

  useEffect(() => {
    if (
      singleProduct?.data?.selectMaterialItems &&
      singleProduct.data.selectMaterialItems.length > 0
    ) {
      // Set the first material as default
      setSelectedMaterial(singleProduct.data.selectMaterialItems[0]);
      // Set FAQ and Size data for the first material
      setFaqState(singleProduct.data.selectMaterialItems[0]?.faqAdd || []);
      setFormData({
        id:
          singleProduct.data.selectMaterialItems[0]?.sizeMaterialAdd?.id || "",
        chain:
          singleProduct.data.selectMaterialItems[0]?.sizeMaterialAdd?.chain ||
          "",
        styleCollection:
          singleProduct.data.selectMaterialItems[0]?.sizeMaterialAdd
            ?.styleCollection || "",
        pendantHeight:
          singleProduct.data.selectMaterialItems[0]?.sizeMaterialAdd
            ?.pendantHeight || "",
        mainMaterial:
          singleProduct.data.selectMaterialItems[0]?.sizeMaterialAdd
            ?.mainMaterial || "",
        chainLength:
          singleProduct.data.selectMaterialItems[0]?.sizeMaterialAdd
            ?.chainLength || "",
        pendantThickness:
          singleProduct.data.selectMaterialItems[0]?.sizeMaterialAdd
            ?.pendantThickness || "",
      });
    }
  }, [singleProduct]);

  // console.log('selectedMaterial === _id', selectedMaterial._id);

  // Handle FAQ submission
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const handleSubmitFaq = (e) => {
    e.preventDefault();
    if (!question || !answer) {
      Swal.fire("Correctly fill-Up FAQ form!!");
    }
    if (question && answer) {
      setFaqState([...faqState, { question, answer }]);
      setQuestion("");
      setAnswer("");
    }
  };

  // Handle FAQ deletion
  const handleDeleteFaq = (index) => {
    const updatedFaqState = faqState.filter((_, i) => i !== index);
    setFaqState(updatedFaqState);
  };

  // Handle form field change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle size and material form submission
  const handleSubmitSizeMaterial = async (e) => {
    e.preventDefault();

    if (!faqState || faqState.length === 0) {
      return Swal.fire("Faq added required!!");
    }

    const updateddata = {
      material_id: selectedMaterial._id,
      faqAdd: faqState,
      sizeMaterialAdd: formData,
    };

    console.log("updateddata----", updateddata);

    try {
      const res = await updateProductFaqAndSizeMaterial({
        id: id,
        data: updateddata,
      }).unwrap();
      if (res.success) {
        Swal.fire("Info updated successfully!!");
        refetch();
        navigate("/products");
      } else {
        Swal.fire("Something went wrong, please try again.");
      }
    } catch (error) {
      Swal.fire("Error occurred while updating, please try again.");
    }
  };

  // Handle material change (when user selects a different material)
  const handleMaterialChange = (material) => {
    setSelectedMaterial(material);
    setFaqState(material?.faqAdd || []);
    setFormData({
      id: material?.sizeMaterialAdd?.id || "",
      chain: material?.sizeMaterialAdd?.chain || "",
      styleCollection: material?.sizeMaterialAdd?.styleCollection || "",
      pendantHeight: material?.sizeMaterialAdd?.pendantHeight || "",
      mainMaterial: material?.sizeMaterialAdd?.mainMaterial || "",
      chainLength: material?.sizeMaterialAdd?.chainLength || "",
      pendantThickness: material?.sizeMaterialAdd?.pendantThickness || "",
    });
  };

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
            src={`${url}${selectedMaterial?.images[0]}`}
            alt="Product"
            className="w-24 h-24 mr-2"
          />
          <div>
            <h2 className="text-lg font-semibold">
              Product Name: {selectedMaterial?.name}
            </h2>
            <p className="text-gray-600">Price: {selectedMaterial?.price}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Select Material:</h2>
        <div className="flex space-x-4">
          {singleProduct?.data?.selectMaterialItems?.map((material) => (
            <button
              key={material?._id}
              className={`py-2 px-4 rounded-lg border-2 ${
                selectedMaterial?._id === material?._id
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

      {/* FAQ Section */}
      <div className="mt-5">
        <h2 className="text-lg font-semibold">FAQ Add Here</h2>
        <form onSubmit={handleSubmitFaq}>
          <label className="text-base font-semibold inline-block mb-1">
            Question
          </label>
          <input
            type="text"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border py-2 px-2 w-full mb-2"
          />
          <label className="text-base font-semibold inline-block mb-1">
            Answer
          </label>
          <input
            type="text"
            name="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border py-2 px-2 w-full mb-2"
          />
          <button
            type="submit"
            className="bg-orange-300 p-2 text-base font-semibold px-5 mt-2"
          >
            Add FAQ
          </button>
        </form>

        <h2 className="text-lg font-semibold mt-4">FAQ All Show Here</h2>
        {faqState?.map((faq, index) => (
          <div
            key={index}
            className="flex justify-between items-center mb-2 p-2 border rounded"
          >
            <div>
              <h2>
                <span className="font-semibold">Question:</span> {faq.question}
              </h2>
              <p>
                <span className="font-semibold">Answer:</span> {faq.answer}
              </p>
            </div>
            <button
              onClick={() => handleDeleteFaq(index)}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Size & Material Section */}
      <div className="mt-5">
        <h2 className="text-lg font-semibold">Size & Materials Here</h2>
        <form className="w-1/2" onSubmit={handleSubmitSizeMaterial}>
          <label className="block mb-1">ID</label>
          <input
            type="text"
            name="id"
            placeholder="id here.."
            value={formData.id}
            onChange={handleChange}
            className="border py-2 px-2 w-full mb-2"
            required // defaultValue={singleProduct?.data?.sizeMaterialAdd?.id}
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
