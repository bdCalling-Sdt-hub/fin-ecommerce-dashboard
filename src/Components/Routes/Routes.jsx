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
import EarningsTracking from "../Dashboard/Earnings";
import Notifications from "../Dashboard/Notifications";
import EditProfile from "../../Pages/Profile/EditProfile";
import TermsOfService from "../Dashboard/settings/TermsAndCondition";
import AboutUs from "../Dashboard/settings/AboutUs";
import UpdatePassword from "../../Pages/Auth/UpdatePassword";
import OtpPage from "../../Pages/Auth/OtpPage";
import SignIn from "../../Pages/Auth/SignIn";
import UserDetails from "../Dashboard/UserDetails";
import SignUp from "../../Pages/Auth/SignUp";
import SettingsForgotPassword from "../Dashboard/settings/SettingsForgotPassword";
import SettingsChangePassword from "../Dashboard/settings/SettingsChangePassword";
import SettingsUpdatePassword from "../Dashboard/settings/SettingsUpdatePassword";
import SettingsOtpPage from "../Dashboard/settings/SettingsOtpPage";

// import AppTransactions from "../Dashboard/AppTransactions";
import Subscription from "../Dashboard/Subscription";
// import FAQ from "../Dashboard/settings/FAQ";
import Users from "../Dashboard/Users";
import Earnings from "../Dashboard/Earnings";
import Setting from "../Dashboard/Settings";
import TermsAndCondition from "../Dashboard/settings/TermsAndCondition";
import Music from "../Dashboard/Music";
import AllStories from "../Dashboard/AllStories";
import StoryDetails from "../Dashboard/StoryDetails";
import StoryRequest from "../Dashboard/StoryRequest";
import StoryReqDetails from "../Dashboard/StoryReqDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-otp",
        element: <OtpPage />,
      },
      {
        path: "/update-password",
        element: <UpdatePassword />,
      },
      {
        path: "",
        element: <DashboardLayout />,
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
            path: "all-stories",
            element: <AllStories />,
          },
          {
            path: "story-details/:id",
            element: <StoryDetails />,
          },
          {
            path: "story-request",
            element: <StoryRequest />,
          },
          {
            path: "story-request-details/:key",
            element: <StoryReqDetails />,
          },
          {
            path: "earning",
            element: <Earnings />,
          },
          {
            path: "subscription",
            element: <Subscription />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "edit-profile",
            element: <EditProfile />,
          },
          {
            path: "music",
            element: <Music />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
          {
            path: "settings",
            element: <Setting />,
          },
          {
            path: "settings/privacy-policy",
            element: <PrivacyPolicy />,
          },
          {
            path: "settings/terms-and-condition",
            element: <TermsAndCondition />,
          },
          {
            path: "settings/about-us",
            element: <AboutUs />,
          },
          {
            path: "settings/forgot-password",
            element: <SettingsForgotPassword />,
          },
          {
            path: "settings/change-password",
            element: <SettingsChangePassword />,
          },
          {
            path: "settings/update-password",
            element: <SettingsUpdatePassword />,
          },
          {
            path: "settings/otp-page",
            element: <SettingsOtpPage />,
          },
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
