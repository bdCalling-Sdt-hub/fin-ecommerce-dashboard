import Topbar from "../Shared/Topbar";
import logo from "/images/4 1.png";
import dashboardLogo from "../../../public/images/dashboard-logo/dashboard.svg";
import users from "../../../public/images/dashboard-logo/users.svg";
// import user from "../../../public/images/dashboard-logo/user.svg";
import setting from "../../../public/images/dashboard-logo/Setting.svg";
import logout from "../../../public/images/dashboard-logo/logout.svg";
import QRCodeGenerated from "../../../public/images/dashboard-logo/Group 75.svg";
import shop from "../../../public/images/dashboard-logo/shop.svg";
import orderReceved from "../../../public/images/dashboard-logo/orderReceved.svg";
import premiumSubscription from "../../../public/images/dashboard-logo/premiumSubscription.svg";
import scanStatistics from "../../../public/images/dashboard-logo/Group 76.svg";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ConfigProvider, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useState, useEffect } from "react";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
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

  // handleLogout function
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    // cookie.remove("authToken", { path: "/" });

    navigate("/signin", { replace: true });
  };

  return (
    <div className="h-screen">
      <Layout className="min-h-[100vh]">
        <Sider
          width={240}
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            background: "#d3e6f9",
            // color:'black'
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
          <ConfigProvider
            theme={{
              // components: {
              //   Button: {
              //     defaultHoverBg: "#97C6EA",
              //     defaultHoverColor: "#1A1A1A",
              //   },
              // },
              token: {
                colorBgBase: "rgb(211,230,249)",
                colorInfo: "#023E8A",
              },
            }}
          >
            <Menu
              theme="light"
              mode="inline"
              openKeys={openKeys}
              onOpenChange={(keys) => setOpenKeys(keys)}
              defaultSelectedKeys={["dashboard"]}
              style={{
                backgroundColor: "transparent",
                border: "none",
                // color:"black"
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
                        isActive
                          ? "active-menu-item font-semibold"
                          : "font-semibold"
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
                        isActive
                          ? "active-menu-item font-semibold"
                          : " font-semibold"
                      }
                    >
                      Users
                    </NavLink>
                  ),
                },
                {
                  key: "qr-code-generated",
                  icon: (
                    <img
                      src={QRCodeGenerated}
                      alt="qr-code-generated"
                      className={`h-5 menu-icon ${
                        location.pathname.includes("qr-code-generated")
                          ? "active-icon"
                          : ""
                      }`}
                    />
                  ),
                  label: (
                    <NavLink
                      to="qr-code-generated"
                      className={({ isActive }) =>
                        isActive
                          ? "active-menu-item font-semibold"
                          : " font-semibold"
                      }
                    >
                      QR Code Generated
                    </NavLink>
                  ),
                },
                {
                  key: "shop",
                  icon: (
                    <img
                      src={shop}
                      alt="shop"
                      className={`h-5 menu-icon ${
                        location.pathname.includes("shop") ? "active-icon" : ""
                      }`}
                    />
                  ),
                  label: (
                    <NavLink
                      to="shop"
                      className={({ isActive }) =>
                        isActive
                          ? "active-menu-item font-semibold"
                          : " font-semibold"
                      }
                    >
                      Shop
                    </NavLink>
                  ),
                },
                {
                  key: "orders-received",
                  icon: (
                    <img
                      src={orderReceved}
                      alt="orders-received"
                      className={`h-5 menu-icon ${
                        location.pathname.includes("orders-received")
                          ? "active-icon"
                          : ""
                      }`}
                    />
                  ),
                  label: (
                    <NavLink
                      to="orders-received"
                      className={({ isActive }) =>
                        isActive
                          ? "active-menu-item font-semibold"
                          : " font-semibold"
                      }
                    >
                      Orders Received
                    </NavLink>
                  ),
                },
                {
                  key: "subscriptions",
                  icon: (
                    <img
                      src={premiumSubscription}
                      alt="subscriptions"
                      className={`h-5 menu-icon ${
                        location.pathname.includes("subscriptions")
                          ? "active-icon"
                          : ""
                      }`}
                    />
                  ),
                  label: (
                    <NavLink
                      to="subscriptions"
                      className={({ isActive }) =>
                        isActive
                          ? "active-menu-item font-semibold"
                          : " font-semibold"
                      }
                    >
                      Subscriptions
                    </NavLink>
                  ),
                },
                {
                  key: "scan-statistics",
                  icon: (
                    <img
                      src={scanStatistics}
                      alt="scan-statistics"
                      className={`h-5 menu-icon ${
                        location.pathname.includes("scan-statistics")
                          ? "active-icon"
                          : ""
                      }`}
                    />
                  ),
                  label: (
                    <NavLink
                      to="scan-statistics"
                      className={({ isActive }) =>
                        isActive
                          ? "active-menu-item font-semibold"
                          : " font-semibold"
                      }
                    >
                      Scan Statistics
                    </NavLink>
                  ),
                },
                {
                  key: "premium-subscription",
                  icon: (
                    <img
                      src={premiumSubscription}
                      alt="premium-subscription"
                      className={`h-5 menu-icon ${
                        location.pathname.includes("premium-subscription")
                          ? "active-icon"
                          : ""
                      }`}
                    />
                  ),
                  label: (
                    <NavLink
                      to="premium-subscription"
                      className={({ isActive }) =>
                        isActive
                          ? "active-menu-item font-semibold"
                          : " font-semibold"
                      }
                    >
                      Premium Subscription
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
                      className="text-black active:bg-black active:text-black font-semibold"
                    >
                      Setting
                    </span>
                  ),
                  children: [
                    {
                      key: "settings/change-password",
                      icon: <span>&#8226;</span>,
                      label: (
                        <NavLink
                          to="settings/change-password"
                          className={({ isActive }) =>
                            isActive
                              ? "active-menu-item font-semibold"
                              : " font-semibold"
                          }
                        >
                          Change Password
                        </NavLink>
                      ),
                    },
                    {
                      key: "settings/about-us",
                      icon: <span>&#8226;</span>,
                      label: (
                        <NavLink
                          to="settings/about-us"
                          className={({ isActive }) =>
                            isActive
                              ? "active-menu-item font-semibold"
                              : " font-semibold"
                          }
                        >
                          About Us
                        </NavLink>
                      ),
                    },
                    {
                      key: "settings/terms-and-condition",
                      icon: <span>&#8226;</span>,
                      label: (
                        <NavLink
                          to="settings/terms-of-service"
                          className={({ isActive }) =>
                            isActive
                              ? "active-menu-item font-semibold"
                              : " font-semibold"
                          }
                        >
                          Terms Of Service
                        </NavLink>
                      ),
                    },
                    {
                      key: "settings/privacy-policy",
                      icon: <span>&#8226;</span>,
                      label: (
                        <NavLink
                          to="settings/privacy-policy"
                          className={({ isActive }) =>
                            isActive
                              ? "active-menu-item font-semibold"
                              : " font-semibold"
                          }
                        >
                          Privacy And Policy
                        </NavLink>
                      ),
                    },
                  ],
                },
                // {
                //   key: "dashboard/create-admin",
                //   icon: (
                //     <img
                //       src={user}
                //       alt="dashboard/create-admin"
                //       className={`h-5 menu-icon ${
                //         location.pathname.includes("dashboard/create-admin")
                //           ? "active-icon "
                //           : " "
                //       }`}
                //     />
                //   ),
                //   label: (
                //     <NavLink
                //       to="dashboard/create-admin"
                //       className={({ isActive }) =>
                //         isActive
                //           ? "active-menu-item font-semibold"
                //           : " font-semibold"
                //       }
                //     >
                //       Create New Admin
                //     </NavLink>
                //   ),
                // },
                {
                  key: "logout",
                  icon: (
                    <img
                      src={logout}
                      alt="logout"
                      width={15}
                      height={15}
                      className={`menu-icon ${
                        location.pathname.includes("signin")
                          ? "active-icon font-semibold"
                          : " font-semibold"
                      }`}
                    />
                  ),
                  label: (
                    <NavLink
                      onClick={handleLogout}
                      // to="signin"
                      className={({ isActive }) =>
                        isActive
                          ? "active-menu-item font-semibold"
                          : " font-semibold"
                      }
                    >
                      Logout
                    </NavLink>
                  ),
                },
              ]}
            />
          </ConfigProvider>
        </Sider>
        <Layout style={{ background: "white" }}>
          <Header style={{ borderRadius: "10px" }}>
            <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          </Header>
          <Content style={{ padding: "25px" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default DashboardLayout;
