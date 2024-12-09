// import {
//   Button,
//   ConfigProvider,
//   Card,
//   Modal,
//   Form,
//   Input,
//   Checkbox,
//   Select,
//   Radio,
// } from "antd";
// import { useState } from "react";
// import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import {
//   useAllSubscriptionPlansQuery,
//   useCreateSubscriptionMutation,
//   useDeleteSubscriptionMutation,
//   useEditSubscriptionMutation,
// } from "../../Redux/api/subscriptionApi";

// export default function Subscription() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [selectedSubscription, setSelectedSubscription] = useState(null);
//   const [form] = Form.useForm();
//   const [formAddPlan] = Form.useForm();
//   const [selectedOffers, setSelectedOffers] = useState({});
//   const [offerSubscriptions, setOfferSubscription] = useState([]);
//   const [selectedValue, setSelectedValue] = useState(null);

//   const {
//     data: allSubscriptionPlans,
//     isLoading,
//     error,
//     refetch,
//   } = useAllSubscriptionPlansQuery();

//   console.log(allSubscriptionPlans?.data);

//   const [createSubscription] = useCreateSubscriptionMutation();
//   const [editSubscription] = useEditSubscriptionMutation();
//   const [deleteSubscription] = useDeleteSubscriptionMutation();

//   // useEffect(() => {
//   //   if (allSubscriptionPlans?.data) {
//   //     const initialSelections = {};
//   //     allSubscriptionPlans?.data.forEach((plan) => {
//   //       console.log(plan.offerSubscriptions);
//   //       if (plan.offerSubscriptions?.length > 0) {
//   //         initialSelections[plan?.planName] =
//   //           plan.offerSubscriptions[0].subPlanName; // Access the first offer correctly
//   //       }
//   //       console.log(initialSelections);
//   //     });
//   //     setSelectedOffers(initialSelections);
//   //   }
//   // }, [allSubscriptionPlans]);

