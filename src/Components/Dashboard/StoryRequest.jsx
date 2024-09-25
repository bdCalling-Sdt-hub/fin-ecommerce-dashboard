import { SearchOutlined } from "@ant-design/icons";
import { ConfigProvider, Input, Button, Modal } from "antd";
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const StoryRequest = () => {
  const [searchText, setSearchText] = useState("");
  const [requests, setRequests] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("/data/storyData.json");
        console.log("first ===>", response);
        const data = Array.isArray(response.data) ? response.data : [];
        console.log("Fetched Data:", data);
        const updatedRequests = data.map((request) => ({
          ...request,
          accepted: false,
        }));
        console.log("second==>", updatedRequests);
        setRequests(updatedRequests);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRequests();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return requests;
    return requests.filter(
      (item) =>
        item.author.toLowerCase().includes(searchText.toLowerCase()) ||
        item.storyTitle.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [requests, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const handleAccept = (key) => {
    const updatedRequests = requests.map((request) =>
      request.key === key ? { ...request, accepted: true } : request
    );
    setRequests(updatedRequests);
  };

  const handleRevision = (request) => {
    setCurrentRequest(request);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            hoverBg: "#b1d7fa",
            hoverBorderColor: "rgb(39,136,255)",
            colorText: "rgb(255,255,255)",
            colorTextPlaceholder: "rgba(100,99,99,0.25)",
          },
        },
      }}
    >
      <div>
        <div className="bg-[#013564] text-white p-4 rounded-t-lg flex justify-between items-center">
          <h1 className="text-2xl font-bold">Story Request</h1>
          <div className="flex items-center">
            <Input
              placeholder="Search Here"
              prefix={<SearchOutlined className="text-[#013564]" />}
              className="w-72 rounded-lg"
              value={searchText}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-b-lg py-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.map((request, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <Link
                  to={`/story-request-details/${request.key}`}
                  state={request}
                  className="text-xl font-bold text-[#013564]"
                >
                  {request.storyTitle}
                </Link>
                <p className="text-gray-600">{request.author}</p>
                <div className="mt-4">
                  <Button
                    className={`px-5 py-1 rounded-lg mr-2 border ${
                      request.accepted
                        ? "bg-green-600 font-bold text-white border-green-600"
                        : "bg-[#013564] text-white border-[#013564]"
                    }`}
                    onClick={() => handleAccept(request.key)}
                    // disabled={request.accepted}
                  >
                    {request.accepted ? "Accepted" : "Accept"}
                  </Button>
                  <Button
                    className="bg-white text-[#013564] px-5 py-1 rounded-lg border border-[#013564]"
                    onClick={() => handleRevision(request)}
                  >
                    Revision
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Modal
          width={400}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          footer={null}
        >
          <p className="text-center font-medium text-2xl mb-2">
            Reason for Revision
          </p>

          <Input.TextArea
            rows={4}
            placeholder="Enter your revision comments here..."
            className="border border-[#013564] text-black"
          />
          <div className="flex justify-center gap-2 mt-4">
            <Button
              onClick={handleModalCancel}
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
              onClick={handleModalOk}
              style={{
                backgroundColor: "#013564",
                borderColor: "#013564",
                color: "#fff",
                width: "100%",
              }}
            >
              Revision
            </Button>
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default StoryRequest;
