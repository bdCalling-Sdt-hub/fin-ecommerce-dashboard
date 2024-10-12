import { Button, ConfigProvider, Form } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/images/logo.png";
import OTPInput from "react-otp-input";
import { useResendOptCodeMutation, useVerifyForgetPasswordMutation } from "../../Redux/api/authApi";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [verifyOtpPassword] = useVerifyForgetPasswordMutation();
  const [resendOptCodeSend] = useResendOptCodeMutation();
  const navigate = useNavigate();

  const handleOTPSubmit = async() => {
    if (otp.length < 4) {
      alert("Please fill in all OTP fields");
    } else {
      
      const otpToken = localStorage.getItem('otpToken');
    const data = {
        otp: otp,
        verifyToken: otpToken
    
    }
    try {
      // Await the mutation response
      const res = await verifyOtpPassword(data).unwrap();
    
      console.log('verify otp password res', res);
      // localStorage.setItem("otpToken", res.data);
       // Storing tokens separately
      if (res.success) {
        Swal.fire({
          title: "Verify OTP Succesfull !!",
          text: "The user has been verify successfull!.",
          icon: "success",
        });
        navigate("/update-password");
      } else {
        Swal.fire({
          title: "Error",
          text: "There was an issue otp verify success .",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error user otp verify :", error);
      if(error.data){
        Swal.fire({
            title: `${error?.data?.message}`,
            text: "Something went wrong while otp verify.",
            icon: "error",
          });
      }
      
    }
      
    }
  };

  const handleOTPResendSubmit = async() => {
    
    try {
      // Await the mutation response
      const otpToken = localStorage.getItem('otpToken');
      const tokenData = jwtDecode(otpToken)._doc;
    const data = {
        email: tokenData.email
    
    }
      const res = await resendOptCodeSend(data).unwrap();
    
      console.log('verify otp password res', res);
      // localStorage.setItem("otpToken", res.data);
       // Storing tokens separately
      if (res.success) {
        Swal.fire({
          title: "Check email for OTP !!",
          text: "The user has been verify successfull!.",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "There was an issue otp verify success .",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error user otp verify :", error);
      if(error.data){
        Swal.fire({
            title: `${error?.data?.message}`,
            text: "Something went wrong while otp verify.",
            icon: "error",
          });
      }
      
    }

  };

  return (
    <div className="min-h-screen">
      <div className="max-w-[1350px] mx-auto flex flex-col lg:flex-row justify-center gap-10 items-center min-h-screen py-10">
        <div className="w-full md:w-[80%] lg:w-[50%] flex justify-center items-center">
          <img src={logo} alt="logo" width={400} className="rounded-2xl" />
        </div>
        <div className="w-full md:w-[80%] lg:w-[50%] bg-[#E6ECF3] px-10 py-16 rounded-lg">
          <div className="">
            <div className="mb-8">
              <p className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 text-[#023E8A]">
                Enter verification code
              </p>
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
                <Form.Item className="">
                  <div className="flex justify-center items-center">
                    <OTPInput
                      inputStyle="!w-[55px] h-[45px] !sm:w-[76px] sm:h-[64px] text-xl text-[#1F2852] sm:text-3xl font-bold bg-transparent border border-b-[#1F2852] 
                      hover:border-b-[#1F2852] focus:bg-transparent focus:border-b-[#1F2852] rounded mr-2 sm:mr-5"
                      value={otp}
                      onChange={setOtp}
                      numInputs={4}
                      renderInput={(props) => <input {...props} required />}
                    />
                  </div>
                </Form.Item>
                <div className="flex gap-2 text-[#023E8A] py-1 text-sm sm:text-base">
                  <p>If you didn’t receive a code.</p>
                  <Link
                    href="/otp-verification"
                    className="text-[#FFAC76] font-semibold !underline"
                    onClick={handleOTPResendSubmit}
                  >
                    Resend
                  </Link>
                </div>

                <Form.Item>
                  <Button
                    className="w-full py-5 sm:py-7 border text-lg sm:text-2xl text-white bg-[#013564] border-[#97C6EA] hover:border-[#97C6EA] font-semibold rounded-2xl mt-5 sm:mt-14"
                    onClick={handleOTPSubmit}
                  >
                    Get OTP
                  </Button>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OtpPage;
