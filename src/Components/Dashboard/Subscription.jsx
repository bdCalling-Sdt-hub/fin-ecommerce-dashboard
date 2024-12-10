import {
  Button,
  ConfigProvider,
  Card,
  Modal,
  Form,
  Input,
  Checkbox,
  Select,
  Radio,
  InputNumber,
} from "antd";
import { useState } from "react";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  useAllSubscriptionPlansQuery,
  useCreateSubscriptionMutation,
} from "../../Redux/api/subscriptionApi";

export default function Subscription() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [form] = Form.useForm();
  const [formAddPlan] = Form.useForm();
  const [selectedOffers, setSelectedOffers] = useState({});
  const [offerSubscriptions, setOfferSubscription] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [lockAccessToYourPage, setLockAccessToYourPage] = useState(false);
  const [scanStatistics, setScanStatistics] = useState(false);
  const [notificationReceivedAtEachScan, setNotificationReceivedAtEachScan] =
    useState(false);
  const [isStrickers, setIsStrickers] = useState(false);

  const {
    data: allSubscriptionPlans,
    isLoading,
    error,
    refetch,
  } = useAllSubscriptionPlansQuery();

  console.log(allSubscriptionPlans?.data);

  const [createSubscription] = useCreateSubscriptionMutation();
  // useEffect(() => {
  //   if (allSubscriptionPlans?.data) {
  //     const initialSelections = {};
  //     allSubscriptionPlans?.data.forEach((plan) => {
  //       console.log(plan.offerSubscriptions);
  //       if (plan.offerSubscriptions?.length > 0) {
  //         initialSelections[plan?.planName] =
  //           plan.offerSubscriptions[0].subPlanName; // Access the first offer correctly
  //       }
  //       console.log(initialSelections);
  //     });
  //     setSelectedOffers(initialSelections);
  //   }
  // }, [allSubscriptionPlans]);

  console.log(selectedOffers);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching subscription plans.</p>;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showEditModal = (subscription) => {
    setSelectedSubscription(subscription);
    // setIsEditModalOpen(true);
    console.log(subscription);
  };

  const showDeleteModal = (subscription) => {
    setSelectedSubscription(subscription);
    // setIsDeleteModalOpen(true);
    console.log(subscription);
  };
  const handleSave = () => {
    form
      .validateFields()
      .then((mainFormValues) => {
        // Combine the radio button values and other necessary data from the form state
        const subscriptionData = {
          ...mainFormValues,
          lockAccessToYourPage, // Assuming lockAccessToYourPage is coming from the component state
          scanStatistics, // Same for scanStatistics
          notificationReceivedAtEachScan, // Same for notificationReceivedAtEachScan
          isStrickers, // Same for isStrickers
        };

        // Combine facilities (which is part of the form) with other data
        const facilities = {
          storyCategory: mainFormValues.facilities,
          pictureDistribution: mainFormValues.pictureDistribution,
          timeline: mainFormValues.timeline,
          wordCount: mainFormValues.words,
        };

        // Final data to send, combining form data and offer subscriptions
        const allFormData = {
          ...subscriptionData,
          facilities, // Include facilities data
          offerSubscriptions, // Include the offer subscriptions (added plans)
        };

        // Make the API call to create the subscription
        createSubscription(allFormData)
          .unwrap()
          .then(() => {
            // Refetch subscription data to update the list with the new subscription
            refetch();

            // Reset the form fields after successful submission
            form.resetFields();
            formAddPlan.resetFields();

            // Clear offers after successful submission
            setOfferSubscription([]);

            // Close the modal
            setIsModalOpen(false);
          })
          .catch((error) => {
            console.error("Error creating subscription:", error);
          });
      })
      .catch((error) => {
        console.error("Form validation failed:", error);
      });
  };

  // Handle selecting plan for purchase
  // const handleBuyNow = (sub) => {
  //   const selectedOfferId = selectedOffers[sub._id];
  //   const selectedOffer = sub.offerSubscriptions.find(
  //     (offer) => offer._id === selectedOfferId
  //   );
  //   console.log("Selected Plan:", sub.planName);
  //   console.log("Selected Offer Price:", selectedOffer?.price);
  //   console.log("Selected Duration:", selectedOffer?.subPlanName);
  // };

  return (
    <div className="bg-white min-h-screen rounded-lg">
      <div className="bg-[#3399FF] py-3 px-4 rounded-lg ">
        <p className="text-lg sm:text-3xl text-white font-semibold">
          Subscription
        </p>
      </div>
      <div className="flex items-center justify-center my-8 sm:my-10">
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultBg: "#97C6EA",
                defaultHoverBg: "rgb(112,189,249)",
                defaultHoverBorderColor: "rgb(178,212,253)",
                defaultHoverColor: "rgb(0,0,0)",
              },
            },
          }}
        >
          <Button
            onClick={showModal}
            className="flex items-center gap-1 sm:gap-3 bg-[] w-full sm:w-2/3 h-12 font-semibold border-none"
          >
            <EditOutlined />
            <p className="text-xs sm:text-lg">Create Subscription Plan</p>
          </Button>
        </ConfigProvider>
      </div>

      {/* Subscription Plan Creation Modal */}
      <>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultHoverBg: "rgb(112,189,249)",
                defaultHoverBorderColor: "rgb(178,212,253)",
                defaultHoverColor: "rgb(0,0,0)",
              },
              Modal: {
                contentBg: "rgb(177,215,250)",
              },
              Form: {
                labelColor: "rgb(0,0,0)",
                activeBg: "rgb(151,198,234)",
              },
              Checkbox: {
                colorBgContainer: "rgb(151,198,234)",
                colorBorder: "rgb(0,0,0)",
              },
              Select: {
                colorBgContainer: "rgb(177,215,250)",
                colorBgElevated: "rgb(126,187,244)",
              },
            },
          }}
        >
          <Modal
            // title="Create Subscription Plan"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
          >
            <Form form={form} onFinish={handleSave} layout="vertical">
              {/* Name */}
              <Form.Item
                label="Subscription Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input the subscription name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              {/* Price */}
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please input the price!" }]}
              >
                <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
              </Form.Item>

              {/* Duration Days */}
              <Form.Item
                label="Duration (Days)"
                name="durationDays"
                rules={[
                  {
                    required: true,
                    message: "Please input the duration in days!",
                  },
                ]}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>

              {/* Video Duration */}
              <Form.Item
                label="Video Duration (Minutes)"
                name="videoDuration"
                rules={[
                  {
                    required: true,
                    message: "Please input the video duration!",
                  },
                ]}
              >
                <InputNumber min={2} style={{ width: "100%" }} />
              </Form.Item>

              {/* Lock Access to Your Page (Radio Button) */}
              <Form.Item label="Lock Access to Your Page">
                <Radio.Group
                  value={lockAccessToYourPage}
                  onChange={(e) => setLockAccessToYourPage(e.target.value)}
                >
                  <Radio value={true}>True</Radio>
                  <Radio value={false}>False</Radio>
                </Radio.Group>
              </Form.Item>

              {/* Scan Statistics (Radio Button) */}
              <Form.Item label="Scan Statistics">
                <Radio.Group
                  value={scanStatistics}
                  onChange={(e) => setScanStatistics(e.target.value)}
                >
                  <Radio value={true}>True</Radio>
                  <Radio value={false}>False</Radio>
                </Radio.Group>
              </Form.Item>

              {/* Notification Received at Each Scan (Radio Button) */}
              <Form.Item label="Notification Received at Each Scan">
                <Radio.Group
                  value={notificationReceivedAtEachScan}
                  onChange={(e) =>
                    setNotificationReceivedAtEachScan(e.target.value)
                  }
                >
                  <Radio value={true}>True</Radio>
                  <Radio value={false}>False</Radio>
                </Radio.Group>
              </Form.Item>

              {/* Is Strickers (Radio Button) */}
              <Form.Item label="Is Strickers">
                <Radio.Group
                  value={isStrickers}
                  onChange={(e) => setIsStrickers(e.target.value)}
                >
                  <Radio value={true}>True</Radio>
                  <Radio value={false}>False</Radio>
                </Radio.Group>
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <Button htmlType="submit" block>
                  Create Subscription
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </ConfigProvider>
      </>

      {/* Subscription Card List */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {allSubscriptionPlans?.data?.map((sub, index) => (
          <Card
            key={index}
            style={{
              width: "100%",
              maxWidth: 350,
              height: "auto",
            }}
            className="bg-white text-black p-0 sm:px-4 min-h-[350] shadow-xl"
          >
            <div className="flex flex-col gap-5 sm:gap-4">
              {/* Edit and Delete Buttons */}
              <div className="flex justify-end gap-1 px-2">
                <Button
                  onClick={() => showDeleteModal(sub)}
                  className="text-[#013564] border-none hover:text-[#013564]"
                  icon={<DeleteOutlined />}
                ></Button>{" "}
                <Button
                  onClick={() => showEditModal(sub)}
                  className="text-[#013564] border-none hover:text-[#013564]"
                  icon={<EditOutlined />}
                ></Button>
              </div>
              <div className="flex flex-col gap-2 sm:gap-6">
                {/* Plan Name and Page Distribution */}
                <div>
                  <p className="text-xl sm:text-2xl font-bold">{sub?.name}</p>
                  <p className="text-lg sm:text-xl">
                    Price: <span className="font-bold">{sub?.price}</span>
                  </p>
                  <p className="text-lg sm:text-xl ">
                    Validity:{" "}
                    <span className="font-bold">{sub?.durationDays}</span>
                  </p>
                </div>

                {/* Offer Subscription Options */}
                {/* <div>
                  <Radio.Group
                    value={selectedOffers[sub._id] || null} // No default selected
                    onChange={(e) => handleRadioChange(sub._id, e.target.value)} // Pass planId and selected offerId
                  >
                    {sub?.offerSubscriptions?.map((offer, index) => (
                      <div key={index} className="flex flex-col mb-2">
                        <Radio value={offer._id} className="w-full">
                          <div className="flex items-start">
                            <p className="text-lg font-bold">${offer.price}</p>
                            <p className="px-1">/</p>
                            <p className="font-semibold">
                              {offer?.storyQuantity} story
                            </p>
                          </div>
                        </Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div> */}

                <div className="flex flex-col gap-2">
                  {sub?.createOrAddVideo !== undefined && (
                    <div className="flex gap-2">
                      {sub.createOrAddVideo ? (
                        <CheckOutlined className="bg-blue-200 text-blue-700 rounded-full p-1" />
                      ) : (
                        <CloseOutlined className="bg-red-200 text-red-700 rounded-full p-1" />
                      )}
                      <span>Create Or Add Video</span>
                    </div>
                  )}

                  {sub?.isStrickers !== undefined && (
                    <div className="flex gap-2">
                      {sub.isStrickers ? (
                        <CheckOutlined className="bg-blue-200 text-blue-700 rounded-full p-1" />
                      ) : (
                        <CloseOutlined className="bg-red-200 text-red-700 rounded-full p-1" />
                      )}
                      <span>Strickers Available</span>
                    </div>
                  )}
                  {sub?.lockAccessToYourPage !== undefined && (
                    <div className="flex gap-2">
                      {sub.lockAccessToYourPage ? (
                        <CheckOutlined className="bg-blue-200 text-blue-700 rounded-full p-1" />
                      ) : (
                        <CloseOutlined className="bg-red-200 text-red-700 rounded-full p-1" />
                      )}
                      <span>Lock Access To Your Page</span>
                    </div>
                  )}

                  {sub?.notificationReceivedAtEachScan !== undefined && (
                    <div className="flex gap-2">
                      {sub.notificationReceivedAtEachScan ? (
                        <CheckOutlined className="bg-blue-200 text-blue-700 rounded-full p-1" />
                      ) : (
                        <CloseOutlined className="bg-red-200 text-red-700 rounded-full p-1" />
                      )}
                      <span>Notification Received At Each Scan</span>
                    </div>
                  )}

                  {sub?.scanStatistics !== undefined && (
                    <div className="flex gap-2">
                      {sub.scanStatistics ? (
                        <CheckOutlined className="bg-blue-200 text-blue-700 rounded-full p-1" />
                      ) : (
                        <CloseOutlined className="bg-red-200 text-red-700 rounded-full p-1" />
                      )}
                      <span>Scan Statistics</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultHoverBg: "rgb(112,189,249)",
              defaultHoverBorderColor: "rgb(178,212,253)",
              defaultHoverColor: "rgb(0,0,0)",
            },
            Modal: {
              contentBg: "rgb(177,215,250)",
            },
            Form: {
              labelColor: "rgb(0,0,0)",
              activeBg: "rgb(151,198,234)",
            },
            Checkbox: {
              colorBgContainer: "rgb(151,198,234)",
              colorBorder: "rgb(0,0,0)",
            },
            Select: {
              colorBgContainer: "rgb(177,215,250)",
              colorBgElevated: "rgb(126,187,244)",
            },
          },
        }}
      >
        {/* Edit Subscription Modal */}
        {/* <Modal
          open={isEditModalOpen}
          onCancel={closeModals}
          footer={null}
          modalRender={(modal) => (
            <div style={{ borderRadius: 1, overflow: "hidden" }}>
              <div
                style={{
                  backgroundColor: "#013564", // Set your custom background color here
                  padding: "16px",
                  color: "white", // Optional: Change text color for contrast
                  fontSize: "16px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Edit Subscription
              </div>
              <div>{modal}</div>
            </div>
          )}
        >
          <Form
            form={form}
            initialValues={{
              planName: selectedSubscription?.planName,
              pageDistribution: selectedSubscription?.pageDistribution,
              storyCategory: selectedSubscription?.facilities?.storyCategory,
              pictureDistribution:
                selectedSubscription?.facilities?.pictureDistribution,
              timeline: selectedSubscription?.facilities?.timeline,
              wordCount: selectedSubscription?.facilities?.wordCount,
            }}
            onFinish={handleEditSave}
          >
            <Form.Item
              label={
                <span style={{ color: "black", fontWeight: "500" }}>
                  Plan Name:
                </span>
              }
              name="planName"
            >
              <Input placeholder="Enter plan name" />
            </Form.Item>

            <Form.Item
              label={
                <span style={{ color: "black", fontWeight: "500" }}>
                  Page Distribution:
                </span>
              }
              name="pageDistribution"
              style={{ marginTop: "-20px" }}
            >
              <Select placeholder="Select Page Distribution">
                <Select.Option value="Quarter Page">Quarter Page</Select.Option>
                <Select.Option value="Half Page">Half Page</Select.Option>
                <Select.Option value="Full Page">Full Page</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={
                <span style={{ color: "black", fontWeight: "500" }}>
                  Story Category:
                </span>
              }
              name="storyCategory"
            >
              <Checkbox.Group>
                <Checkbox value="All People Stories">
                  All People Stories
                </Checkbox>
                <Checkbox value="Veteran Stories">Veteran Stories</Checkbox>
                <Checkbox value="Pets Stories">Pets Stories</Checkbox>
                <Checkbox value="All Stories">All Stories</Checkbox>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              label={
                <span style={{ color: "black", fontWeight: "500" }}>
                  Picture Distribution:
                </span>
              }
              name="pictureDistribution"
            >
              <Radio.Group>
                <Radio value={2}>2 Pictures</Radio>
                <Radio value={3}>3 Pictures</Radio>
                <Radio value={5}>5 Pictures</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label={
                <span style={{ color: "black", fontWeight: "500" }}>
                  Timeline:
                </span>
              }
              name="timeline"
            >
              <Radio.Group>
                <Radio value={30}>30 Days</Radio>
                <Radio value={180}>6 Months</Radio>
                <Radio value={365}>1 Year</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label={
                <span style={{ color: "black", fontWeight: "500" }}>
                  Word Count:
                </span>
              }
              name="wordCount"
            >
              <Radio.Group>
                <Radio value={80}>80 Words</Radio>
                <Radio value={220}>220 Words</Radio>
                <Radio value={500}>500 Words</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <Button
                style={{
                  backgroundColor: "#013564",
                  color: "white",
                  borderColor: "#013564",
                  width: "150px",
                  marginLeft: "150px",
                }}
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal> */}

        {/* Delete Subscription Modal */}
        {/* <Modal
          // title="Confirm Deletion"
          open={isDeleteModalOpen}
          onCancel={closeModals}
          onOk={handleDeleteConfirm}
          okText="Delete"
          okButtonProps={{
            style: {
              backgroundColor: "#013564",
              borderColor: "#013564",
              color: "white",
            },
          }}
          cancelButtonProps={{
            style: { backgroundColor: "#d9d9d9", color: "black" },
          }}
          modalRender={(modal) => (
            <div style={{ borderRadius: 1, overflow: "hidden" }}>
              <div
                style={{
                  backgroundColor: "#013564", // Set your custom background color here
                  padding: "16px",
                  color: "white", // Optional: Change text color for contrast
                  fontSize: "16px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Confirm Deletion
              </div>
              <div>{modal}</div>
            </div>
          )}
        >
          <p>
            {`Are you sure you want to delete the subscription "${selectedSubscription?.planName}"?`}
          </p>
        </Modal> */}
      </ConfigProvider>
    </div>
  );
}
