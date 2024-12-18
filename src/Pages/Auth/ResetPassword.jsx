import { Button, ConfigProvider, Form, Input } from "antd";
// import logo from "../../../public/images/logo.png";
import logo from "/images/4 1.png";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../Redux/api/authApi";
import { toast } from "sonner";
import icon from "../../../public/images/icon/forgate password.png";
import Swal from "sweetalert2";


const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();

  const onFinish = async (values) => {

    if (values.newPassword && values.reEnterPassword) {
      Swal.fire({
        title: "Password updated successfully!!",
        text: "The user has been success!.",
        icon: "success",
      });
      navigate("/signin"); 
    }
    // try {
    //   const data = {
    //     newPassword: values.newPassword,
    //     confirmPassword: values.reEnterPassword,
    //   };
    //   console.log("Request payload:", data);

    //   const token = localStorage.getItem("verifiedOtpToken");
    //   if (!token) {
    //     toast.error("Session expired. Please start the reset process again.");
    //     navigate("/forgot-password");
    //     return;
    //   }

    //   const response = await resetPassword(data).unwrap();
    //   console.log("Response:", response);

    //   if (response.success) {
    //     toast.success("Password updated successfully!");
    //     navigate("/signin");
    //   }
    // } catch (error) {
    //   console.log("Error updating password:", error);
    //   // if (error.response) {
    //   //   console.error("Validation error details:", error.response.data);
    //   //   toast.error(
    //   //     error.response.data.message ||
    //   //       "Failed to update password. Please try again."
    //   //   );
    //   // } else {
    //   //   toast.error("An unexpected error occurred. Please try again.");
    //   // }
    // }
  };

  return (
    <div className="lg:w-full mx-auto flex flex-col lg:flex-row justify-center gap-20 items-center min-h-screen py-20 px-5 bg-[#F4F7FA]">
     
      <div className=" px-10 rounded-lg py-6 w-1/2">
        <div className="">
          <div className="mb-10 flex flex-col gap-4">
            <div className="flex justify-center"><span className="bg-[#E6EDF7] rounded-full p-3"><img src={icon} alt="" className="h-14 w-14" /></span></div>
            <p className="sm:text-3xl lg:text-4xl  text-[#000] font-bold text-center">
              Set New password
            </p>
            {/* <p className="text-sm md:text-xl text-base-color">
              To update your password, check email for OTP being sent. Enter it
              in designated field to complete reset process.
            </p> */}
          </div>
          <ConfigProvider
            theme={{
              components: {
                Form: {
                  colorError: "#F44848",
                  labelColor: "#1F2852",
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
              onFinish={onFinish}
              layout="vertical"
              className="bg-transparent w-full"
            >
              <Form.Item
                name="newPassword"
                className="text-white"
                label={<p style={{ fontWeight: "500" }}>New password</p>}
              >
                <Input.Password
                  placeholder="Enter your password"
                  className="py-2 px-3 sm:text-xl bg-white border-slate-200  text-black"
                />
              </Form.Item>
              <Form.Item
                name="reEnterPassword"
                className="text-white"
                label="Confirm new Password"
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  className="py-2 px-3 sm:text-xl bg-white border-slate-200  text-black"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  className="w-full py-6 border text-lg sm:text-xl text-white bg-[#013564] border-[#97C6EA] hover:border-[#97C6EA] rounded-none  font-semibold  mt-5 lg:mt-8"
                  htmlType="submit"
                  style={{ background: "#E6C379", border: "black", color: "black" }}
                >
                  Change password
                </Button>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
