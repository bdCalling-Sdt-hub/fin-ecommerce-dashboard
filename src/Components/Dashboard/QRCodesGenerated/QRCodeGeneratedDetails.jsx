import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import { SearchOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGeneratedDetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [searchText, setSearchText] = useState('');
  const [url, setUrl] = useState('');
  const [selectedItems, setSelectedItems] = useState([]); // State to track selected items

  const qrCodes = [
    {
        id: 'S15524',
        url: 'scanici.com/s15524',
        date: '13 / 05 / 2024',
        status: 'active', // Use 'active' or 'inactive'
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=S15524',
      },
      {
        id: 'S15525',
        url: 'scanici.com/s15525',
        date: '13 / 05 / 2024',
        status: 'inactive',
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=S15525',
      },
      {
        id: 'S15526',
        url: 'scanici.com/s15526',
        date: '13 / 05 / 2024',
        status: 'inactive',
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=S15526',
      },
      {
        id: 'S15527',
        url: 'scanici.com/s15527',
        date: '13 / 05 / 2024',
        status: 'active',
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=S15527',
      },
    // Add more items...
  ];

  // Handle modal visibility
  const showModal = () => {
    setIsModalVisible(true);
  };

  const generateQRCode = () => {
    const qrData = {
      id: `S${Math.floor(Math.random() * 100000)}`,
      url: `scanici.com/s${Math.floor(Math.random() * 100000)}`,
      date: new Date().toLocaleDateString(),
      status: 'active',
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=S${Math.floor(Math.random() * 100000)}`,
    };
    console.log('Generated QR Code:', qrData);
    setIsModalVisible(false);
    setUrl('');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setUrl('');
  };

  // Handle item selection
  const handleSelectItem = (id) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((item) => item !== id)
        : [...prevSelectedItems, id]
    );
  };

  const isItemSelected = (id) => selectedItems.includes(id);

  // Handle 'Select All' functionality
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(qrCodes.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">
          Available (85075) <span className="mx-4">|</span> Assigned (4451)
        </div>
        <button onClick={showModal} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Generate a QR code
        </button>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
        <div>
          <input
            type="checkbox"
            className="mr-2"
            onChange={handleSelectAll}
            checked={selectedItems.length === qrCodes.length}
          />
          <span className="mr-4">Select all</span>
          <button
            className={`bg-gray-300  px-3 py-1 rounded-lg mr-2 ${
              selectedItems.length ? 'cursor-pointer bg-[#e13f3f] text-white' : 'cursor-not-allowed'
            }`}
            disabled={!selectedItems.length}
          >
            DELETE
          </button>
          <button
            className={`bg-gray-300  px-3 py-1 rounded-lg ${
              selectedItems.length ? 'cursor-pointer bg-[#3399ff] text-white' : 'cursor-not-allowed'
            }`}
            disabled={!selectedItems.length}
          >
            Download
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 pl-8 w-full"
          />
          <SearchOutlined className="absolute top-2 left-2 text-gray-400" />
        </div>
      </div>

      {/* QR Code List */}
      <div className="bg-white p-4 mt-4 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-10">
        {qrCodes.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b border-gray-200 py-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-4"
                checked={isItemSelected(item.id)}
                onChange={() => handleSelectItem(item.id)}
              />
              <div>
                <a  className="text-blue-500 font-semibold">{item.id}</a><br />
                <img src={item.qrCode} alt="QR Code" className="w-16 h-16 inline-block" />
              </div>
            </div>
            <div className="flex items-center">
              {item.status === 'active' ? (
                <span className="bg-green-500 rounded-full w-3 h-3 inline-block mr-2"></span>
              ) : (
                <span className="bg-red-500 rounded-full w-3 h-3 inline-block mr-2"></span>
              )}
              <a href={`https://${item.url}`} className="text-gray-500">{item.url}</a>
            </div>
            <div className="text-gray-500">{item.date}</div>
          </div>
        ))}
      </div>

      {/* Modal for QR Code Generation */}
      <Modal
        title={<span className="text-blue-500">Generate QR Code</span>}
        visible={isModalVisible}
        onOk={generateQRCode}
        onCancel={handleCancel}
        footer={null}
        className="rounded-lg"
      >
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          />
          <div className="flex justify-center mb-4">
            {/* Display the QR code */}
            {url && <QRCodeCanvas value={url} size={100} />}
          </div>
          <div className="flex justify-between">
            <Button
              className="bg-white border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-2 rounded-lg"
              icon={<ArrowDownOutlined />}
            >
              Generate and download
            </Button>
            <Button className="border-blue-500 text-blue-500 hover:bg-blue-500 px-6 py-2 rounded-lg" onClick={generateQRCode}>
              Generate only
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QRCodeGeneratedDetails;
