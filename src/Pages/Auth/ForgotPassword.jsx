import { Button, ConfigProvider, Form, Input } from "antd";

import { useNavigate } from "react-router-dom";
// import logo from "../../../public/images/logo.png";
import { useForgetPasswordMutation } from "../../Redux/api/authApi";

import icon from "../../../public/images/icon/forgate password.png";
import { useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // const token = localStorage.getItem("authToken");

  const [forgetPassword] = useForgetPasswordMutation();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onFinish = async () => {
    const data = { email };
    console.log("Success:", data);
    if (email) {
              Swal.fire({
                title: "An OTP has been sent to your email!!",
                text: "The user has been OTP!.",
                icon: "success",
              });
              navigate("/verify-otp");
            }

    // try {
    //   const response = await forgetPassword(data).unwrap();
    //   console.log("response token", response);
    //   if (response.success === true) {
    //     localStorage.setItem("otpToken", response?.data?.forgetToken);
    //     localStorage.setItem("userEmail", email);
    //     toast.success("An OTP has been sent to your email!");
    //     navigate("/verify-otp");
    //   }
    // } catch (error) {
    //   console.error("Error sending reset code:", error);
    //   if (error.data?.message === "User not found") {
    //     toast.error("Incorrect Email.");
    //   }
    // }
  };
  return (
    <div className="min-h-screen bg-[#F4F7FA]">
      <div className="max-w-[1350px] mx-auto flex flex-col lg:flex-row justify-center gap-8 items-center min-h-screen py-10">
       
        <div className="w-full md:w-[80%] lg:w-[50%]  px-10 py-16 rounded-lg">
          <div className="">
            <div className="mb-8">
              <div className="flex justify-center"><span className="bg-[#E6EDF7] rounded-full p-3"><img src={icon} alt="" className="h-10 w-10" /></span></div>
              <h1 className="text-xl md:text-4xl lg:text-5xl font-bold mb-4 text-center text-[#000]">
                Forget password
              </h1>
              <p className="text-sm md:text-base  mb-2 text-center">
                No worries, we'll send you reset instructions.
              </p>
            </div>
            <ConfigProvider
              theme={{
                components: {
                  Form: {
                    colorError: "#F44848",
                    labelColor: "rgb(0,0,0)",
                    labelFontSize: 20,
                  },
                  Button: {
                    defaultHoverBg: "rgb(10,39,153)",
                    defaultHoverColor: "rgb(255,255,255)",
                    defaultBg: "rgb(2,62,138)",
                    defaultBorderColor: "rgb(2,62,138)",
                    defaultColor: "rgb(255,255,255)",
                  },
                  Input: {
                    colorTextPlaceholder: "rgb(113,111,111)",
                     hoverBorderColor:"#000",
                  activeBorderColor:"#000"
                  },
                },
              }}
            >
              <Form
                layout="vertical"
                className="bg-transparent w-full"
                onFinish={onFinish}
              >
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Email is Required",
                    },
                  ]}
                  name="email"
                  label="Email"
                  className="text-primary-color"
                >
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="py-2 px-3 sm:text-xl bg-white border-slate-200  text-black"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    className="w-full py-5 sm:py-7 border text-lg sm:text-2xl text-white bg-[#013564] border-[#97C6EA] hover:border-[#97C6EA] font-semibold rounded-none  mt-5 sm:mt-8"
                    htmlType="submit"
                    style={{ background: "#E6C379", border: "black", color: "black" }}
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
export default ForgotPassword;
