import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "../../Pages/Auth/ForgotPassword";
import Main from "../Layout/Main";
import Dashboard from "../Dashboard/Dashboard";
import DashboardLayout from "../Layout/DashboardLayout";
import PrivacyPolicy from "../Dashboard/settings/PrivacyPolicy";
import Profile from "../../Pages/Profile/Profile";
import Logout from "../Dashboard/Logout";
// import ChangePassword from "../../Pages/Auth/ChangePassword";
// import BookingDetails from "../Dashboard/UserDetails";
import Notifications from "../Dashboard/Notifications";
import EditProfile from "../../Pages/Profile/EditProfile";
import AboutUs from "../Dashboard/settings/AboutUs";
import OtpPage from "../../Pages/Auth/OtpPage";
import SignIn from "../../Pages/Auth/SignIn";
import ResetPassword from "../../Pages/Auth/ResetPassword";
import UserDetails from "../Dashboard/UserDetails";
// import SignUp from "../../Pages/Auth/SignUp";
// import SettingsForgotPassword from "../Dashboard/settings/SettingsForgotPassword";
import SettingsChangePassword from "../Dashboard/settings/SettingsChangePassword";
// import SettingsUpdatePassword from "../Dashboard/settings/SettingsUpdatePassword";
// import SettingsOtpPage from "../Dashboard/settings/SettingsOtpPage";

import Users from "../Dashboard/Users";
import TermsAndCondition from "../Dashboard/settings/TermsAndCondition";
import CreateAdmin from "../Dashboard/CreateAdmin";
import Orders from "../Dashboard/Orders/Orders";
import Products from "../Dashboard/Products/Products";
import { Earnings } from "../Dashboard/Earnings/Earnings";
import { AddProduct } from "../Dashboard/AddProduct/AddProduct";
import ProductEdit from "../Dashboard/ProductEdit/ProductEdit";
import SubscribsUsers from "../Dashboard/SubscribsUsers/SubscribsUsers";
import Offers from "../Dashboard/Offers/Offers";
import ProtectedRoute from "../ProtectedRoute";
import ProductOtherInfo from "../Dashboard/ProductOtherInfo";
import Contact from "../Dashboard/Contact/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      // {
      //   path: "signup",
      //   element: <SignUp />,
      // },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-otp",
        element: <OtpPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "user-details",
            element: <UserDetails />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "subcribers-users",
            element: <SubscribsUsers />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "offers",
            element: <Offers />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "products/:id",
            element: <ProductEdit />,
          },
          {
            path: "add-product",
            element: <AddProduct />,
          },
          {
            path: "product-other-info/:id",
            element: <ProductOtherInfo />,
          },

          {
            path: "earnings",
            element: <Earnings />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "dashboard/create-admin",
            element: <CreateAdmin />,
          },
          {
            path: "edit-profile",
            element: <EditProfile />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
          {
            path: "settings/privacy-policy",
            element: <PrivacyPolicy />,
          },
          {
            path: "settings/terms-of-service",
            element: <TermsAndCondition />,
          },
          {
            path: "settings/about-us",
            element: <AboutUs />,
          },
          // {
          //   path: "settings/forgot-password",
          //   element: <SettingsForgotPassword />,
          // },
          {
            path: "settings/change-password",
            element: <SettingsChangePassword />,
          },
          // {
          //   path: "settings/update-password",
          //   element: <SettingsUpdatePassword />,
          // },
          // {
          //   path: "settings/otp-page",
          //   element: <SettingsOtpPage />,
          // },
          {
            path: "logout",
            element: <Logout />,
          },
        ],
      },
    ],
  },
]);

export default router;
