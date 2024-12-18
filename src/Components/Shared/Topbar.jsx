/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BarsOutlined, BellOutlined } from "@ant-design/icons";
import { Badge, Button, ConfigProvider, Dropdown, Grid, Input } from "antd";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useState, useEffect } from "react";
// import profileImg from "../../../public/images/profile.svg";
import profileImg from "../../../public/images/user.svg";
// import { useGetNotificationsQuery } from "../../Redux/api/dashboardApi";
import { CiSearch } from "react-icons/ci";

const { useBreakpoint } = Grid;




const Topbar = ({ collapsed, setCollapsed }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for navigation
  // Use Ant Design's Grid system to get breakpoints
  const screens = useBreakpoint();

  // Fetch notifications from the API
  // const { data: notificationApiData } = useGetNotificationsQuery();
  // const notifications = notificationApiData?.data || []; 
  // const notificationCount = notifications.length;

  // console.log(notifications);
  const notifications = [
    {
      "message": "Hello, how are you?",
      "time": "2024-06-17T09:00:00Z"
    },
    {
      "message": "Meeting at 3 PM today.",
      "time": "2024-06-17T10:30:00Z"
    },
    {
      "message": "Don't forget to submit the report.",
      "time": "2024-06-17T11:45:00Z"
    },
    {
      "message": "Lunch break at 1 PM.",
      "time": "2024-06-17T12:00:00Z"
    },
    {
      "message": "Team call rescheduled to 5 PM.",
      "time": "2024-06-17T13:15:00Z"
    }
  ]
const notificationCount = notifications.length;
//  const notifications = notificationApiData?.data || []; 
  // Function to handle responsive collapse based on screen size
  useEffect(() => {
    if (screens.lg || screens.xl) {
      // On large screens, expand the sidebar
      setCollapsed(false);
    } else {
      // On medium or smaller screens, collapse the sidebar
      setCollapsed(true);
    }
  }, [screens, setCollapsed]);

  const handleMenuClick = () => {
    setNotificationCount(0); // Reset notification count when the menu is clicked
  };

  const handleDropdownVisibleChange = (visible) => {
    setDropdownVisible(visible);
  };

  const loadNotifications = () => {
    setDropdownVisible(false); // Close the dropdown
    navigate("/notifications"); // Navigate to the notifications route
  };

  const notificationMenu = (
    <div
      className="flex flex-col gap-4 w-96 text-center bg-white p-4 rounded-lg"
      onClick={handleMenuClick}
    >
      <div className="my-2">
        <p className="text-2xl font-bold text-[#E6C379]">Notifications</p>
        <hr className="bg-black h-0.5 my-2" />
      </div>
      {notifications.map((notification) => (
        <div className="text-start" key={notification.id}>
          <div className="flex gap-2 md:w-2/3">
            <BellOutlined
              style={{
                color: "#013564",
                background: "#E6C379",
                padding: "0 5px",
                fontSize: "20px",
                borderRadius: "5px",
              }}
            />
            <div className="flex flex-col items-start w-full">
              <p className="w-full">{notification.message}</p>
              <p className="text-gray-400">{notification.time}</p>
            </div>
          </div>
        </div>
      ))}
      <Button
        onClick={loadNotifications}
        style={{ background: "#E6C379", color: "white" }}
        className="w-2/3 mx-auto text-center bg-[#E6C379] text-white rounded-xl h-10 py-2 font-semibold"
      >
        Load More
      </Button>
    </div>
  );

  return (
    <div className="">
      {isDropdownVisible && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setDropdownVisible(false)} // Close dropdown when clicking outside
        ></div>
      )}
      <div
        className={`mx-[-50px] flex justify-between items-center relative z-50 ${
          isDropdownVisible ? "bg-gray-400 opacity-75" : "bg-[#EBEBEB]"
        }`}
      >
        <div className="flex items-center gap-2 text-white ml-4">
          <p>
            <BarsOutlined
              onClick={() => setCollapsed(!collapsed)}
              className="text-3xl text-black font-semibold"
            />
          </p>
          <h2 className="text-black text-2xl font-semibold ml-5">Dashboard Overview</h2>
        </div>
        <div className="flex items-center justify-center gap-3 mr-5">
          {/* notification */}
          <div className="border border-[#E6C379] rounded-full px-2 py-2 h-10 flex cursor-pointer">
            <ConfigProvider
              theme={{
                components: {
                  Badge: {
                    colorError: "#E6C379",
                  },
                },
              }}
            >
              <Dropdown
                overlay={notificationMenu}
                trigger={["click"]}
                placement="bottomRight"
                onOpenChange={handleDropdownVisibleChange}
                open={isDropdownVisible} // Control visibility explicitly
              >
                <Badge count={notificationCount} size="small">
                  <BellOutlined
                    shape="circle"
                    size="small"
                    className="text-lg font-bold text-[#E6C379]"
                  />
                </Badge>
              </Dropdown>
            </ConfigProvider>
          </div> 

          <Link
            to="profile"
            className="flex items-center justify-center text-center gap-2 bg-transparent border rounded-full border-[#E6C379] p-2 mr-5"
          >
            <img
              src={profileImg}
              alt="profile_pic"
              style={{ width: "20px", height: "20px", color: "black" }}
              className="rounded text-black"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
