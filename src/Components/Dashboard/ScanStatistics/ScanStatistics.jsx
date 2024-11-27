import React, { useState } from "react";
import { SearchOutlined, QrcodeOutlined } from "@ant-design/icons";
import { Table, Input, Button, ConfigProvider } from "antd";

const ScanStatistics = () => {
  const [searchText, setSearchText] = useState("");

  const qrCodes = [
    {
      id: "S15524",
      url: "scanici.com/s15524",
      scans: 25554,
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=S15524",
    },
    {
      id: "S15525",
      url: "scanici.com/s15525",
      scans: 12554,
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=S15525",
    },
    {
      id: "S15526",
      url: "scanici.com/s15526",
      scans: 50554,
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=S15526",
    },
  ];

  // Filter data based on search text
  const filteredQrCodes = qrCodes.filter((qrCode) =>
    qrCode.url.toLowerCase().includes(searchText.toLowerCase())
  );

  // Columns for Ant Design Table
  const columns = [
    {
      title: "QR Code",
      dataIndex: "qrCode",
      key: "qrCode",
      render: (qrCode) => (
        <div><img
        src={qrCode}
        alt="QR Code"
        className="w-26 h-24"
      />
      <Button className="text-blue-500 border border-blue-500 mt-1">
        Télécharger
      </Button></div>
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Page Web",
      dataIndex: "url",
      key: "url",
      render: (url) => <a href={`https://${url}`} className="text-blue-500">{url}</a>,
    },
    {
      title: "Number of Scans",
      dataIndex: "scans",
      key: "scans",
      render: (scans) => (
        <span className="text-blue-500 font-bold text-lg">{scans}</span>
      ),
    },
    
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header with QR Code Icon */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold flex items-center">
          <QrcodeOutlined className="mr-2" /> 1255888
        </h1>
        <div className="relative">
          <Input
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined className="text-gray-400" />}
            className="w-full"
          />
        </div>
      </div>

      {/* Ant Design Table */}
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#fff",
              colorBgContainer: "#fff",
              colorText: "rgb(0,0,0)",
              borderColor: "rgb(73,72,72)",
              headerColor: "#013564",
              footerBg: "#fff",
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={filteredQrCodes}
          rowKey="id"
          pagination={{ pageSize: 4 }}
          style={{ backgroundColor: "#fff" }} // Ensure white background for the table
        />
      </ConfigProvider>
    </div>
  );
};

export default ScanStatistics;