//   console.log(selectedOffers);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error fetching subscription plans.</p>;

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const showEditModal = (subscription) => {
//     setSelectedSubscription(subscription);
//     setIsEditModalOpen(true);
//   };

//   const showDeleteModal = (subscription) => {
//     setSelectedSubscription(subscription);
//     setIsDeleteModalOpen(true);
//   };

//   const closeModals = () => {
//     setIsEditModalOpen(false);
//     setIsDeleteModalOpen(false);
//     setSelectedSubscription(null);
//   };

//   const handleEditSave = async (values) => {
//     if (!selectedSubscription) return;
//     console.log("Edited selectedSubscription:", selectedSubscription);
//     console.log("Edited Values:", values);
//     try {
//       await editSubscription({
//         id: selectedSubscription?._id,
//         data: values,
//       }).unwrap();

//       console.log("Updated Subscription:", selectedSubscription?.planName);
//       refetch();
//       closeModals();
//     } catch (error) {
//       console.error("Error editing subscription:", error);
//     }
//   };

//   const handleDeleteConfirm = async () => {
//     if (!selectedSubscription) return;

//     try {
//       // Call deleteSubscription with the selected subscription's ID
//       await deleteSubscription(selectedSubscription._id).unwrap();
//       console.log("Deleted Subscription:", selectedSubscription.planName);

//       // Refetch subscription data to update the list
//       refetch();

//       closeModals();
//     } catch (error) {
//       console.error("Error deleting subscription:", error);
//     }
//   };

//   const handleRadioChange = (planId, offerId) => {
//     console.log("planId", planId);
//     console.log("offerId", offerId);
//     // console.log("planName", planName);
//     // console.log("offerName", offerName);
//     setSelectedOffers((prevSelectedOffers) => ({
//       ...prevSelectedOffers,
//       [planId]: offerId,
//     }));
//   };

//   const handleChange = (e) => {
//     setSelectedValue(e.target.value);
//   };

//   // const handleAddPlan = () => {
//   //   formAddPlan
//   //     .validateFields()
//   //     .then((values) => {
//   //       // Add the new plan to the list
//   //       setOfferSubscription([
//   //         ...offerSubscriptions,
//   //         { price: values.planPrice, storyCount: values.storyCount },
//   //       ]);
//   //       formAddPlan.resetFields(); // Reset form fields after submission
//   //     })
//   //     .catch((errorInfo) => {
//   //       console.error("Validation Failed:", errorInfo);
//   //     });
//   // };

//   // Adjust handleAddPlan to use a callback with setOfferSubscription
//   const handleAddPlan = () => {
//     formAddPlan
//       .validateFields()
//       .then((values) => {
//         console.log(values);
//         setOfferSubscription((prevOffers) => [
//           ...prevOffers,
//           {
//             price: values?.planPrice,
//             storyQuantity: values?.storyQuantity,
//             subPlanName: values?.subPlanName,
//           },
//         ]);
//         console.log(offerSubscriptions);
//         formAddPlan.resetFields(); // Reset form fields after submission
//       })
//       .catch((errorInfo) => {
//         console.error("Validation Failed:", errorInfo);
//       });
//   };

//   const handleSave = () => {
//     form.validateFields().then((mainFormValues) => {
//       const facilities = {
//         storyCategory: mainFormValues.facilities,
//         pictureDistribution: mainFormValues.pictureDistribution,
//         timeline: mainFormValues.timeline,
//         wordCount: mainFormValues.words,
//       };

//       const allFormData = {
//         ...mainFormValues,
//         facilities,
//         offerSubscriptions, // Ensure this includes all added plans with price and quantity
//       };

//       createSubscription(allFormData)
//         .unwrap()
//         .then(() => {
//           refetch(); // Refetch subscription data to update the list with the new subscription
//           form.resetFields();
//           formAddPlan.resetFields();
//           setOfferSubscription([]); // Clear offers after successful submission
//           setIsModalOpen(false);
//         })
//         .catch((error) => {
//           console.error("Error creating subscription:", error);
//         });
//     });
//   };

//   // Handle selecting plan for purchase
//   // const handleBuyNow = (sub) => {
//   //   const selectedOfferId = selectedOffers[sub._id];
//   //   const selectedOffer = sub.offerSubscriptions.find(
//   //     (offer) => offer._id === selectedOfferId
//   //   );
//   //   console.log("Selected Plan:", sub.planName);
//   //   console.log("Selected Offer Price:", selectedOffer?.price);
//   //   console.log("Selected Duration:", selectedOffer?.subPlanName);
//   // };

//   return (
//     <div className="bg-white min-h-screen rounded-lg">
//       <div className="flex justify-between items-center bg-[#013564] py-3 px-4">
//         <h1 className="text-lg sm:text-3xl text-white font-semibold">
//           Subscription
//         </h1>
//       </div>
//       <div className="flex items-center justify-center my-8 sm:my-10">
//         <ConfigProvider
//           theme={{
//             components: {
//               Button: {
//                 defaultHoverBg: "rgb(112,189,249)",
//                 defaultHoverBorderColor: "rgb(178,212,253)",
//                 defaultHoverColor: "rgb(0,0,0)",
//               },
//             },
//           }}
//         >
//           <Button
//             onClick={showModal}
//             className="flex items-center gap-1 sm:gap-3 bg-[#97C6EA] w-full sm:w-2/3 h-12 font-semibold border-none"
//           >
//             <EditOutlined />
//             <p className="text-xs sm:text-lg">Create Subscription Plan</p>
//           </Button>
//         </ConfigProvider>
//       </div>

//       {/* Subscription Plan Creation Modal */}
//       <ConfigProvider
//         theme={{
//           components: {
//             Button: {
//               defaultHoverBg: "rgb(112,189,249)",
//               defaultHoverBorderColor: "rgb(178,212,253)",
//               defaultHoverColor: "rgb(0,0,0)",
//             },
//             Modal: {
//               contentBg: "rgb(177,215,250)",
//             },
//             Form: {
//               labelColor: "rgb(0,0,0)",
//               activeBg: "rgb(151,198,234)",
//             },
//             Checkbox: {
//               colorBgContainer: "rgb(151,198,234)",
//               colorBorder: "rgb(0,0,0)",
//             },
//             Select: {
//               colorBgContainer: "rgb(177,215,250)",
//               colorBgElevated: "rgb(126,187,244)",
//             },
//           },
//         }}
//       >
//         <Modal
//           open={isModalOpen}
//           onCancel={() => setIsModalOpen(false)}
//           footer={null}
//         >
//           <Form
//             form={form}
//             layout="vertical"
//             initialValues={{
//               facilities: ["Boost voucher to popular"],
//             }}
//             className="px-10 py-2"
//           >
//             <Form.Item
//               label="Plan Name"
//               name="planName"
//               rules={[
//                 { required: true, message: "Please input the plan name!" },
//               ]}
//               style={{ fontWeight: "500" }}
//             >
//               <Input
//                 placeholder="Enter plan name"
//                 className="font-medium h-10 bg-[#97C6EA] hover:bg-transparent placeholder:text-gray-500 border-none"
//               />
//             </Form.Item>

//             <Form.Item
//               label="Page Distribution"
//               name="pageDistribution"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please select the Page Distribution!",
//                 },
//               ]}
//               style={{ fontWeight: "500", marginTop: "-20px" }}
//             >
//               <Select
//                 showSearch
//                 placeholder="Select Page Distribution"
//                 optionFilterProp="label"
//                 className="border border-[#013564] h-10 rounded-lg"
//                 options={[
//                   {
//                     value: "Quarter Page",
//                     label: "Quarter Page",
//                   },
//                   {
//                     value: "Half Page",
//                     label: "Half Page",
//                   },
//                   {
//                     value: "Full Page",
//                     label: "Full Page",
//                   },
//                 ]}
//               />
//             </Form.Item>

//             {/* Separate Form for Adding Plan Price and Story Count */}
//             <Form
//               form={formAddPlan}
//               layout="inline"
//               className="space-x-1 -mt-3"
//             >
//               <Form.Item
//                 label="Plan Price"
//                 name="planPrice"
//                 style={{ fontWeight: "500" }}
//                 rules={[
//                   { required: true, message: "Please input the plan price!" },
//                 ]}
//                 className="flex flex-col"
//               >
//                 <Input
//                   placeholder="Enter plan price"
//                   type="number"
//                   className="h-10 w-36 bg-transparent border-black rounded-md text-center hover:bg-transparent hover:border-black placeholder:text-gray-500"
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Story Quantity"
//                 name="storyQuantity"
//                 style={{ fontWeight: "500" }}
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input the story Quantity!",
//                   },
//                 ]}
//                 className="flex flex-col"
//               >
//                 <Input
//                   placeholder="Enter story Quantity"
//                   type="number"
//                   className="h-10 w-40 bg-transparent border-black rounded-md text-center hover:bg-transparent hover:border-black placeholder:text-gray-500"
//                 />
//               </Form.Item>

//               <Form.Item>
//                 <Button
//                   onClick={handleAddPlan}
//                   className="bg-[#013564] text-white h-10 rounded-md mt-[30px]"
//                 >
//                   Add
//                 </Button>
//               </Form.Item>
//             </Form>

//             <div className="my-2">
//               {offerSubscriptions.map((plan, index) => (
//                 <p key={index} className="font-bold">
//                   - {index + 1}. ${plan.price} / {plan.storyQuantity} story
//                 </p>
//               ))}
//             </div>

//             <Form.Item
//               label="Facilities"
//               name="facilities"
//               style={{ fontWeight: "500" }}
//               rules={[{ required: true, message: "Please select word count!" }]}
//             >
//               <Checkbox.Group className="w-full flex flex-col -mt-2  ml-2">
//                 <p>Story Category</p>
//                 <div className="mt-1">
//                   <div className="flex justify-between items-center">
//                     <span className="font-normal">i) All People Stories</span>
//                     <Checkbox
//                       value="All People Stories"
//                       className="font-normal"
//                     />
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="font-normal">ii) Veteran Stories</span>
//                     <Checkbox value="Veteran Stories" className="font-normal" />
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="font-normal">iii) Pets Stories</span>
//                     <Checkbox value="Pets Stories" className="font-normal" />
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="font-normal">iv) All Stories</span>
//                     <Checkbox value="All Stories" className="font-normal" />
//                   </div>
//                 </div>
//               </Checkbox.Group>
//             </Form.Item>

