import React, { useState } from "react";
import { Input, Button, Form, ConfigProvider, Select } from "antd";
import {
  CalendarOutlined,
  EditOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import profileImage from "../../../public/images/profileImage.jpg";

const countryCodes = [
  { label: "+1", value: "US", flag: "https://flagcdn.com/w320/us.png" },
  { label: "+44", value: "UK", flag: "https://flagcdn.com/w320/gb.png" },
  { label: "+91", value: "IN", flag: "https://flagcdn.com/w320/in.png" },
  { label: "+880", value: "BD", flag: "https://flagcdn.com/w320/bd.png" }, // Bangladesh
  { label: "+92", value: "PK", flag: "https://flagcdn.com/w320/pk.png" }, // Pakistan
  { label: "+54", value: "AR", flag: "https://flagcdn.com/w320/ar.png" }, // Argentina
  { label: "+90", value: "TR", flag: "https://flagcdn.com/w320/tr.png" }, // Turkey
];

const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "Dr",
    lastName: "Mathews",
    email: "dr.mathews@example.com",
    phoneCode: "BD",
    phoneNumber: "01846875456",
    birthday: "1990-01-01",
  });
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="p-4 lg:p-8 min-h-screen">
      <div className="flex justify-between items-center mb-8 xl:mx-40">
        <div className="flex items-center">
          <LeftOutlined
            className="text-black text-xl mr-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-black text-2xl font-semibold">
            Profile Information
          </h2>
        </div>
        <Button
          icon={<EditOutlined />}
          onClick={handleEditClick}
          className="bg-[#013564] text-white h-10"
        >
          Edit Profile
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 xl:mx-40">
        <div className="flex items-center gap-20">
          <div className="flex flex-col items-center">
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-full w-36 h-36 object-cover mb-4"
            />
            <h3 className="xl:text-lg font-bold">Admin</h3>
            <h2 className="text-xl lg:text-2xl font-bold">{`${profileData.firstName} ${profileData.lastName}`}</h2>
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
              <Form layout="vertical">
                <div className="grid grid-cols-2 gap-4">
                  <Form.Item
                    label={
                      <label
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "18px",
                        }}
                      >
                        First Name
                      </label>
                    }
                  >
                    <Input
                      className="bg-[#8BC4F7] rounded-lg h-10 font-semibold"
                      value={profileData.firstName}
                      readOnly
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <label
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "18px",
                        }}
                      >
                        Last Name
                      </label>
                    }
                  >
                    <Input
                      className="bg-[#8BC4F7] rounded-lg h-10 font-semibold"
                      value={profileData.lastName}
                      readOnly
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  label={
                    <label
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Email
                    </label>
                  }
                >
                  <Input
                    className=" bg-[#8BC4F7] rounded-lg h-10 font-semibold"
                    value={profileData.email}
                    readOnly
                  />
                </Form.Item>
                <div className="flex flex-col">
                  <Form.Item
                    label={
                      <label
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "18px",
                        }}
                      >
                        Phone Number
                      </label>
                    }
                  >
                    <div className="flex gap-2">
                      <Select
                        defaultValue={profileData.phoneCode}
                        className="h-10"
                        style={{ width: 320 }}
                        open={false}
                      >
                        {countryCodes.map((country) => (
                          <Select.Option
                            key={country.value}
                            value={country.value}
                          >
                            <img
                              src={country.flag}
                              alt={`${country.value} Flag`}
                              className="w-5 h-3 inline-block mr-2"
                            />
                            {country.label}
                          </Select.Option>
                        ))}
                      </Select>

                      <Input
                        className="bg-[#8BC4F7] rounded-lg h-10 font-semibold"
                        value={profileData.phoneNumber}
                        readOnly
                      />
                    </div>
                  </Form.Item>
                </div>
                <Form.Item
                  label={
                    <label
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      First Name
                    </label>
                  }
                >
                  <Input
                    className="bg-[#8BC4F7] rounded-lg h-10 font-semibold"
                    value={profileData.birthday}
                    prefix={
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <CalendarOutlined />
                        <span style={{ marginLeft: "8px" }}></span>
                      </div>
                    }
                    readOnly
                  />
                </Form.Item>
              </Form>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
