import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { DeleteOutlined, LeftOutlined } from "@ant-design/icons";
import user from "./../../../public/images/storyLogo/user.svg";
import rank from "./../../../public/images/storyLogo/rank.svg";
import institute from "./../../../public/images/storyLogo/institute.svg";
import date from "./../../../public/images/storyLogo/date.svg";

export default function StoryDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const story = location.state;
  console.log(story);

  if (!story) {
    navigate(-1);
    return null;
  }

  const showDeleteModal = () => {
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    console.log("Story deleted:", story);

    // After deletion, close the modal and navigate back to the stories list
    setIsModalVisible(false);
    navigate("/all-stories");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="bg-white rounded-lg w-full">
      <div className="flex items-center gap-3 bg-[#013564] h-12 text-white text-xl font-semibold px-3 rounded-t-lg">
        <p className="cursor-pointer" onClick={() => navigate("/all-stories")}>
          <LeftOutlined />
        </p>
        <p>Story Details</p>
      </div>
      <div className="p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#3598F1] mb-1">
              {story.storyTitle}
            </h1>
            <p className="text-lg font-medium text-gray-500 mb-4">
              By <span className="font-bold text-black">{story.author}</span>
            </p>
          </div>
          <Button
            className="bg-[#013564] text-white px-4 py-4 rounded-lg"
            icon={<DeleteOutlined />}
            onClick={showDeleteModal}
          >
            Delete Story
          </Button>
        </div>
        {/* Images Section */}
        <div className="flex gap-4 mb-6">
          {story?.images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Story image ${index + 1}`}
                className="w-32 h-32 rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
        <div>
          <p className="text-2xl font-bold mb-3">{story.storyHeader}</p>
          <div className="flex items-center">
            <div className="mr-4">
              <div className="flex items-center gap-2">
                <img src={user} alt="" className="h-4 w-4" />
                <p className="font-medium">{story.hero}</p>
              </div>
              <div className="flex items-center gap-2">
                <img src={rank} alt="" className="h-4 w-4" />
                <p className="text-gray-500">{story.profession}</p>
              </div>
              <div className="flex items-center gap-2">
                <img src={institute} alt="" className="h-4 w-4" />
                <p className="text-gray-500">{story.professionalInstitute}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img src={date} alt="" className="h-4 w-4" />
            <p className="text-gray-500">
              {story.dateOfBirth} To {story.dateOfDeath}
            </p>
          </div>
        </div>
        <p className="mt-4 text-lg text-gray-500">{story.storyDetails}</p>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{
          style: {
            backgroundColor: "#013564",
            borderColor: "#013564",
            color: "white",
          },
        }}
        cancelButtonProps={{
          style: {
            backgroundColor: "#c1c1c1",
            borderColor: "#c1c1c1",
            color: "black",
          },
        }}
      >
        <p className="text-lg font-bold">Do you want to delete this story?</p>
      </Modal>
    </div>
  );
}
