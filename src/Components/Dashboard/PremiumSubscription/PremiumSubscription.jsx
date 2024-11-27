
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { ConfigProvider,  Table, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import subcriptionIcon from "../../../../public/images/dashboard-logo/subscriberIcon.svg"

const PremiumSubscription = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [placement, setPlacement] = useState(''); // Consider defaulting this to a known value or leave it as an empty string

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/subscriptionUser.json");
        setData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on search text
  const filteredData = useMemo(() => {
    if (!searchText) return data;
    return data.filter((item) => item.productName.toLowerCase().includes(searchText.toLowerCase()));
  }, [data, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };


 
  return (
    <div>
      <div className="flex justify-between p-6 bg-[#D3E6F9] rounded">
        <h1 className="text-3xl font-bold text-black">Premium Subscription Users Lists</h1>
        <div className="flex gap-4 items-center">
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  colorTextPlaceholder: "rgb(0, 0, 0,0.5)",
                  colorBgContainer: "white",
                },
              },
            }}
          >
            <Input
              placeholder="Search..."
              value={searchText}
              onChange={(e) => onSearch(e.target.value)}
              className="text-base font-semibold"
              prefix={<SearchOutlined className="text-[#97C6EA] font-bold text-lg mr-2" />}
              style={{
                width: 280,
                padding: "8px 16px",
                backgroundColor: "#F3F3F3",
                border: "1px solid white",
                color: "#010515",
              }}
            />
          </ConfigProvider>
        </div>
      </div>

      {/* Data table */}
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#F3F3F3",
              headerColor: "black",
              colorBgContainer: "rgb(255,255,255)",
              colorText: "rgb(0,0,0)",
              headerSplitColor: "rgba(151, 198, 234, 1)",
            },
          },
        }}
      >
        <div className="w-full overflow-x-auto border-2 border-none ">
          <Table
            columns={[
              {
                title: "S.ID",
                dataIndex: "index",
                render: (text, record, index) => <span>{index + 1}</span>,
                responsive: ["md"],
              },
              {
                title: "User Name",
                dataIndex: "name",
                responsive: ["sm"],
              },
              {
                title: "Subscription Date",
                dataIndex: "subscriptionDate",
                responsive: ["md"],
              },
              {
                title: "Subscription Expairdate",
                dataIndex: "expairDate",
                responsive: ["sm"],
              },
              {
                title: "Status",
                dataIndex: "status",  // Accessing the correct key
                render: (text) => (
                  <>
                    {text === "true" && ( // Check if the status is true
                      <>
                        <img
                          src="/images/dashboard-logo/subscriberIcon.svg" // Directly referencing the image in the public folder
                          alt="status icon"
                          className="inline-block w-6 h-6 mr-2"
                        />
                      </>
                    )}
                  </>
                ),
                responsive: ["sm"],
              }
              
            ]}
            dataSource={filteredData}
            loading={loading}
            pagination={{ pageSize: 4 }}
            className="user-table"
            scroll={{ x: true }}
          />
        </div>
      </ConfigProvider>
    </div>
  );
};

export default PremiumSubscription;
