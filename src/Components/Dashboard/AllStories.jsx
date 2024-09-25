import React, { useEffect, useMemo, useState } from "react";
import { Input, Button, Table, ConfigProvider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AllStories = () => {
  const [searchText, setSearchText] = useState("");
  const [storyData, setStoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("/data/storyData.json");
        console.log("all stories ===> ", response);
        const data = Array.isArray(response.data) ? response.data : [];
        console.log("Fetched Data:", data); // Log the data format
        setStoryData(data);
      } catch (error) {
        console.error("Error fetching stories data:", error);
        setStoryData([]); // Set to empty array if fetching fails
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return storyData;
    return storyData.filter(
      (item) =>
        item.author.toLowerCase().includes(searchText.toLowerCase()) ||
        item.storyTitle.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [storyData, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const columns = [
    {
      title: "S.ID",
      dataIndex: "serialId",
      key: "sid",
    },
    {
      title: "Full Name",
      dataIndex: "author",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Story Title",
      dataIndex: "storyTitle",
      key: "storyTitle",
    },
    {
      title: "Uploaded Date",
      dataIndex: "uploadedDate",
      key: "uploadedDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          className="bg-white text-[#013564] font-semibold border-[#013564]"
          onClick={() =>
            navigate(`/story-details/${record.serialId}`, { state: record })
          }
        >
          Details
        </Button>
      ),
    },
  ];

  return (
    <div className="">
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "rgb(255,255,255)",
              colorBgContainer: "rgb(255,255,255)",
              colorText: "rgb(0,0,0)",
              headerColor: "rgb(1,53,100)",
              borderColor: "rgb(1,53,100)",
            },
            Input: {
              hoverBg: "#b1d7fa",
              hoverBorderColor: "rgb(39,136,255)",
              colorText: "rgb(255,255,255)",
              colorTextPlaceholder: "rgba(100,99,99,0.25)",
            },
          },
        }}
      >
        <div className="bg-[#013564] text-white p-4 rounded-t-lg flex justify-between items-center">
          <h1 className="text-2xl font-bold">All Stories</h1>
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
        <div className="bg-white shadow-md">
          <Table
            dataSource={Array.isArray(filteredData) ? filteredData : []}
            loading={loading}
            columns={columns}
            pagination={{ pageSize: 8 }}
            rowKey="serialId"
          />
        </div>
      </ConfigProvider>
    </div>

    // <>
    //   <h1>hello</h1>
    // </>
  );
};

export default AllStories;
