import {
  Checkbox,
  Button,
  Input,
  ConfigProvider,
  Form,
  Typography,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/images/logo.png";

const SignIn = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/");
  };
  return (
    <div className="min-h-screen">
      <div className="max-w-[1350px] w-[90%] mx-auto flex flex-col lg:flex-row gap-20 lg:gap-20 items-center justify-center min-h-screen py-10">
        <div>
          <img src={logo} alt="logo" width={400} className="rounded-2xl" />
        </div>
        {/* <div className="h-[500px] w-0.5 bg-[#A3D3F9] hidden lg:block"></div> */}
        <div className="bg-[#E6ECF3] px-10 rounded-lg py-6">
          <div className="text-center mb-10 ">
            <h1 className="text-[#023E8A] text-sm sm:text-4xl font-semibold sm:font-semibold mb-4">
              Login to Account!
            </h1>
            <p className="text-[#1f1f1f] sm:text-2xl mb-2 sm:font-medium">
              Please enter your email and password to continue.
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
              {/* <Typography.Title level={4} style={{ color: "#1f1f1f" }}>
                Email
              </Typography.Title> */}
              <Form.Item name="email" className="text-white" label="Email">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="py-2 px-3 sm:text-xl bg-transparent border-black text-black hover:bg-[#8bc4fa] focus:bg-transparent focus:border-black"
                />
              </Form.Item>

              <Form.Item
                name="password"
                className="text-white"
                label="Password"
              >
                <Input.Password
                  placeholder="Enter your password"
                  className="py-2 px-3 sm:text-xl bg-transparent border-black text-black hover:bg-[#8bc4fa] focus:bg-transparent focus:border-black"
                />
              </Form.Item>

              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Checkbox />
                  <p className="">Remember Password</p>
                </div>
                <div>
                  <Link
                    to="/forgot-password"
                    className="font-bold text-[#FFAC76] underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <Form.Item>
                {/* <Link to="/"> */}
                <Button
                  className="w-full py-6 border text-lg sm:text-xl text-white font-semibold rounded-2xl mt-8"
                  htmlType="submit"
                >
                  Sign In
                </Button>
                {/* </Link> */}
              </Form.Item>
            </Form>
          </ConfigProvider>
          <div className="flex items-center justify-center text-center gap-1">
            <p>Don’t have an account ?</p>
            <Link to={"/signup"} className="text-[#FFAC76] font-bold underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
