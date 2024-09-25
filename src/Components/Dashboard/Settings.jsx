import { Col, Row } from "antd";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Setting = () => {
  return (
    <div className="container mx-auto">
      <Row gutter={[0, 30]}>
        <Col span={24}>
          <NavLink
            to="/settings/change-password"
            className="flex items-center justify-between text-lg font-medium text-black hover:text-gray-600"
          >
            <p className="">Change Password</p>
            <FaArrowRightToBracket cursor="pointer" />
          </NavLink>
          <hr className="mt-4 border border-[#037EEE]" />
        </Col>
        <Col span={24}>
          <NavLink
            to="/settings/privacy-policy"
            className="flex items-center justify-between text-lg font-medium text-black hover:text-gray-600"
          >
            <p className="">Privacy Policy</p>
            <FaArrowRightToBracket cursor="pointer" />
          </NavLink>
          <hr className="mt-4 border border-[#037EEE]" />
        </Col>
        <Col span={24}>
          <NavLink
            to="/settings/terms-and-condition"
            className="flex items-center justify-between text-lg font-medium text-black hover:text-gray-600"
          >
            <p className="">Terms And Condition</p>
            <FaArrowRightToBracket cursor="pointer" />
          </NavLink>
          <hr className="mt-4 border border-[#037EEE]" />
        </Col>
        <Col span={24}>
          <NavLink
            to="/settings/about-us"
            className="flex items-center justify-between text-lg font-medium text-black hover:text-gray-600"
          >
            <p className="">About Us</p>
            <FaArrowRightToBracket cursor="pointer" />
          </NavLink>
          <hr className="mt-4 border border-[#037EEE]" />
        </Col>
      </Row>
    </div>
  );
};

export default Setting;
