import { Button, ConfigProvider, Form, Input } from "antd";

import { useNavigate } from "react-router-dom";
import logo from "../../../public/images/logo.png";
import { useForgetPasswordMutation } from "../../Redux/api/authApi";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgatePassword] = useForgetPasswordMutation();

  const onFinish = async(values) => {
    const data = {
      email:values.email,
    }
    try {
      // Await the mutation response
      const res = await forgatePassword(data).unwrap();
  
       // Storing tokens separately
    localStorage.setItem("otpToken", res.data);
   
    
      if (res.success) {
        Swal.fire({
          title: "Verify OTP! Check Email!!",
          text: "The user has been Check Email!.",
          icon: "success",
        });
        navigate("/verify-otp");
      } else {
        Swal.fire({
          title: "Error",
          text: "There was an issue user Check Email .",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error user forgate:", error);
      if(error.data){
        Swal.fire({
            title: `${error.data.message}`,
            text: "Something went wrong while OPT.",
            icon: "error",
          });
      }
      
    }
   
  };
  return (
    <div className="min-h-screen">
      <div className="max-w-[1350px] mx-auto flex flex-col lg:flex-row justify-center gap-8 items-center min-h-screen py-10">
        <div className="w-full md:w-[80%] lg:w-[50%] flex justify-center items-center">
          <img src={logo} alt="logo" width={400} className="rounded-2xl" />
        </div>
        <div className="w-full md:w-[80%] lg:w-[50%] bg-[#E6ECF3] px-10 py-16 rounded-lg">
          <div className="">
            <div className="mb-8">
              <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 text-center text-[#023E8A]">
                Forget password
              </h1>
              <p className="text-sm md:text-lg lg:text-xl mb-2 text-center">
                Enter your details below to request an your capture award
                account password reset.
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
                    className="py-2 px-3 sm:text-xl bg-transparent border-black text-black hover:bg-[#8bc4fa] focus:bg-transparent focus:border-black"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    className="w-full py-5 sm:py-7 border text-lg sm:text-2xl text-white bg-[#013564] border-[#97C6EA] hover:border-[#97C6EA] font-semibold rounded-2xl mt-5 sm:mt-8"
                    htmlType="submit"
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
