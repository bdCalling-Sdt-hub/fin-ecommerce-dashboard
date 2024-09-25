import React, { useState } from "react";
import { ConfigProvider, Tooltip } from "antd";
import JustModal from "../../utils/Modal";
import {
  DeleteOutlined,
  BellOutlined,
  ArrowLeftOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const data = [
  {
    name: "Alice",
    feedback: "You have a story request.",
    time: "Fri, 12:30pm",
  },
  {
    name: "Bob",
    feedback: "An user joined in app.",
    time: "Fri, 12:30pm",
  },
  {
    name: "Charlie",
    feedback: "You have a story request.",
    time: "Fri, 12:30pm",
  },
  {
    name: "David",
    feedback: "You have a story request.",
    time: "Fri, 12:30pm",
  },
  {
    name: "Eve",
    feedback: "An user joined in app.",
    time: "Fri, 12:30pm",
  },
  {
    name: "Frank",
    feedback: "You have a story request.",
    time: "Fri, 12:30pm",
  },
  {
    name: "Grace",
    feedback: "You have a story request.",
    time: "Fri, 12:30pm",
  },
  {
    name: "Hank",
    feedback: "An user joined in app.",
    time: "Fri, 12:30pm",
  },
  {
    name: "Ivy",
    feedback: "You have a story request.",
    time: "Fri, 12:30pm",
  },
  {
    name: "Jack",
    feedback: "You have a story request.",
    time: "Fri, 12:30pm",
  },
];

const Notifications = () => {
  const navigate = useNavigate();
  // const [profileModalOpen, setProfileModalOpen] = useState(false);

  // const onView = () => {
  //   console.log("On View Function");
  //   setProfileModalOpen(true);
  // };

  // const onDelete = () => {
  //   console.log("Clicked On Delete");
  // };

  const goBack = () => {
    navigate(-1); // Navigate to the previous route
  };

  return (
    <div className="h-screen bg-white">
      <div className="mx-auto w-full rounded-full">
        <div className="flex items-center mb-4 h-20 px-8 text-2xl bg-[#013564]">
          <LeftOutlined
            className="text-white text-lg mr-4 font-bold cursor-pointer"
            onClick={goBack}
          />
          <h2 className="text-white text-xl font-semibold">
            All Notifications
          </h2>
        </div>
        <div className=" rounded-lg p-4">
          <div className="bg-white p-4 rounded-lg">
            {data.map((notification, index) => (
              <div key={index} className="flex items-start gap-4 mb-4">
                <BellOutlined
                  style={{
                    color: "#013564",
                    background: "#B1D7FA",
                    padding: "8px",
                    fontSize: "20px",
                    // borderRadius: "50%",
                  }}
                />
                <div className="flex-1">
                  <p className="text-black text-base">
                    {notification.feedback}
                  </p>
                  <p className="text-gray-400 text-sm">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
