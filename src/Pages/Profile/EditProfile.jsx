import { Button, ConfigProvider, Form, Input, Select, Upload } from "antd";
import profileImage from "/images/profileImage.jpg";
import { useState } from "react";
import {
  CalendarOutlined,
  EditOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import moment from "moment";

const EditProfile = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(profileImage);
  const [selectedBirthday, setSelectedBirthday] = useState(
    new Date("1990-01-01")
  );
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const countryCodes = [
    { label: "+1", value: "US", flag: "https://flagcdn.com/w320/us.png" },
    { label: "+44", value: "UK", flag: "https://flagcdn.com/w320/gb.png" },
    { label: "+91", value: "IN", flag: "https://flagcdn.com/w320/in.png" },
    { label: "+880", value: "BD", flag: "https://flagcdn.com/w320/bd.png" },
    { label: "+92", value: "PK", flag: "https://flagcdn.com/w320/pk.png" },
    { label: "+54", value: "AR", flag: "https://flagcdn.com/w320/ar.png" },
    { label: "+90", value: "TR", flag: "https://flagcdn.com/w320/tr.png" },
  ];

  const handleUploadChange = (info) => {
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => setImageUrl(imageUrl));
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const onFinish = (values) => {
    console.log("Form Values:", values);
    console.log("Selected Birthday:", selectedBirthday);
    navigate("/profile");
  };

  const handleDateChange = (date) => {
    setSelectedBirthday(date);
    setIsPickerVisible(false); // Hide the picker once a date is selected
  };

  return (
    <div className="p-4 lg:p-8 min-h-screen">
      <div className="flex justify-between items-center mb-8 mx-10 xl:mx-40">
        <div className="flex items-center">
          <LeftOutlined
            className="text-black text-xl mr-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-black text-2xl font-semibold">
            Profile Information
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 md:mx-10 xl:mx-40">
        <div className="flex items-center gap-8 lg:gap-20">
          <div className="relative flex flex-col items-center w-96">
            <img
              src={imageUrl}
              alt="Profile"
              className="rounded-full md:w-28 md:h-28 lg:h-32 lg:w-32 xl:w-36 xl:h-36 object-cover mb-4"
            />
            <Upload
              name="avatar"
              showUploadList={false}
              onChange={handleUploadChange}
              beforeUpload={() => false} // Prevent automatic upload
            >
              <div className="absolute h-5 lg:h-8 w-20 lg:w-24 xl:w-24 inset-0 top-8 xl:top-24 md:top-20 md:left-12 xl:left-36 flex items-center justify-center bg-blue-800 bg-opacity-50 rounded-full opacity-100 cursor-pointer">
                <span className="text-white text-xs lg:text-sm">
                  Change Image
                </span>
              </div>
            </Upload>
            <h3 className="text-base font-semibold">Admin</h3>
            <h2 className="text-lg font-bold">Dr Mathews</h2>
          </div>
          <div className="flex-1">
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    colorTextPlaceholder: "rgba(255,255,255,0.7)",
                    hoverBg: "rgb(113,185,249)",
                    activeBg: "rgb(115,185,247)",
                  },
                },
              }}
            >
              <Form
                layout="vertical"
                id="editProfileForm"
                onFinish={onFinish}
                initialValues={{
                  firstName: "Dr",
                  lastName: "Mathews",
                  email: "dr.mathews@example.com",
                  phoneCode: "BD",
                  phoneNumber: "01846875456",
                  birthday: "1990-01-01",
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    label={
                      <label className="text-black font-bold text-lg">
                        First Name
                      </label>
                    }
                    name="firstName"
                  >
                    <Input
                      className="bg-[#8BC4F7] rounded-lg h-10 font-semibold"
                      placeholder="Enter Your First Name"
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <label className="text-black font-bold text-lg">
                        Last Name
                      </label>
                    }
                    name="lastName"
                  >
                    <Input
                      className="bg-[#8BC4F7] rounded-lg h-10 font-semibold"
                      placeholder="Enter Your Last Name"
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  label={
                    <label className="text-black font-bold text-lg">
                      Email
                    </label>
                  }
                  name="email"
                >
                  <Input
                    className="bg-[#8BC4F7] rounded-lg h-10 font-semibold"
                    placeholder="Type Your Email"
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <label className="text-black font-bold text-lg">
                      Phone Number
                    </label>
                  }
                  name="phoneCode"
                >
                  <div className="flex gap-2">
                    <Select
                      className="h-10"
                      style={{ width: 250 }}
                      options={countryCodes.map((country) => ({
                        label: (
                          <div className="flex items-center">
                            <img
                              src={country.flag}
                              alt={`${country.value} Flag`}
                              className="w-5 h-3 inline-block mr-2"
                            />
                            {country.label}
                          </div>
                        ),
                        value: country.value,
                      }))}
                    />
                    <Form.Item name="phoneNumber" noStyle>
                      <Input
                        className="bg-[#8BC4F7] rounded-lg h-10 font-semibold"
                        placeholder="Type Your Phone Number"
                      />
                    </Form.Item>
                  </div>
                </Form.Item>
                <Form.Item
                  label={
                    <label className="text-black font-bold text-lg">
                      Birthday
                    </label>
                  }
                  name="birthday"
                >
                  <div
                    className="bg-[#8BC4F7] rounded-lg h-10 font-semibold w-full flex items-center justify-between cursor-pointer"
                    onClick={() => setIsPickerVisible(!isPickerVisible)}
                  >
                    <span className="ml-2">
                      {selectedBirthday
                        ? moment(selectedBirthday).format("YYYY-MM-DD")
                        : "Select Your Birthday"}
                    </span>
                    <CalendarOutlined style={{ marginRight: "10px" }} />
                  </div>
                </Form.Item>

                {/* Calendar as an absolute positioned overlay */}
                {isPickerVisible && (
                  <div className="absolute right-56 top-56 z-10 bg-white p-2 shadow-lg rounded-md">
                    <DayPicker
                      mode="single"
                      selected={selectedBirthday}
                      onSelect={handleDateChange}
                    />
                  </div>
                )}

                <Button
                  block
                  form="editProfileForm"
                  key="submit"
                  htmlType="submit"
                  className="bg-[#013564] text-white h-10 py-5 rounded-xl font-semibold"
                >
                  Save Changes
                </Button>
              </Form>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
