import React from "react";
import { Card, ConfigProvider, Select } from "antd";
import UserTable from "../Tables/UserTable";
import UserRatioChart from "../Chart/UserRatioChart";
import EarningsPieChart from "../Chart/EarningsPieChart";
import {
  InfoCard,
  TaskOverviewBarChart,
  IncomeLineChart,
} from "../Chart/DashboardChart";

const Dashboard = () => {
  return (
    <div className="w-full p-10">
      {/* Overview Section */}
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col gap-6 mb-10">
          <h1 className="text-3xl font-bold text-blue-900 mb-1">Overview</h1>
          <div className="flex justify-between gap-3">
            <div className="flex flex-col gap-3">
              <InfoCard
                title="Total task"
                value="156"
                color="bg-blue-400 w-64"
              />
              <InfoCard
                title="On going task"
                value="41"
                color="bg-purple-400 w-64"
              />
            </div>
            <div className="flex flex-col gap-3">
              <InfoCard title="Worker" value="28" color="bg-green-400 w-64" />
              <InfoCard
                title="Service provider"
                value="19"
                color="bg-purple-300 w-64"
              />
            </div>
          </div>
        </div>

        {/* Task Overview and Income Section */}
        <div className="rounded-lg p-1">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl font-bold text-blue-900 mb-1">
              Task overview
            </h1>
            <select className="bg-gray-100 px-2 rounded-lg">
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <TaskOverviewBarChart />
        </div>

        {/* Income Card */}
        <div className="bg-[#F5F9FE] rounded-lg px-2 h-[92%]">
          <div className="flex justify-between mb-2">
            <h1 className="text-3xl font-bold text-blue-900 mb-1">Income</h1>
            <select className="bg-gray-100 px-2 rounded-lg">
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <IncomeLineChart />
        </div>
      </div>

      {/* User Ratio Section */}
      <div className="mt-8">
        <div className="w-full px-3 bg-white rounded-lg flex flex-col">
          <div className="flex justify-between text-black mt-4">
            <div>
              <p className="text-2xl sm:text-3xl font-bold">User Ratio</p>
              <div className="my-2">
                <ul className="flex gap-10 ml-8 list-disc">
                  <li className="text-[#013564] text-2xl">
                    <span className="text-xl">Users</span>
                  </li>
                  <li className="text-[#8bc4f7] text-2xl">
                    <span className="text-xl">Stories</span>
                  </li>
                </ul>
              </div>
            </div>
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    selectorBg: "rgb(1,53,100)",
                    colorText: "rgb(225, 225, 225)",
                  },
                },
              }}
            >
              <Select
                defaultValue="2024"
                style={{ width: 80 }}
                options={[
                  { value: "2024", label: "2024" },
                  { value: "2023", label: "2023" },
                  { value: "2022", label: "2022" },
                  { value: "2021", label: "2021" },
                ]}
              />
            </ConfigProvider>
          </div>
          <div className="flex items-center w-full">
            <UserRatioChart />
          </div>
        </div>
      </div>

      {/* Bottom Section (User Table & Earnings Chart) */}
      <div className="flex flex-col lg:flex-row gap-3 mt-5">
        <div className="lg:flex-1">
          <p className="text-xl font-bold text-black mb-1">Recent users</p>
          <UserTable />
        </div>
        <div>
          <p className="text-xl font-bold text-black mb-1">Earning Chart</p>
          <div className="flex flex-col items-center justify-center">
            <ConfigProvider
              theme={{
                components: {
                  Card: {
                    headerBg: "rgb(1,53,100)",
                    colorTextHeading: "rgb(253,253,253)",
                  },
                },
              }}
            >
              <Card
                title="Comparing With Previous Month"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "2px solid #013564",
                  borderRadius: "12px",
                }}
              >
                <EarningsPieChart />
                <div className="flex lg:flex-col xl:flex-row items-center justify-between mx-6 gap-7">
                  <div>
                    <p className="text-lg">Earning</p>
                    <p className="text-2xl font-bold">$ 3500.55</p>
                  </div>
                  <div>
                    <p className="text-base text-[#28C66F]">62%</p>
                    <p className="text-sm text-[#656565]">
                      More than Last Month
                    </p>
                  </div>
                </div>
              </Card>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
