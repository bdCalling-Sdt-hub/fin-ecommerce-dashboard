import { Button, ConfigProvider, Form, Input, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";

const SettingsChangePassword = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/signin");
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
              />
            </Form.Item>
            <Typography.Title level={4} style={{ color: "black" }}>
              New password
            </Typography.Title>
            <Form.Item name="newPassword" className="text-black">
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
            <div className="flex justify-end">
              <Link
                to="/settings/forgot-password"
                className="text-[#013564] hover:text-[#1466ad] font-bold text-lg text-right"
              >
                Forgot Password?
              </Link>
            </div>
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
                  className="w-full py-6 border border-[#10578d] hover:border-[#10578d] text-xl text-white bg-[#013564] font-semibold rounded-2xl mt-10"
                  htmlType="submit"
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