//             <Form.Item
//               label="Picture Distribution"
//               name="pictureDistribution"
//               style={{ fontWeight: "500", marginTop: "-20px" }}
//               rules={[{ required: true, message: "Please select word count!" }]}
//             >
//               <Radio.Group className="font-normal w-full flex flex-col -mt-2 ml-4">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm">i) 2 Pictures</span>
//                   <Radio value={2} />
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm">ii) 3 Pictures</span>
//                   <Radio value={3} />
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm">iii) 5 Pictures</span>
//                   <Radio value={5} />
//                 </div>
//               </Radio.Group>
//             </Form.Item>
//             <Form.Item
//               label="Timeline"
//               name="timeline"
//               style={{ fontWeight: "500", marginTop: "-20px" }}
//               rules={[{ required: true, message: "Please select a timeline!" }]}
//             >
//               <Radio.Group
//                 onChange={handleChange}
//                 value={selectedValue}
//                 className="w-full font-normal -mt-2  ml-4"
//               >
//                 {/* Each Radio Button Item */}
//                 <div className="flex justify-between items-center rounded-md">
//                   <span className="text-sm">i) 30 Days</span>
//                   <Radio value={30} />
//                 </div>

//                 <div className="flex justify-between items-center rounded-md">
//                   <span className="text-sm">i) 4 Months</span>
//                   <Radio value={120} />
//                 </div>

