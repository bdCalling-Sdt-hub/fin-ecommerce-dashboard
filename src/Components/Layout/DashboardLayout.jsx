import Topbar from "../Shared/Topbar";
// import logo from "/images/4 1.png";
import dashboardLogo from "../../../public/images/dashboard-logo/dashboard.svg";
import users from "../../../public/images/dashboard-logo/users.svg";
// import user from "../../../public/images/dashboard-logo/user.svg";
import setting from "../../../public/images/dashboard-logo/Setting.svg";
import logout from "../../../public/images/dashboard-logo/logout.svg";
import orders from "../../../public/images/icon/orders.svg";
import offers from "../../../public/images/icon/offer.svg";
import products from "../../../public/images/icon/create_product.svg";
import earnings from "../../../public/images/icon/earning.svg";
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
import logo from "../../../public/images/logo.png";

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
          className=""
          style={{
            background: "#EBEBEB",
           
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
              className="my-7 mx-auto "
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
                // colorBgBase: "#000",
                colorInfo: "#023E8A",
              },
            }}
          >
            <Menu
              theme="light"
              mode="inline"
              
              openKeys={openKeys}
              onOpenChange={(keys) => setOpenKeys(keys)}
              defaultSelectedKeys={location.pathname.split("/").pop()}
              selectedKeys={location.pathname.split("/").pop()}
              style={{
                li:{
                  margin:0
                },
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
                          ? "active-menu-item font-semibold "
                          : "font-semibold "
                      }
                    >
                      Dashboard
                    </NavLink>
                  ),
                },
                
                {
                  key: "subcribers-users",
                  icon: (
                    <img
                      src={orders}
                      alt="subcribers-users"
                      className={`h-5 menu-icon ${
                        location.pathname.includes("subcribers-users")
                          ? "active-icon"
                          : ""
                      }`}
                    />
                  ),
                  label: (
                    <NavLink
                      to="subcribers-users"
                      className={({ isActive }) =>
                        isActive
                          ? "active-menu-item font-semibold"
                          : " font-semibold"
                      }
                    >
                    Subscribers Users
                    </NavLink>
                  ),
                },
                {
                  key: "orders",
                  icon: (
                    <img
                      src={orders}
                      alt="orders"
                      className={`h-5 menu-icon ${
                        location.pathname.includes("orders")
                          ? "active-icon"
                          : ""
                      }`}
                    />
                  ),
                  label: (
                    <NavLink
                      to="orders"
                      className={({ isActive }) =>
                        isActive
                          ? "active-menu-item font-semibold"
                          : " font-semibold"
                      }
                    >
                     orders
                    </NavLink>
                  ),
                },
                {
                  key: "offers",
                  icon: (
                    <img
                      src={orders}
                      alt="offers"
                      className={`h-5 menu-icon ${
                        location.pathname.includes("offers")
                          ? "active-icon"
                          : ""
                      }`}
                    />
                  ),
                  label: (
                    <NavLink
                      to="offers"
                      className={({ isActive }) =>
                        isActive
                          ? "active-menu-item font-semibold"
                          : " font-semibold"
                      }
                    >
                     Offers
                    </NavLink>
                  ),
                },
              
                {
                  key: "products",
                  icon: (
                    <img
                      src={products}
                      alt="products"
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
                      Product
                    </span>
                  ),
                  children: [
                    {
                      key: "products",
                      icon: <span>&#8226;</span>,
                      label: (
                        <NavLink
                          to="products"
                          className={({ isActive }) =>
                            isActive
                              ? "active-menu-item font-semibold"
                              : " font-semibold"
                          }
                        >
                          Products
                        </NavLink>
                      ),
                    },
                    {
                      key: "add-product",
                      icon: <span>&#8226;</span>,
                      label: (
                        <NavLink
                          to="add-product"
                          className={({ isActive }) =>
                            isActive
                              ? "active-menu-item font-semibold"
                              : " font-semibold"
                          }
                        >
                          Add Product
                        </NavLink>
                      ),
                    },
                    
                  ],
                },
                
                {
                  key: "earnings",
                  icon: (
                    <img
                      src={earnings}
                      alt="earnings"
                      className={`h-5 menu-icon ${
                        location.pathname.includes("scan-statistics")
                          ? "active-icon"
                          : ""
                      }`}
                    />
                  ),
                  label: (
                    <NavLink
                      to="earnings"
                      className={({ isActive }) =>
                        isActive
                          ? "active-menu-item font-semibold"
                          : " font-semibold"
                      }
                    >
                     Earning
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
                      Users Management
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
                      key: "change-password",
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
                      key: "about-us",
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
                      key: "terms-of-service",
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
                      key: "privacy-policy",
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
