import { Button, ConfigProvider, Form, Input, Typography } from "antd";
import logo from "../../../public/images/logo.png";

const SignUp = () => {
  // const onFinish = (values) => {
  //   console.log("sign up Success:", values);
  // };

  return (
    // <div className="min-h-screen">
    //   <div className="max-w-[1350px] w-[90%] mx-auto flex flex-col lg:flex-row gap-20 lg:gap-20 items-center justify-center min-h-screen py-10">
    //     <div className="">
    //       <img src={logo} alt="logo" width={400} className="rounded-2xl" />
    //     </div>

    //     <div className="w-full lg:w-[50%] bg-[#E6ECF3] px-10 rounded-lg py-6">
    //       <div className="text-center mb-10">
    //         <h1 className="text-[#023E8A] text-sm sm:text-4xl font-semibold sm:font-semibold mb-4">
    //           Sign Up
    //         </h1>
    //       </div>
    //       <ConfigProvider
    //         theme={{
    //           components: {
    //             Form: {
    //               colorError: "#F44848",
    //               labelColor: "#1F2852",
    //               labelFontSize: 20,
    //             },
    //             Button: {
    //               defaultHoverBg: "rgb(10,39,153)",
    //               defaultHoverColor: "rgb(255,255,255)",
    //               defaultBg: "rgb(2,62,138)",
    //               defaultBorderColor: "rgb(2,62,138)",
    //               defaultColor: "rgb(255,255,255)",
    //             },
    //             Input: {
    //               colorTextPlaceholder: "rgb(113,111,111)",
    //             },
    //           },
    //         }}
    //       >
    //         <Form
    //           layout="vertical"
    //           className="bg-transparent w-full"
    //           onFinish={onFinish}
    //         >
    //           {/* <Typography.Title level={4} style={{ color: "#F3F3F3" }}>
    //             Full name
    //           </Typography.Title> */}
    //           <Form.Item
    //             name="fullName"
    //             className="text-white"
    //             label={<p style={{ fontWeight: "500" }}>Full Name</p>}
    //           >
    //             <Input
    //               placeholder="Enter your Full Name"
    //               className="py-2 px-3 text-xl bg-site-color border-base-color text-base-color hover:bg-transparent hover:border-base-color focus:bg-transparent focus:border-button-color"
    //             />
    //           </Form.Item>
    //           {/* <Typography.Title level={4} style={{ color: "#F3F3F3" }}>
    //             Email
    //           </Typography.Title> */}
    //           <Form.Item
    //             name="email"
    //             className="text-white"
    //             label={<p style={{ fontWeight: "500" }}>Email</p>}
    //           >
    //             <Input
    //               type="email"
    //               placeholder="Enter your email"
    //               className="py-2 px-3 text-xl bg-site-color border-base-color text-base-color hover:bg-transparent hover:border-base-color focus:bg-transparent focus:border-button-color"
    //             />
    //           </Form.Item>
    //           <Form.Item
    //             name="password"
    //             className="text-white"
    //             label={<p style={{ fontWeight: "500" }}>Password</p>}
    //           >
    //             <Input.Password
    //               placeholder="Enter your password"
    //               className="py-2 px-3 text-xl bg-site-color border-base-color text-base-color hover:bg-transparent hover:border-base-color focus:bg-transparent focus:border-button-color"
    //             />
    //           </Form.Item>
    //           <Form.Item
    //             name="confirmPassword"
    //             label={<p style={{ fontWeight: "500" }}>Confirm Password</p>}
    //             rules={[
    //               { required: true, message: "Please confirm your password!" },
    //               ({ getFieldValue }) => ({
    //                 validator(_, value) {
    //                   if (!value || getFieldValue("password") === value) {
    //                     return Promise.resolve();
    //                   }
    //                   return Promise.reject(
    //                     new Error(
    //                       "The two passwords that you entered do not match!"
    //                     )
    //                   );
    //                 },
    //               }),
    //             ]}
    //             className="text-white"
    //           >
    //             <Input.Password
    //               placeholder="Enter your password"
    //               className="py-2 px-3 text-xl bg-site-color border-base-color text-base-color hover:bg-transparent hover:border-base-color focus:bg-transparent focus:border-button-color"
    //             />
    //           </Form.Item>

    //           <Form.Item>
    //             <Button
    //               className="w-full py-6 border text-xl font-semibold rounded-2xl mt-14"
    //               htmlType="submit"
    //             >
    //               Sign up
    //             </Button>
    //           </Form.Item>
    //         </Form>
    //       </ConfigProvider>
    //     </div>
    //   </div>
    // </div>
    <div>signup</div>
  );
};

export default SignUp;