//                 <div className="flex justify-between items-center rounded-md">
//                   <span className="text-sm">ii) 6 Months</span>
//                   <Radio value={180} />
//                 </div>

//                 <div className="flex justify-between items-center rounded-md">
//                   <span className="text-sm">iii) 1 Year</span>
//                   <Radio value={365} />
//                 </div>
//               </Radio.Group>
//             </Form.Item>
//             <Form.Item
//               label="Words"
//               name="words"
//               style={{ fontWeight: "500", marginTop: "-20px" }}
//               rules={[{ required: true, message: "Please select word count!" }]}
//             >
//               <Radio.Group className="font-normal w-full flex flex-col -mt-2 ml-4">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm">i) 80 Words</span>
//                   <Radio value={80} />
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm">ii) 220 Words</span>
//                   <Radio value={220} />
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm">iii) 500 Words</span>
//                   <Radio value={500} />
//                 </div>
//               </Radio.Group>
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 onClick={handleSave}
//                 className="w-full h-10 bg-[#013564] text-white text-base sm:text-lg font-bold"
//               >
//                 Save
//               </Button>
//             </Form.Item>
//           </Form>
//         </Modal>
//       </ConfigProvider>

//       {/* Subscription Card List */}
//       <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
//         {allSubscriptionPlans?.data?.map((sub, index) => (
//           <Card
//             key={index}
//             style={{
//               width: "100%",
//               maxWidth: 320,
//               height: "auto",
//             }}
//             className="bg-white text-black p-0 sm:px-4 min-h-[350] shadow-xl"
//           >
//             <div className="flex flex-col gap-5 sm:gap-4">
//               {/* Edit and Delete Buttons */}
//               <div className="flex justify-end gap-1 px-2">
//                 <Button
//                   onClick={() => showDeleteModal(sub)}
//                   className="text-[#013564] border-none hover:text-[#013564]"
//                   icon={<DeleteOutlined />}
//                 ></Button>{" "}
//                 <Button
//                   onClick={() => showEditModal(sub)}
//                   className="text-[#013564] border-none hover:text-[#013564]"
//                   icon={<EditOutlined />}
//                 ></Button>
//               </div>
//               <div className="flex flex-col gap-2 sm:gap-6">
//                 {/* Plan Name and Page Distribution */}
//                 <div>
//                   <p className="text-xl sm:text-2xl font-bold">
//                     {sub?.planName}
//                   </p>
//                   <p className="text-lg sm:text-xl font-bold">
//                     {sub?.pageDistribution}
//                   </p>
//                 </div>

//                 {/* Offer Subscription Options */}
//                 <div>
//                   <Radio.Group
//                     value={selectedOffers[sub._id] || null} // No default selected
//                     onChange={(e) => handleRadioChange(sub._id, e.target.value)} // Pass planId and selected offerId
//                   >
//                     {sub?.offerSubscriptions?.map((offer, index) => (
//                       <div key={index} className="flex flex-col mb-2">
//                         <Radio value={offer._id} className="w-full">
//                           <div className="flex items-start">
//                             <p className="text-lg font-bold">${offer.price}</p>
//                             <p className="px-1">/</p>
//                             <p className="font-semibold">
//                               {offer?.storyQuantity} story
//                             </p>
//                           </div>
//                         </Radio>
//                       </div>
//                     ))}
//                   </Radio.Group>
//                 </div>

//                 {/* Facilities Section */}
//                 <div className="flex gap-1 items-center text-base sm:text-lg">
//                   <div className="flex flex-col gap-2">
//                     {/* Story Categories */}
//                     {sub?.facilities?.storyCategory?.map((storyCategory, i) => (
//                       <div key={i} className="flex gap-2">
//                         <CheckOutlined className="bg-blue-200 text-blue-700 rounded-full p-1" />
//                         <span>{storyCategory}</span>
//                       </div>
//                     ))}

