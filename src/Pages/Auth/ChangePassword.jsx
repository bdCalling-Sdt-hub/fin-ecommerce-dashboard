import { Button, ConfigProvider, Form, Input, Typography } from "antd";

import changePasswordImg from "/images/authImages/updatePass.png";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../Redux/api/authApi";
import Swal from "sweetalert2";

const ChangePassword = () => {
  // const [changePassword] =useChangePasswordMutation(); 
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("Success:", values);
  
    // try {
    //   const data = {
    //     newPassword: values.newPassword,
    //     oldPassword: values.currentPassword,
    //   };
      
    //   // Await the mutation response
    //   const res = await changePassword(data).unwrap();
    //   console.log('Change password response:', res);
  
    //   if (res.success) {
    //     Swal.fire({
    //       title: "Successfully Changed Password!",
    //       text: "Your password has been changed successfully.",
    //       icon: "success",
    //     });
    //     navigate("/signin");
    //   } else {
    //     Swal.fire({
    //       title: "Error",
    //       text: res.message || "There was an issue changing the password.",
    //       icon: "error",
    //     });
    //   }
    // } catch (error) {
    //   console.error("Error changing password:", error);
    //   const errorMessage = error.data?.message || "Something went wrong while changing the password.";
  
    //   Swal.fire({
    //     title: "Error",
    //     text: errorMessage,
    //     icon: "error",
    //   });
    // }
  };

  return (
    <div className="container w-[90%] mx-auto flex flex-col lg:flex-row justify-center gap-20 items-center min-h-screen bg-[#B1D7FA] py-20">
      <div className="">
        <img
          src={changePasswordImg}
          alt="logo"
          className="h-[520px] w-[520px]"
        />
      </div>
      <div className="h-[600px] w-1 bg-[#A3D3F9] hidden lg:block"></div>
      <div className="w-full lg:w-[50%]">
        <div className="">
          <div className="mb-10">
            <p className="text-3xl lg:text-[40px] text-base-color font-medium mb-8">
              Set new password
            </p>
          </div>
          <Form
            onFinish={onFinish}
            layout="vertical"
            className="bg-transparent w-full"
          >
            <Typography.Title level={4} style={{ color: "#F3F3F3" }}>
              Old password
            </Typography.Title>
            <Form.Item name="currentPassword" className="text-white ">
              <Input.Password
                placeholder="Enter your password"
                className="py-2 px-3 text-xl bg-site-color border-base-color text-base-color hover:bg-transparent hover:border-base-color focus:bg-transparent focus:border-button-color"
              />
            </Form.Item>
            <Typography.Title level={4} style={{ color: "#F3F3F3" }}>
              New password
            </Typography.Title>
            <Form.Item name="newPassword" className="text-white">
              <Input.Password
                placeholder="Enter your password"
                className="py-2 px-3 text-xl bg-site-color border-base-color text-base-color hover:bg-transparent hover:border-base-color focus:bg-transparent focus:border-button-color"
              />
            </Form.Item>
            <Typography.Title level={4} style={{ color: "#F3F3F3" }}>
              Re-enter new Password
            </Typography.Title>
            <Form.Item
              name="reEnterPassword"
              className="text-white"
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
                className="py-2 px-3 text-xl bg-site-color border-base-color text-base-color hover:bg-transparent hover:border-base-color focus:bg-transparent focus:border-button-color"
              />
            </Form.Item>

            <Form.Item>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      defaultHoverBg: "#97C6EA",
                      defaultHoverColor: "#1A1A1A",
                    },
                  },
                }}
              >
                <Button
                  className="w-full py-6 border border-[#97C6EA] hover:border-[#97C6EA] text-xl text-[#1A1A1A] bg-[#97C6EA] font-semibold rounded-2xl mt-14"
                  htmlType="submit"
                >
                  Change password
                </Button>
              </ConfigProvider>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default ChangePassword;
