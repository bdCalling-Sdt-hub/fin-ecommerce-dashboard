import UserTable from "../Tables/UserTable";
import { NavLink } from "react-router-dom";
import { ConfigProvider, Select } from "antd";
import Area_Chart from "../Chart/AreaChat";
import Bar_Chart from "../Chart/Bar_Chart";
import {  useState } from "react";




const Dashboard = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [earningYear, setEarningYear] = useState(new Date().getFullYear());

  const handleChange = (value)=>{
    setYear(value);


  }

  const earningHandleChange = (value)=>{
    setEarningYear(value);


  }

  console.log('========yerar', year);
  

  // if (error) {
  //   return <div>Error loading tasks: {error.message}</div>;
  // }

  return (
    <div className="w-full p-5 ">
      {/* Overview Section */}
      <div>
      <div>
        <div className="flex items-center gap-10">
          <div
            className="w-full p-3 bg-[#FFFFFF] flex flex-col"
            style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
          >
            <div className="flex justify-between text-base-color mt-4">
              <div>
                <p className="text-lg sm:text-xl font-bold mb-4">Total User</p>
              </div>
              <div>
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        fontSize: 18,
                        colorBorder: "#222222",
                        optionSelectedBg: "rgb(254,188,96)",
                        optionActiveBg: "rgb(255,217,165)",
                      },
                    },
                  }}
                >
                  <Select
                    defaultValue="2025"
                    style={{ width: 100 }}
                    onChange={handleChange}
                    options={[
                      { value: "2025", label: "2025" },
                      { value: "2026", label: "2026" },
                      { value: "2027", label: "2027" },
                      { value: "2028", label: "2028" },
                    ]}
                  />
                </ConfigProvider>
              </div>
            </div>
            <hr />
            <div className="">
              <Area_Chart year={year} />
            </div>
          </div>{" "}
          {/* Bar Chart */}
          <div className="w-full px-3 bg-[#FDFDFD] flex flex-col shadow-[0px_0px_6px_#00000026]">
            <div className="flex justify-between text-black mt-4 ">
              <p className="text-2xl sm:text-3xl mb-8">Total Earnings</p>
              <div>
                <ConfigProvider
                  theme={{
                    components: {
                      Select: {
                        // selectorBg: "rgba(249, 248, 248, 0.01)",
                        // colorText: "",
                        // colorTextQuaternary: "rgb(225, 225, 225)",
                        // colorBgElevated: "rgb(29, 29, 29)",
                        // optionSelectedBg: "rgba(83, 81, 81, 0.95)",
                        // colorTextPlaceholder: "rgb(156, 156, 156)",
                        fontSize: 18,
                        colorBorder: "#222222",
                        optionSelectedBg: "rgb(254,188,96)",
                        optionActiveBg: "rgb(255,217,165)",
                      },
                    },
                  }}
                >
                  <Select
                    defaultValue="2025"
                    style={{ width: 100 }}
                    onChange={earningHandleChange}
                    options={[
                      { value: "2025", label: "2025" },
                      { value: "2026", label: "2026" },
                      { value: "2027", label: "2027" },
                      { value: "2028", label: "2028" },
                    ]}
                  />
                </ConfigProvider>
              </div>
            </div>
            <hr />
            <div>
              <Bar_Chart earningYear={earningYear} />
            </div>
          </div>
        </div>
        <div className="mt-8 text-[#BBB69A] font-semibold tex-2xl">
          <div className="flex justify-between items-center mb-1">
            <p className="text-lg lg:text-xl font-bold text-[#E6C379]">
              Recent users
            </p>
            <NavLink to="/users">
              <p className="text-sm lg:text-base text-[#E6C379] underline font-bold">
                View All
              </p> 
            </NavLink>
          </div>
          {/* <DashboardTable data={data} loading={loading} /> */}
          {/* <DashboardTable data={data} loading={loading}/> */}
          {/* <DashboardTable data={data} loading={loading}/> */}
          <UserTable />
        </div>
      </div>
    </div>
    {/* <div className="flex flex-col lg:flex-row gap-3 mt-5">
        <div className="lg:flex-1">
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg lg:text-xl font-bold text-[#3399ff] mb-1">
              Recent users
            </p>
            <NavLink to="/users">
              <p className="text-sm lg:text-base text-[#3399ff] underline font-bold">
                View All
              </p>
            </NavLink>
          </div>
          <UserTable />
        </div>
      </div> */}
     
    </div>
  );
};

export default Dashboard;
