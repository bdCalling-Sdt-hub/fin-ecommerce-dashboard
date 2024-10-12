import { Button, ConfigProvider, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useChangePasswordMutation } from "../../../Redux/api/authApi";

const SettingsChangePassword = () => {
    const [changePassword] =useChangePasswordMutation(); 
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("Success:", values);
  
    try {
      const data = {
        newPassword: values.newPassword,
        oldPassword: values.currentPassword,
      };
      
      // Await the mutation response
      const res = await changePassword(data).unwrap();
      console.log('Change password response:', res);
  
      if (res.success) {
        Swal.fire({
          title: "Successfully Changed Password!",
          text: "Your password has been changed successfully.",
          icon: "success",
        });
        navigate("/signin");
      } else {
        Swal.fire({
          title: "Error",
          text: res.message || "There was an issue changing the password.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      const errorMessage = error.data?.message || "Something went wrong while changing the password.";
  
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
      });
    }
  };
 
  return (
    <div className="mx-auto min-h-[90vh] bg-transparent py-10 px-5 ">
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
          <Form onFinish={onFinish} layout="vertical" className="bg-transparent w-full">
  <Typography.Title level={4} style={{ color: "black" }}>
    Current password
  </Typography.Title>
  <Form.Item name="currentPassword" className="text-black">
    <Input.Password
      placeholder="Enter your password"
      className="py-2 px-3 text-xl bg-transparent border-black text-black hover:bg-transparent hover:border-blue-600 focus:bg-transparent focus:border-blue-700"
    />
  </Form.Item>
  
  <Typography.Title level={4} style={{ color: "black" }}>
    New password
  </Typography.Title>
  <Form.Item
    name="newPassword"
    className="text-black"
    rules={[
      { required: true, message: "Please input your new password!" },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || value !== getFieldValue("currentPassword")) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("New password cannot be the same as current password!"));
        },
      }),
    ]}
  >
    <Input.Password
      placeholder="Enter your password"
      className="py-2 px-3 text-xl bg-transparent border-black text-black hover:bg-transparent hover:border-blue-600 focus:bg-transparent focus:border-blue-700"
    />
  </Form.Item>

  <Typography.Title level={4} style={{ color: "black" }}>
    Re-enter new Password
  </Typography.Title>
  <Form.Item
    name="reEnterPassword"
    className="text-black"
    rules={[
      { required: true, message: "Please confirm your password!" },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue("newPassword") === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("The two passwords that you entered do not match!"));
        },
      }),
    ]}
  >
    <Input.Password
      placeholder="Re-enter your new password"
      className="py-2 px-3 text-xl bg-transparent border-black text-black hover:bg-transparent hover:border-blue-600 focus:bg-transparent focus:border-blue-700"
    />
  </Form.Item>

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
        style={{ background: '#013564' }}
      >
        Change password
      </Button>
    </ConfigProvider>
  </Form.Item>
</Form>

        </ConfigProvider>
      </div>
    </div>
  );
};

export default SettingsChangePassword;
