// import { Button, ConfigProvider, Form } from "antd";
// import React, { useState } from "react";
// import OTPInput from "react-otp-input";
// import { Link, useNavigate } from "react-router-dom";

// const SettingsOtpPage = () => {
//   const [otp, setOtp] = useState("");

//   const navigate = useNavigate();

//   const handleOTPSubmit = () => {
//     console.log("OTP:", otp);
//     navigate("/settings/update-password");
//   };

//   return (
//     <div className="mx-auto bg-transparent py-10 px-5 flex items-center">
//       <div className="w-full lg:w-2/3">
//         <div className="mb-10">
//           <p className="text-xl lg:text-3xl text-black font-semibold mb-6">
//             Verify OTP
//           </p>
//           <p className="md:text-lg lg:text-xl text-black">
//             To update your password, check email for OTP being sent. Enter it in
//             designated field to complete reset process.
//           </p>
//         </div>
//         <Form layout="vertical" className="bg-transparent w-full">
//           <Form.Item className="text-base-color ">
//             <div className="flex justify-center items-center">
//               <OTPInput
//                 inputStyle="text-xl md:text-7xl bg-transparent border border-[#013564] text-[#013564] rounded-lg mr-[20px]"
//                 value={otp}
//                 onChange={setOtp}
//                 numInputs={4}
//                 renderInput={(props) => <input {...props} />}
//               />
//             </div>
//           </Form.Item>
//           <div className="flex justify-between py-1">
//             <p className="text-black">Didn’t receive code?</p>
//             <Link
//               to="/settings/otp-page"
//               className="text-[#013564] hover:text-[#013564] font-semibold"
//             >
//               Resend
//             </Link>
//           </div>
//           <Form.Item>
//             <ConfigProvider
//               theme={{
//                 components: {
//                   Button: {
//                     defaultHoverBg: "#10578d",
//                     defaultHoverColor: "white",
//                   },
//                 },
//               }}
//             >
//               <Button
//                 className="w-full py-6 border border-[#10578d] hover:border-[#10578d] text-xl text-white bg-[#013564] font-semibold rounded-2xl mt-14"
//                 onClick={handleOTPSubmit}
//                 style={{background:"#013564"}}
//               >
//                 Verify
//               </Button>
//             </ConfigProvider>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default SettingsOtpPage;
