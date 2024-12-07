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
import QRCodesGenerated from "../Dashboard/QRCodesGenerated/QRCodesGenerated";
import Shop from "../Dashboard/Shop/Shop";
import OrdersReceived from "../Dashboard/OrdersReceived/OrdersReceived";
import PremiumSubscription from "../Dashboard/PremiumSubscription/PremiumSubscription";
import ScanStatistics from "../Dashboard/ScanStatistics/ScanStatistics";
import QRCodeGeneratedDetails from "../Dashboard/QRCodesGenerated/QRCodeGeneratedDetails";
import ProtectedRoute from "../ProtectedRoute";
import OrderDetails from "../Dashboard/OrdersReceived/OrdersDetails";

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
            path: "qr-code-generated",
            element: <QRCodesGenerated />,
          },
          {
            path: "qr-code-generated/:id",
            element: <QRCodeGeneratedDetails />,
          },
          {
            path: "shop",
            element: <Shop />,
          },
          {
            path: "orders-received",
            element: <OrdersReceived />,
          },
          {
            path: "orders-received-details/:id",
            element: <OrderDetails />,
          },
          {
            path: "premium-subscription",
            element: <PremiumSubscription />,
          },
          {
            path: "scan-statistics",
            element: <ScanStatistics />,
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
