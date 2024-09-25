import Topbar from "../Shared/Topbar";
import logo from "/images/small-logo.png";
import dashboardLogo from "../../../public/images/dashboard-logo/dashboard.svg";
import earnings from "../../../public/images/dashboard-logo/Earnings.svg";
import users from "../../../public/images/dashboard-logo/users.svg";
import stories from "../../../public/images/dashboard-logo/stories.svg";
import music from "../../../public/images/dashboard-logo/music.svg";
import setting from "../../../public/images/dashboard-logo/Setting.svg";
import subscription from "../../../public/images/dashboard-logo/subscription.svg";
import logout from "../../../public/images/dashboard-logo/logout.svg";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useState, useEffect } from "react";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState([]);

  // Function to check if any submenu under "Stories" is active
  const isSubMenuActive = (paths) => {
    return paths.some((path) => location.pathname.includes(path));
  };

  // Detect active menu item and open the corresponding submenu
  useEffect(() => {
    if (isSubMenuActive(["all-stories", "story-request"])) {
      setOpenKeys(["stories"]);
    }
  }, [location]);

  return (
    <div className="h-screen">
      <Layout>
        <Sider
          width={200}
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            background: "#023E8A",
            // marginRight: "10px",
            // borderRadius: "5px",
          }}
        >
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              width={140}
              height={140}
              className="my-7 mx-auto rounded-lg"
            />
          </Link>
          <Menu
            theme="light"
            mode="inline"
            openKeys={openKeys}
            onOpenChange={(keys) => setOpenKeys(keys)}
            defaultSelectedKeys={["dashboard"]}
            style={{
              backgroundColor: "transparent",
              border: "none",
            }}
            items={[
              {
                key: "dashboard",
                icon: (
                  <img
                    src={dashboardLogo}
                    alt="dashboard"
                    className={`h-5 menu-icon ${
                      location.pathname.includes("dashboard")
                        ? "active-icon"
                        : ""
                    }`}
                  />
                ),
                label: (
                  <NavLink
                    to="dashboard"
                    className={({ isActive }) =>
                      isActive ? "active-menu-item" : ""
                    }
                  >
                    Dashboard
                  </NavLink>
                ),
              },
              {
                key: "users",
                icon: (
                  <img
                    src={users}
                    alt="users"
                    className={`h-5 menu-icon ${
                      location.pathname.includes("users") ? "active-icon" : ""
                    }`}
                  />
                ),
                label: (
                  <NavLink
                    to="users"
                    className={({ isActive }) =>
                      isActive ? "active-menu-item" : ""
                    }
                  >
                    Users
                  </NavLink>
                ),
              },
              {
                key: "stories",
                icon: (
                  <img
                    src={stories}
                    alt="stories"
                    width={15}
                    height={15}
                    className="menu-icon"
                    // className={`menu-icon ${
                    //   isSubMenuActive(["all-stories", "story-request"])
                    //     ? "active-icon"
                    //     : ""
                    // }`}
                  />
                ),
                label: (
                  <span
                    // className={
                    //   isSubMenuActive(["all-stories", "story-request"])
                    //     ? "active-menu-item"
                    //     : ""
                    // }
                    className="text-white active:bg-white active:text-white"
                  >
                    Stories
                  </span>
                ),
                children: [
                  {
                    key: "all-stories",
                    icon: <span>&#8226;</span>,
                    label: (
                      <NavLink
                        to="all-stories"
                        className={({ isActive }) =>
                          isActive ? "active-menu-item" : ""
                        }
                      >
                        All Stories
                      </NavLink>
                    ),
                  },
                  {
                    key: "story-request",
                    icon: <span>&#8226;</span>,
                    label: (
                      <NavLink
                        to="story-request"
                        className={({ isActive }) =>
                          isActive ? "active-menu-item" : ""
                        }
                      >
                        Story Request
                      </NavLink>
                    ),
                  },
                ],
              },
              {
                key: "earning",
                icon: (
                  <img
                    src={earnings}
                    alt="earning"
                    width={15}
                    height={15}
                    className={`menu-icon ${
                      location.pathname.includes("earning") ? "active-icon" : ""
                    }`}
                  />
                ),
                label: (
                  <NavLink
                    to="earning"
                    className={({ isActive }) =>
                      isActive ? "active-menu-item" : ""
                    }
                  >
                    Earning
                  </NavLink>
                ),
              },
              {
                key: "subscription",
                icon: (
                  <img
                    src={subscription}
                    alt="subscription"
                    width={15}
                    height={15}
                    className={`menu-icon ${
                      location.pathname.includes("subscription")
                        ? "active-icon"
                        : ""
                    }`}
                  />
                ),
                label: (
                  <NavLink
                    to="subscription"
                    className={({ isActive }) =>
                      isActive ? "active-menu-item" : ""
                    }
                  >
                    Subscription
                  </NavLink>
                ),
              },
              {
                key: "music",
                icon: (
                  <img
                    src={music}
                    alt="music"
                    width={15}
                    height={15}
                    className={`menu-icon ${
                      location.pathname.includes("music") ? "active-icon" : ""
                    }`}
                  />
                ),
                label: (
                  <NavLink
                    to="music"
                    className={({ isActive }) =>
                      isActive ? "active-menu-item" : ""
                    }
                  >
                    Music
                  </NavLink>
                ),
              },
              {
                key: "settings",
                icon: (
                  <img
                    src={setting}
                    alt="settings"
                    width={15}
                    height={15}
                    className={`menu-icon ${
                      location.pathname.includes("settings")
                        ? "active-icon"
                        : ""
                    }`}
                  />
                ),
                label: (
                  <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                      isActive ? "active-menu-item" : ""
                    }
                  >
                    Setting
                  </NavLink>
                ),
              },
              {
                key: "logout",
                icon: (
                  <img
                    src={logout}
                    alt="logout"
                    width={15}
                    height={15}
                    className={`menu-icon ${
                      location.pathname.includes("signin") ? "active-icon" : ""
                    }`}
                  />
                ),
                label: (
                  <NavLink
                    to="signin"
                    className={({ isActive }) =>
                      isActive ? "active-menu-item" : ""
                    }
                  >
                    Logout
                  </NavLink>
                ),
              },
            ]}
          />
        </Sider>
        <Layout style={{ background: "white" }}>
          <Header style={{ marginBottom: "20px", borderRadius: "10px" }}>
            <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          </Header>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default DashboardLayout;
