import {
  Button,
  ConfigProvider,
  Card,
  Modal,
  Form,
  Input,
  Checkbox,
  Select,
} from "antd";
import React, { useState } from "react";
import {
  ArrowRightOutlined,
  CheckOutlined,
  EditOutlined,
} from "@ant-design/icons";

export default function Subscription() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscription, setSubscription] = useState([
    {
      plan: "Basic",
      price: 59,
      page: "Quarter Page",
      facilities: [
        "All People Stories",
        "Veteran Stories",
        "Pets Stories",
        "2 Pictures",
        "Active 30 days",
        "Consist of 80 words",
      ],
    },
    {
      plan: "Mid",
      price: 99,
      page: "Half Page",
      facilities: [
        "All People Stories",
        "Veteran Stories",
        "Pets Stories",
        "3 Pictures",
        "Active 6 months",
        "Consist of 220 words",
      ],
    },
    {
      plan: "Pro",
      price: 119,
      page: "Full Page",
      facilities: [
        "All People Stories",
        "Veteran Stories",
        "Pets Stories",
        "5 Pictures",
        "Active 1 year",
        "Consist of 500 words",
      ],
    },
  ]);
  const [form] = Form.useForm();

  const handleBuyNow = (plan, price, duration, facilities) => {
    console.log("Plan:", plan);
    console.log("Price:", price);
    console.log("Duration:", duration);
    console.log("Facilities:", facilities);
    // Add further handling logic here, such as navigating to a checkout page
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      console.log("values", values);
      // Create a new subscription object
      const newSubscription = {
        plan: values.planName,
        page: values.pageDistribution,
        price: values.planPrice,
        facilities: values.facilities,
        duration: values.timeline[0], // Assuming a single timeline value is selected
      };

      // Push the new subscription to the subscription array
      setSubscription([...subscription, newSubscription]);

      console.log("Updated Subscription Array:", subscription);

      // Reset form fields and close the modal
      form.resetFields();
      setIsModalOpen(false);
    });
  };

  return (
    <div className="bg-white min-h-screen rounded-lg">
      <div className="flex justify-between items-center bg-[#013564] py-3 px-4">
        <h1 className="text-lg sm:text-3xl text-white font-semibold">
          Subscription
        </h1>
      </div>
      <div className="flex items-center justify-center my-8 sm:my-10">
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultHoverBg: "rgb(112,189,249)",
                defaultHoverBorderColor: "rgb(178,212,253)",
                defaultHoverColor: "rgb(0,0,0)",
              },
            },
          }}
        >
          <Button
            onClick={showModal}
            className="flex items-center gap-1 sm:gap-3 bg-[#97C6EA] w-full sm:w-2/3 h-12 font-semibold border-none"
          >
            <EditOutlined />
            <p className="text-xs sm:text-lg">Create Subscription Plan</p>
          </Button>
        </ConfigProvider>
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
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              facilities: ["Boost voucher to popular"],
            }}
            className="px-10 py-4"
          >
            <Form.Item
              label="Plan Name"
              name="planName"
              rules={[
                { required: true, message: "Please input the plan name!" },
              ]}
              style={{ fontWeight: "500" }}
            >
              <Input
                placeholder="Enter plan name"
                className="font-medium h-12 bg-[#97C6EA] hover:bg-transparent placeholder:text-gray-500 border-none"
              />
            </Form.Item>

            <Form.Item
              label="Page Distribution"
              name="pageDistribution"
              rules={[
                {
                  required: true,
                  message: "Please select the Page Distribution!",
                },
              ]}
              style={{ fontWeight: "500" }}
            >
              <Select
                showSearch
                placeholder="Select Page Distribution"
                optionFilterProp="label"
                onChange={onChange}
                onSearch={onSearch}
                className="border border-[#013564] h-10 rounded-lg"
                options={[
                  {
                    value: "Quarter Page",
                    label: "quarterPage",
                  },
                  {
                    value: "Half Page",
                    label: "halfPage",
                  },
                  {
                    value: "Full Page",
                    label: "fullPage",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Plan Price"
              name="planPrice"
              rules={[
                { required: true, message: "Please input the plan price!" },
              ]}
              style={{ fontWeight: "500" }}
            >
              <Input
                placeholder="Enter plan price"
                type="number"
                className="font-medium h-12 bg-[#97C6EA] hover:bg-[#97C6EA] placeholder:text-gray-500 border-none"
              />
            </Form.Item>

            <Form.Item
              label="Facilities"
              name="facilities"
              style={{ fontWeight: "500" }}
            >
              <Checkbox.Group className="w-full flex flex-col">
                <p>Story Category</p>
                <div className="mt-1">
                  <div className="flex justify-between items-center">
                    <span className="font-normal">All Prople Stories</span>
                    <Checkbox
                      value="All Prople Stories"
                      className="font-normal"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-normal">Veteran Stories</span>
                    <Checkbox value="Veteran Stories" className="font-normal" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-normal">Pets Stories</span>
                    <Checkbox value="Pets Stories" className="font-normal" />
                  </div>
                </div>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              label="Picture Distribution"
              name="pictureDistribution"
              style={{ fontWeight: "500" }}
            >
              <Checkbox.Group className="font-normal w-full flex flex-col">
                <div className="flex justify-between items-center">
                  <span className="font-normal">2 Pictures</span>
                  <Checkbox value="2 Pictures" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-normal">3 Pictures</span>
                  <Checkbox value="3 Pictures" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-normal">5 Pictures</span>
                  <Checkbox value="5 Pictures" />
                </div>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              label="Timeline"
              name="timeline"
              style={{ fontWeight: "500" }}
              rules={[{ required: true, message: "Please select a timeline!" }]}
            >
              <Checkbox.Group className="font-normal w-full flex flex-col">
                <div className="flex justify-between items-center">
                  <span className="font-normal">30 Days</span>
                  <Checkbox value="30 Days" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-normal">6 Months</span>
                  <Checkbox value="6 Months" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-normal">1 Month</span>
                  <Checkbox value="1 Month" />
                </div>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item>
              <Button
                onClick={handleSave}
                className="w-full h-12 bg-[#013564] text-white text-base sm:text-lg font-bold"
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {subscription.map((sub, index) => (
          <Card
            key={index}
            style={{
              width: "100%",
              maxWidth: 320,
              height: "auto",
            }}
            className="bg-white text-black p-0 sm:p-4 min-h-[350] shadow-xl"
          >
            <div className="flex flex-col gap-5 sm:gap-14">
              <div className="flex flex-col gap-2 sm:gap-6">
                <div>
                  <p className="text-xl sm:text-2xl font-bold">{sub.plan}</p>
                  <p className="text-lg sm:text-xl font-bold">
                    {sub.page}
                  </p>
                </div>
                <p className="text-2xl sm:text-4xl font-black">
                  <span className="text-2xl sm:text-4xl">$</span>
                  {sub.price}
                  <sub className="text-lg sm:text-lg font-bold">per story</sub>
                </p>
                <div>
                  {/* <p className="text-base sm:text-lg">
                    <CheckOutlined /> {sub.duration}
                  </p> */}
                  <div className="flex gap-1 items-center text-base sm:text-lg">
                    <div className="flex flex-col gap-2">
                      {sub.facilities.map((facility, i) => (
                        <div key={i} className="flex gap-2">
                          <p>
                            <CheckOutlined className="bg-blue-200 text-blue-700 rounded-full p-1" />
                          </p>
                          {facility}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      defaultHoverBg: "rgb(112,189,249)",
                      defaultHoverBorderColor: "rgb(178,212,253)",
                      defaultHoverColor: "rgb(0,0,0)",
                    },
                  },
                }}
              >
                <Button
                  onClick={() =>
                    handleBuyNow(
                      sub.plan,
                      sub.pageDistribution,
                      sub.price,
                      sub.duration,
                      sub.facilities
                    )
                  }
                  className="h-10 sm:h-12 bg-[#97c6ea] text-base sm:text-lg font-bold"
                >
                  Buy Now <ArrowRightOutlined />
                </Button>
              </ConfigProvider>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
