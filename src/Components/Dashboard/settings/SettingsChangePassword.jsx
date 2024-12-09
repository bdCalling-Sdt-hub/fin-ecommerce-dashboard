import { Button, ConfigProvider, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../../Redux/api/settingsApi";
import { toast } from "sonner";

const SettingsChangePassword = () => {
  const navigate = useNavigate();
  const [changePassword] = useChangePasswordMutation();

  const onFinish = async (values) => {
    console.log("password Values", values);
    try {
      const data = {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      };
      console.log("Request payload:", data);

      // const token = localStorage.getItem("authToken");
      // if (!token) {
      //   toast.error("Session expired. Please start the reset process again.");
      //   navigate("/forgot-password");
      //   return;
      // }

      const response = await changePassword(data).unwrap();
      console.log("Response:", response);

      if (response.success) {
        toast.success("Password updated successfully!");
        navigate("/signin");
      } else {
        toast.error(response.message || "Failed to update password.");
      }
    } catch (error) {
      console.log("Error updating password:", error);
      toast.error(
        error?.data?.message || "An error occurred while updating the password."
      );
      // if (error.response) {
      //   console.error("Validation error details:", error.response.data);
      //   toast.error(
      //     error.response.data.message ||
      //       "Failed to update password. Please try again."
      //   );
      // } else {
      //   toast.error("An unexpected error occurred. Please try again.");
      // }
    }
  };
  return (
    <div className="mx-auto bg-transparent py-10 px-5 flex items-center">
      <div className="w-full lg:w-2/3">
        <ConfigProvider
          theme={{
            components: {
              Input: {
                colorTextPlaceholder: "rgba(61,61,61,0.25)",
              },
            },
          }}
        >
          <Form
            onFinish={onFinish}
            layout="vertical"
            className="bg-transparent w-full"
          >
            <Typography.Title level={4} style={{ color: "black" }}>
              Current password
            </Typography.Title>
            <Form.Item name="currentPassword" className="text-black">
              <Input.Password
                placeholder="Enter your password"
                className="py-2 px-3 text-xl bg-transparent border-black text-black hover:bg-transparent hover:border-blue-600 focus:bg-transparent focus:border-blue-700"
                rules={[
                  {
                    required: true,
                    message: "Please input your current password!",
                  },
                ]}
              />
            </Form.Item>
            <Typography.Title level={4} style={{ color: "black" }}>
              New password
            </Typography.Title>
            <Form.Item name="newPassword" className="text-black">
              <Input.Password
                placeholder="Enter your password"
                className="py-2 px-3 text-xl bg-transparent border-black text-black hover:bg-transparent hover:border-blue-600 focus:bg-transparent focus:border-blue-700"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              />
            </Form.Item>
            <Typography.Title level={4} style={{ color: "black" }}>
              Re-enter new Password
            </Typography.Title>
            <Form.Item
              name="reEnterPassword"
              className="text-black"
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
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
                className="py-2 px-3 text-xl bg-transparent border-black text-black hover:bg-transparent hover:border-blue-600 focus:bg-transparent focus:border-blue-700"
              />
            </Form.Item>
            {/* <div className="flex justify-end">
              <Link
                to="/settings/forgot-password"
                className="text-[#013564] hover:text-[#1466ad] font-bold text-lg text-right"
              >
                Forgot Password?
              </Link>
            </div> */}
            <Form.Item>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      defaultHoverBg: "#10578d",
                      defaultHoverColor: "white",
                    },
                  },
                }}
              >
                <Button
                  className="w-full py-6 border border-[#10578d] hover:border-[#10578d] text-xl text-white font-semibold rounded-2xl mt-10"
                  htmlType="submit"
                  style={{ background: "#013564" }}
                >
                  Change password
                </Button>
              </ConfigProvider>
            </Form.Item>
            ;
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default SettingsChangePassword;