//                     {/* Picture Distribution */}
//                     <div className="flex gap-2">
//                       <CheckOutlined className="bg-blue-200 text-blue-700 rounded-full p-1" />
//                       <span>
//                         {sub?.facilities?.pictureDistribution} Pictures
//                       </span>
//                     </div>

//                     {/* Timeline */}
//                     <div className="flex gap-2">
//                       <CheckOutlined className="bg-blue-200 text-blue-700 rounded-full p-1" />
//                       <span>
//                         Active{" "}
//                         {sub?.facilities?.timeline > 364
//                           ? `${Math.round(
//                               sub?.facilities?.timeline / 365
//                             )} Year(s)`
//                           : sub?.facilities?.timeline > 30
//                           ? `${Math.round(
//                               sub?.facilities?.timeline / 30
//                             )} Month(s)`
//                           : `${sub?.facilities?.timeline} Day(s)`}
//                       </span>
//                     </div>

//                     {/* Word Count */}
//                     <div className="flex gap-2">
//                       <CheckOutlined className="bg-blue-200 text-blue-700 rounded-full p-1" />
//                       <span>Consist of {sub?.facilities?.wordCount} Words</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <ConfigProvider
//                 theme={{
//                   components: {
//                     Button: {
//                       defaultHoverBg: "rgb(112,189,249)",
//                       defaultHoverBorderColor: "rgb(178,212,253)",
//                       defaultHoverColor: "rgb(0,0,0)",
//                     },
//                   },
//                 }}
//               >
//                 {/* <Button
//                     onClick={() => {
//                       const selectedOfferId = selectedOffers[sub._id];
//                       // Find the selected offer based on selectedOffers state
//                       const selectedOffer = sub.offerSubscriptions.find(
//                         (offer) => offer._id === selectedOfferId
//                       );
//                       console.log("Selected Offer:", selectedOffer);

//                       handleBuyNow(sub, selectedOffer); // Pass the subscription plan and selected offer
//                     }}
//                     // disabled={!selectedOffers[sub._id]}
//                     disabled
//                     className="h-10 sm:h-12 bg-[#97c6ea] text-base sm:text-lg font-bold"
//                   >
//                     Buy Now <ArrowRightOutlined />
//                   </Button> */}
//               </ConfigProvider>
//             </div>
//           </Card>
//         ))}
//       </div>

//       <ConfigProvider
//         theme={{
//           components: {
//             Button: {
//               defaultHoverBg: "rgb(112,189,249)",
//               defaultHoverBorderColor: "rgb(178,212,253)",
//               defaultHoverColor: "rgb(0,0,0)",
//             },
//             Modal: {
//               contentBg: "rgb(177,215,250)",
//             },
//             Form: {
//               labelColor: "rgb(0,0,0)",
//               activeBg: "rgb(151,198,234)",
//             },
//             Checkbox: {
//               colorBgContainer: "rgb(151,198,234)",
//               colorBorder: "rgb(0,0,0)",
//             },
//             Select: {
//               colorBgContainer: "rgb(177,215,250)",
//               colorBgElevated: "rgb(126,187,244)",
//             },
//           },
//         }}
//       >
//         {/* Edit Subscription Modal */}
//         <Modal
//           open={isEditModalOpen}
//           onCancel={closeModals}
//           footer={null}
//           modalRender={(modal) => (
//             <div style={{ borderRadius: 1, overflow: "hidden" }}>
//               <div
//                 style={{
//                   backgroundColor: "#013564", // Set your custom background color here
//                   padding: "16px",
//                   color: "white", // Optional: Change text color for contrast
//                   fontSize: "16px",
//                   fontWeight: "bold",
//                   textAlign: "center",
//                 }}
//               >
//                 Edit Subscription
//               </div>
//               <div>{modal}</div>
//             </div>
//           )}
//         >
//           <Form
//             form={form}
//             initialValues={{
//               planName: selectedSubscription?.planName,
//               pageDistribution: selectedSubscription?.pageDistribution,
//               storyCategory: selectedSubscription?.facilities?.storyCategory,
//               pictureDistribution:
//                 selectedSubscription?.facilities?.pictureDistribution,
//               timeline: selectedSubscription?.facilities?.timeline,
//               wordCount: selectedSubscription?.facilities?.wordCount,
//             }}
//             onFinish={handleEditSave}
//           >
//             <Form.Item
//               label={
//                 <span style={{ color: "black", fontWeight: "500" }}>
//                   Plan Name:
//                 </span>
//               }
//               name="planName"
//             >
//               <Input placeholder="Enter plan name" />
//             </Form.Item>

