import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Modal } from "antd";
import { DeleteOutlined, LeftOutlined } from "@ant-design/icons";
import userIcon from "./../../../public/images/storyLogo/user.svg";
import rankIcon from "./../../../public/images/storyLogo/rank.svg";
import instituteIcon from "./../../../public/images/storyLogo/institute.svg";
import dateIcon from "./../../../public/images/storyLogo/date.svg";

export default function StoryReqDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false); // State to track acceptance
  const [isRevisionModalVisible, setIsRevisionModalVisible] = useState(false); // State for revision modal

  const story = location.state;

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
    navigate("/story-request");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAccept = () => {
    setIsAccepted(true); // Set acceptance state to true, hiding dynamic part
  };

  const handleRevision = () => {
    setIsRevisionModalVisible(true); // Show the revision modal
  };

  const handleRevisionOk = () => {
    // Logic for handling revision submission can be added here
    setIsRevisionModalVisible(false);
  };

  const handleRevisionCancel = () => {
    setIsRevisionModalVisible(false);
  };

  return (
    <div className="bg-white rounded-lg w-full">
      <div className="flex items-center gap-3 bg-[#013564] h-12 text-white text-xl font-semibold px-3 rounded-t-lg">
        <p
          className="cursor-pointer"
          onClick={() => navigate("/story-request")}
        >
          <LeftOutlined />
        </p>
        <p>Story Details</p>
      </div>

      {/* Conditionally render the dynamic part only if the story is not accepted */}
      {!isAccepted && (
        <div className="px-6 py-2">
          <div>
            <p className="text-xl font-bold text-[#013564]">
              {story.storyTitle}
            </p>
            <p className="text-gray-600">{story.author}</p>
          </div>
          <div className="mt-4">
            <Button
              className={`px-5 py-1 rounded-lg mr-2 border ${
                isAccepted
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-[#013564] text-white border-[#013564]"
              }`}
              onClick={handleAccept}
            >
              {isAccepted ? "Accepted" : "Accept"}
            </Button>
            <Button
              className="bg-white text-[#013564] px-5 py-1 rounded-lg border border-[#013564]"
              onClick={handleRevision}
            >
              Revision
            </Button>
          </div>
        </div>
      )}

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
          {!isAccepted && (
            <Button
              className="bg-[#013564] text-white px-4 py-4 rounded-lg"
              icon={<DeleteOutlined />}
              onClick={showDeleteModal}
            >
              Delete Story Request
            </Button>
          )}
        </div>

        {/* Images Section */}
        {story.images && story.images.length > 0 && (
          <div className="flex gap-4 mb-6">
            {story.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Story image ${index + 1}`}
                  className="w-32 h-32 rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div>
          <p className="text-2xl font-bold mb-3">{story.storyHeader}</p>
          <div className="flex items-center mb-3">
            <div className="mr-4">
              <div className="flex items-center gap-2">
                <img src={userIcon} alt="User" className="h-4 w-4" />
                <p className="font-medium">{story.hero || "Unknown Hero"}</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <img src={rankIcon} alt="Rank" className="h-4 w-4" />
                <p className="text-gray-500">
                  {story.profession || "Unknown Profession"}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <img src={instituteIcon} alt="Institute" className="h-4 w-4" />
                <p className="text-gray-500">
                  {story.professionalInstitute || "Unknown Institute"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <img src={dateIcon} alt="Date" className="h-4 w-4" />
            <p className="text-gray-500">
              {story.dateOfBirth || "Unknown DOB"} To{" "}
              {story.dateOfDeath || "Unknown DOD"}
            </p>
          </div>
        </div>

        <p className="mt-4 text-lg text-gray-500">
          {story.storyDetails || "No additional details provided."}
        </p>
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
        <p className="text-lg font-bold">
          Do you want to delete this story request?
        </p>
      </Modal>

      {/* Revision Modal */}
      <Modal
        width={400}
        open={isRevisionModalVisible}
        onOk={handleRevisionOk}
        onCancel={handleRevisionCancel}
        footer={false}
      >
        <p className="text-center font-medium text-2xl mb-2">
          Reason for Revision
        </p>

        <Input.TextArea
          rows={4}
          placeholder="Enter your revision comments here..."
          className="border border-[#013564]"
        />

        <div className="flex justify-center gap-2 mt-4">
          <Button
            onClick={handleRevisionCancel}
            style={{
              backgroundColor: "#f5f5f5",
              borderColor: "#d9d9d9",
              color: "#000",
              width: "100%",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRevisionOk}
            style={{
              backgroundColor: "#013564",
              borderColor: "#013564",
              color: "#fff",
              width: "100%",
            }}
          >
            Submit Revision
          </Button>
        </div>
      </Modal>
    </div>
  );
}
