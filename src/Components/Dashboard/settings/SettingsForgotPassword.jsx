// import { Button, ConfigProvider, Form, Input, Typography } from "antd";
// import { useNavigate } from "react-router-dom";

// const SettingsForgotPassword = () => {
//   const navigate = useNavigate();
//   const onFinish = (values) => {
//     console.log("Success:", values);
//     navigate("/settings/otp-page");
//   };
//   return (
//     <div className=" min-h-[90vh] mx-auto bg-transparent py-10 px-5 ">
//       <div className="w-full lg:w-2/3">
//         <div className="mb-8">
//           <p className="text-xl lg:text-3xl text-black font-semibold mb-6">
//             Forgot Password
//           </p>
//           <p className="md:text-lg lg:text-xl text-black">
//             Enter your email address to get a verification code for resetting
//             your password.
//           </p>
//         </div>
//         <ConfigProvider
//           theme={{
//             components: {
//               Input: {
//                 colorTextPlaceholder: "rgba(61,61,61,0.25)",
//               },
//             },
//           }}
//         >
//           <Form
//             onFinish={onFinish}
//             layout="vertical"
//             className="bg-transparent w-full"
//           >
//             <Typography.Title level={4} style={{ color: "black" }}>
//               Email
//             </Typography.Title>
//             <Form.Item name="email" className="text-black">
//               <Input
//                 placeholder="Enter your mail"
//                 className="py-2 px-3 text-xl bg-transparent border-black text-black hover:bg-transparent hover:border-blue-600 focus:bg-transparent focus:border-blue-700"
//               />
//             </Form.Item>
//             <Form.Item>
//               <ConfigProvider
//                 theme={{
//                   components: {
//                     Button: {
//                       defaultHoverBg: "#10578d",
//                       defaultHoverColor: "white",
//                     },
//                   },
//                 }}
//               >
//                 <Button
//                   className="w-full py-6 border border-[#10578d] hover:border-[#10578d] text-xl text-white bg-[#013564] font-semibold rounded-2xl mt-14"
//                   htmlType="submit"
//                   style={{background:"#013564"}}
//                 >
//                   Send OTP
//                 </Button>
//               </ConfigProvider>
//             </Form.Item>
//           </Form>
//         </ConfigProvider>
//       </div>
//     </div>
//   );
// };

// export default SettingsForgotPassword;