//             <Form.Item
//               label={
//                 <span style={{ color: "black", fontWeight: "500" }}>
//                   Page Distribution:
//                 </span>
//               }
//               name="pageDistribution"
//               style={{ marginTop: "-20px" }}
//             >
//               <Select placeholder="Select Page Distribution">
//                 <Select.Option value="Quarter Page">Quarter Page</Select.Option>
//                 <Select.Option value="Half Page">Half Page</Select.Option>
//                 <Select.Option value="Full Page">Full Page</Select.Option>
//               </Select>
//             </Form.Item>

//             <Form.Item
//               label={
//                 <span style={{ color: "black", fontWeight: "500" }}>
//                   Story Category:
//                 </span>
//               }
//               name="storyCategory"
//             >
//               <Checkbox.Group>
//                 <Checkbox value="All People Stories">
//                   All People Stories
//                 </Checkbox>
//                 <Checkbox value="Veteran Stories">Veteran Stories</Checkbox>
//                 <Checkbox value="Pets Stories">Pets Stories</Checkbox>
//                 <Checkbox value="All Stories">All Stories</Checkbox>
//               </Checkbox.Group>
//             </Form.Item>

//             <Form.Item
//               label={
//                 <span style={{ color: "black", fontWeight: "500" }}>
//                   Picture Distribution:
//                 </span>
//               }
//               name="pictureDistribution"
//             >
//               <Radio.Group>
//                 <Radio value={2}>2 Pictures</Radio>
//                 <Radio value={3}>3 Pictures</Radio>
//                 <Radio value={5}>5 Pictures</Radio>
//               </Radio.Group>
//             </Form.Item>

//             <Form.Item
//               label={
//                 <span style={{ color: "black", fontWeight: "500" }}>
//                   Timeline:
//                 </span>
//               }
//               name="timeline"
//             >
//               <Radio.Group>
//                 <Radio value={30}>30 Days</Radio>
//                 <Radio value={180}>6 Months</Radio>
//                 <Radio value={365}>1 Year</Radio>
//               </Radio.Group>
//             </Form.Item>

//             <Form.Item
//               label={
//                 <span style={{ color: "black", fontWeight: "500" }}>
//                   Word Count:
//                 </span>
//               }
//               name="wordCount"
//             >
//               <Radio.Group>
//                 <Radio value={80}>80 Words</Radio>
//                 <Radio value={220}>220 Words</Radio>
//                 <Radio value={500}>500 Words</Radio>
//               </Radio.Group>
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 style={{
//                   backgroundColor: "#013564",
//                   color: "white",
//                   borderColor: "#013564",
//                   width: "150px",
//                   marginLeft: "150px",
//                 }}
//                 htmlType="submit"
//               >
//                 Save
//               </Button>
//             </Form.Item>
//           </Form>
//         </Modal>

//         {/* Delete Subscription Modal */}
//         <Modal
//           // title="Confirm Deletion"
//           open={isDeleteModalOpen}
//           onCancel={closeModals}
//           onOk={handleDeleteConfirm}
//           okText="Delete"
//           okButtonProps={{
//             style: {
//               backgroundColor: "#013564",
//               borderColor: "#013564",
//               color: "white",
//             },
//           }}
//           cancelButtonProps={{
//             style: { backgroundColor: "#d9d9d9", color: "black" },
//           }}
//           modalRender={(modal) => (
//             <div style={{ borderRadius: 1, overflow: "hidden" }}>
//               <div
//                 style={{
//                   backgroundColor: "#013564", // Set your custom background color here
//                   padding: "16px",
//                   color: "white", // Optional: Change text color for contrast
//                   fontSize: "16px",
//                   fontWeight: "bold",
//                   textAlign: "center",
//                 }}
//               >
//                 Confirm Deletion
//               </div>
//               <div>{modal}</div>
//             </div>
//           )}
//         >
//           <p>
//             {`Are you sure you want to delete the subscription "${selectedSubscription?.planName}"?`}
//           </p>
//         </Modal>
//       </ConfigProvider>
//     </div>
//   );
// }
