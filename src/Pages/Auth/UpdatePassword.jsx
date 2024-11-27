import { Button, ConfigProvider, Form, Input, Typography } from "antd";
// import logo from "../../../public/images/logo.png";
import logo from "/images/4 1.png";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../Redux/api/authApi";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [updatePassword] = useResetPasswordMutation();
  const onFinish = async(values) => {
    // console.log("Success:", values);
    const otpToken = localStorage.getItem('otpToken');
    // console.log('otptoken', otpToken);
    const data ={
      password:values.newPassword,
      verifyToken: otpToken
  }
  // console.log('data response ', data);
    // try {
    //   // Await the mutation response
    //   const res = await updatePassword(data).unwrap();
    //   // console.log('respon change password', res)
    
    //   if (res.success) {
    //     Swal.fire({
    //       title: "Password Updated Successfully!!",
    //       text: "The user has been success!.",
    //       icon: "success",
    //     });
    //     navigate("/signin");
    //   } else {
    //     Swal.fire({
    //       title: "Error",
    //       text: "There was an issue user password .",
    //       icon: "error",
    //     });
    //   }
    // } catch (error) {
    //   console.error("Error user forgate:", error);
    //   if(error.data){
    //     Swal.fire({
    //         title: `${error.data.message}`,
    //         text: "Something went wrong while password.",
    //         icon: "error",
    //       });
    //   }
      
    // }
  
  };

  return (
    <div className="lg:w-full mx-auto flex flex-col lg:flex-row justify-center gap-20 items-center min-h-screen py-20 px-5">
      <div className="">
        <img src={logo} alt="logo" width={400} className="rounded-2xl" />
      </div>
      <div className="bg-[#E6ECF3] px-10 rounded-lg py-6 w-1/2">
        <div className="">
          <div className="mb-10 flex flex-col gap-4">
            <p className="sm:text-3xl lg:text-4xl text-[#023E8A] font-medium text-center">
              New password
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
                label={<p style={{ fontWeight: "500" }}>"New password"</p>}
              >
                <Input.Password
                  placeholder="Enter your password"
                  className="py-2 px-3 sm:text-xl bg-transparent border-black text-black hover:bg-[#8bc4fa] focus:bg-transparent focus:border-black"
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
                  className="py-2 px-3 sm:text-xl bg-transparent border-black text-black hover:bg-[#8bc4fa] focus:bg-transparent focus:border-black"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  className="w-full py-6 border text-lg sm:text-xl text-white bg-[#013564] border-[#97C6EA] hover:border-[#97C6EA]  font-semibold rounded-2xl mt-5 lg:mt-8"
                  htmlType="submit"
                  style={{background:"#3399ff", border:"white"}}
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
export default ChangePassword;
