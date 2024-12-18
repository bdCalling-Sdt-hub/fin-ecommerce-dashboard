import { Checkbox, Button, Input, ConfigProvider, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
// import logo from "../../../public/images/logo.png";
import { useSignInMutation } from "../../Redux/api/authApi";
import Swal from "sweetalert2";
import logo from "../../../public/images/logo.png";

const SignIn = () => {
  const navigate = useNavigate();
  // const [login] = useSignInMutation();

  const onFinish = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    console.log("Request payload:", data);
    if (data.email && data.password) {
          Swal.fire({
            title: "Login Successfully!",
            text: "The user has been login!.",
            icon: "success",
          });
          navigate("/");
        }


    // try {
    //   // Await the mutation response
    //   const res = await login(data).unwrap();
    //   // Storing tokens separately
    //   localStorage.setItem("accessToken", res?.data?.accessToken);
    //   localStorage.setItem("refreshToken", res?.data?.refreshToken);

    //   if (res.success) {
    //     Swal.fire({
    //       title: "Login Successfully!",
    //       text: "The user has been login!.",
    //       icon: "success",
    //     });
    //     navigate("/");
    //   } else {
    //     Swal.fire({
    //       title: "Error",
    //       text: "There was an issue user login .",
    //       icon: "error",
    //     });
    //   }
    // } catch (error) {
    //   console.error("Error user login:", error);
    //   if (error.data) {
    //     Swal.fire({
    //       title: `${error.data.message}`,
    //       text: "Something went wrong while login users.",
    //       icon: "error",
    //     });
    //   }
    // }
  };
  return (
    <div className="min-h-screen bg-[#F4F7FA]">
      <div className="max-w-[1350px] w-[90%] mx-auto flex flex-col lg:flex-row gap-20 lg:gap-20 items-center justify-center min-h-screen py-10 ">
        
        {/* <div className="h-[500px] w-0.5 bg-[#A3D3F9] hidden lg:block"></div> */}
        <div className=" px-10 rounded-lg py-6">
          <div className="text-center mb-10 ">
            <div className="flex justify-center my-5"> <img src={logo} alt="logo" className=" w-96 " /></div>
           
            <h1 className="text-[#000] text-sm sm:text-4xl font-semibold sm:font-semibold mb-4">
              Login in
            </h1>
            <p className="text-[#302F51] sm:text-lg mb-2 sm:font-medium">
              Welcome back! Please enter your details.
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
                  // defaultHoverBg: "rgb(10,39,153)",
                  defaultHoverColor: "none",
                  
                  // defaultBg: "#fff",
                  defaultBorderColor: "#fff",
                  // defaultColor: "rgb(255,255,255)",
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
              {/* <Typography.Title level={4} style={{ color: "#1f1f1f" }}>
                Email
              </Typography.Title> */}
              <Form.Item name="email" className="text-white" label="Email">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="py-2 px-3 sm:text-xl bg-white border-slate-200  text-black"
                />
              </Form.Item>

              <Form.Item
                name="password"
                className="text-white"
                label="Password"
              >
                <Input.Password
                  placeholder="Enter your password"
                  className="py-2 px-3 sm:text-xl bg-white border-slate-200  text-black focus:outline-none "
                />
              </Form.Item>

              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Checkbox className=""  />
                  <p className="">Remember Password</p>
                </div>
                <div>
                  <Link
                    to="/forgot-password"
                    className="font-bold text-[#E6C379] underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <Form.Item>
                {/* <Link to="/"> */}
                <Button
                  className="w-full py-6 border border-white text-lg sm:text-xl text-white font-semibold rounded-none  mt-8"
                  htmlType="submit"
                  style={{ background: "#E6C379", border: "black" , color: "black"}}
                >
                  Sign In
                </Button>
                {/* </Link> */}
              </Form.Item>
            </Form>
          </ConfigProvider>
          {/* <div className="flex items-center justify-center text-center gap-1">
            <p>Don’t have an account ?</p>
            <Link to={"/signup"} className="text-[#FFAC76] font-bold underline">
              Sign Up
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default SignIn;
