/* eslint-disable react/prop-types */
import { Button, ConfigProvider, Table } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";

const DashboardTable = ({ data, loading, pageSize = 0 }) => {
  const columns = [
    {
      title: "SL. ",
      dataIndex: "id",
      key: "id",
      responsive: ["md"],
    },

    {
      title: "Acount",
      dataIndex: "acount",
      key: "acount ",
    },

    {
      title: "Country/Region",
      dataIndex: "country",
      key: "country ",
    },

    {
      title: "Product Purchase",
      dataIndex: "product",
      key: "product",
    },

    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      render: (_, record) => (
        <Button
          onClick={() => handleDelete(record.key)}
          style={{
            border: "none",
            background: "transparent",
            boxShadow: "none",
          }}
        >
          <RiDeleteBin6Line />
        </Button>
      ),
    },
  ];
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              cellFontSize: 17,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={pageSize > 0 ? { pageSize } : false}
          rowKey="id"
          scroll={{ x: true }}
        />
      </ConfigProvider>
    </div>
  );
};

export default DashboardTable;