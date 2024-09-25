import React, { useEffect, useState, useMemo } from "react";
import { Button, ConfigProvider, Space, Table, Tooltip, Modal } from "antd";
import { BuildOutlined, EyeOutlined } from "@ant-design/icons";
import Column from "antd/es/table/Column";
import axios from "axios";

const Earnings = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [earningData, setEarningData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarningData = async () => {
      try {
        const response = await axios.get("/data/earningData.json");
        console.log("all earnings==>", response); // Replace with your actual API endpoint
        const data = Array.isArray(response.data) ? response.data : [];
        console.log("Fetched Data:", data);
        setEarningData(data);
      } catch (error) {
        console.error("Error fetching earnings data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarningData();
  }, []);
  {
    console.log(earningData);
  }
  // Memoize the total earnings to avoid recalculating on every render
  const totalEarnings = useMemo(() => {
    return earningData.reduce((acc, item) => acc + item.amount, 0);
  }, [earningData]);

  const onView = (record) => {
    setSelectedRow(record);
    setProfileModalOpen(true);
  };

  const handleModalClose = () => {
    setProfileModalOpen(false);
    setSelectedRow(null);
  };

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="rounded-lg ">
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "white",
            },
          },
        }}
      >
        <Modal
          title={
            <div
              style={{
                textAlign: "center",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#013564",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              User payment details
            </div>
          }
          open={profileModalOpen}
          onCancel={handleModalClose}
          footer={null}
          centered
          width={350}
        >
          {selectedRow && (
            <div className="flex items-center gap-3">
              <img
                src={selectedRow.avatar}
                alt="User Avatar"
                className="w-20 h-20"
              />
              <h2 className="text-lg font-bold">{selectedRow.name}</h2>
            </div>
          )}
          {selectedRow && (
            <div className="mt-4">
              <h3 className="text-[#013564] font-bold mb-2">Information</h3>
              <p>
                <strong>Serial ID: </strong> #{selectedRow.serialId}
              </p>
              <p>
                <strong>Email: </strong> {selectedRow.email}
              </p>
              <p>
                <strong>User Bank Account: </strong>
                {selectedRow.accountNumber}
              </p>
              <p>
                <strong>Time & Date: </strong>
                {formatDate(selectedRow.timeAndDate)}
              </p>
              <p>
                <strong>Amount: </strong> ${selectedRow.amount}
              </p>
              <p>
                <strong>Payment Method: </strong>
                {selectedRow.paymentMethod}
              </p>
            </div>
          )}
        </Modal>
      </ConfigProvider>
      <div className="mx-auto bg-white shadow-md rounded-lg">
        <div className="flex p-6 gap-4 items-center">
          <h1 className="text-2xl font-bold text-[#013564]">Earnings</h1>
          <div className="flex items-center gap-2 text-white py-2 px-4 bg-[#013564] rounded-lg">
            <p>
              <BuildOutlined />
            </p>
            <p className="text-base">Today's Earning</p>
            <p className="font-bold text-xl">$3230</p>
          </div>
          <div className="flex gap-2 items-center text-white py-2 px-4 bg-[#013564] rounded-lg">
            <p>
              <BuildOutlined />
            </p>
            <p className="text-base">All Earnings</p>
            <p className="font-bold text-xl">${totalEarnings.toFixed(2)}</p>
          </div>
        </div>
        <hr />
        <div className="mx-auto shadow-md rounded-lg">
          <ConfigProvider
            theme={{
              components: {
                Pagination: {
                  colorText: "rgb(255, 255, 255)",
                },
                Table: {
                  headerBg: "rgb(255,255,255)",
                  colorBgContainer: "rgb(255,255,255)",
                  colorText: "rgb(0,0,0)",
                  headerColor: "#013564",
                  footerBg: "rgb(255,255,255)",
                  borderRadius: 20,
                },
              },
            }}
          >
            <Table
              dataSource={earningData && earningData}
              pagination={{ pageSize: 5 }}
              loading={loading}
              rowKey="serialId"
            >
              <Column title="Serial" dataIndex="serialId" key="serial" />
              <Column
                title="Account Number"
                dataIndex="accountNumber"
                key="accNumber"
              />
              <Column
                title="Package Name"
                dataIndex="packageName"
                key="packageName"
              />
              <Column
                title="Time & Date"
                dataIndex="timeAndDate"
                key="date"
                render={(text) => formatDate(text)}
              />
              <Column
                title="Amount"
                dataIndex="amount"
                key="amount"
                render={(text) => `$${text}`} // Adding dollar sign here
              />
              <Column
                title="Action"
                key="action"
                render={(_, record) => (
                  <Space size="middle">
                    <Tooltip placement="left" title="View Details">
                      <Button
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#013564",
                        }}
                        onClick={() => onView(record)}
                      >
                        <EyeOutlined style={{ fontSize: "24px" }} />
                      </Button>
                    </Tooltip>
                  </Space>
                )}
              />
            </Table>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
