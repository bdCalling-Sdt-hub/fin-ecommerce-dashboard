import { Button, ConfigProvider, Form } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import logo from "../../../public/images/logo.png";
import logo from "/images/4 1.png";
import OTPInput from "react-otp-input";
import {
  useForgetPasswordMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "../../Redux/api/authApi";
import { toast } from "sonner";
import icon from "../../../public/images/icon/otpMatchicon.png";
import Swal from "sweetalert2";

const OtpPage = () => {
  // const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // const [verifyOtp] = useVerifyOtpMutation();
  // const [resendOtp] = useResendOtpMutation();

   const [forgetPassword] = useForgetPasswordMutation();

  const handleOTPSubmit = async () => {
   
      // Swal.fire({
      //   title: "OTP verified successfully!!",
      //   text: "The user has been OTP!.",
      //   icon: "success",
      // });
      navigate("/signin");


    // const token = localStorage.getItem("otpToken");
    // if (!token) {
    //   alert("Error!. Please start the reset process again.");
    //   navigate("/forgot-password");
    //   return;
    // }

    // try {
    //   const data = { token, otp };
    //   console.log("Success:", data);
    //   const response = await verifyOtp(data).unwrap();
    //   console.log("OTP verification response:", response);

    //   if (response.success === true) {
    //     localStorage.setItem(
    //       "verifiedOtpToken",
    //       response?.data?.forgetOtpMatchToken
    //     );
    //     toast.success("OTP verified successfully!");
    //     navigate("/reset-password");
    //   }
    // } catch (error) {
    //   console.error("Error verifying OTP:", error);
    //   if (error.data?.message === "Invalid OTP") {
    //     toast.error("Invalid OTP. Please try again.");
    //   } else {
    //     toast.error("Failed to verify OTP. Please try again.");
    //   }
    // }
  };

  const email = localStorage.getItem("userEmail");

  const handleResendOtp = async () => {

    if (!email) {
      alert("Error!. Please start the reset process again.");
      toast.success("Error!. Please start the reset process again.");
      navigate("/forgot-password");
      return;
    }

    const data = { email };
    console.log("resend mail:", data);
   
    try {
      const response = await forgetPassword(data).unwrap();
      console.log("response token", response);
      if (response.success === true) {
        toast.success("Forgot password link has been again sent to your email!");
      }
    } catch (error) {
      console.error("Error sending reset code:", error);
      if (error.data?.message === "User not found") {
        toast.error("Incorrect Email.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA]">
      <div className="max-w-[1350px] mx-auto flex flex-col lg:flex-row justify-center gap-10 items-center min-h-screen py-10">
        <div className="w-full md:w-[80%] lg:w-[50%]  px-10 py-16 rounded-lg">
          <div className="">
            <div className="mb-8">
              <div className="flex justify-center"><span className="bg-[#E6EDF7] rounded-full p-3"><img src={icon} alt="" className="h-10 w-10" /></span></div>
              <p className="text-xl md:text-3xl text-center lg:text-4xl font-bold mb-4 ">
                Check your email
              </p>
              <div className="flex justify-center text-center">
              <p>We sent a password reset link to <br />{email}</p></div>
            </div>
            <ConfigProvider
              theme={{
                components: {
                  Form: {
                    colorError: "#F44848",
                  },
                  Button: {
                    defaultHoverBg: "rgb(10,39,153)",
                    defaultHoverColor: "rgb(255,255,255)",
                    defaultBg: "rgb(2,62,138)",
                    defaultBorderColor: "rgb(2,62,138)",
                    defaultColor: "rgb(255,255,255)",
                  },
                },
              }}
            >
              <Form layout="vertical" className="bg-transparent w-full">

                <Form.Item>
                  <Button
                    className="w-full sm:py-7 border text-lg sm:text-2xl text-white bg-[#013564] border-[#97C6EA] hover:border-[#97C6EA] rounded-none font-semibold  "
                    onClick={handleOTPSubmit}
                    style={{ background: "#E6C379", border: "black", color: "black" }}
                  >
                    Continue again  signIn
                  </Button>
                </Form.Item>
                <p className="text-center">Did't receve the email <span className="text-[#E6C379] cursor-pointer" onClick={handleResendOtp}>Click to resent</span> </p>
              </Form>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OtpPage;
