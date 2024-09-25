import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const privacyPolicyText = `
<p>This Privacy Policy describes how Memorial Moments ("we", "us", or "our") collects, uses, and shares your information when you use our mobile application ("App").</p>
<br/>
<p>Information We Collect</p>
<br/>
<p>When you use the Memorial Moments App, we may collect the following types of information:</p>
<br/>
<p>Profile Information:<br>
We collect information you provide when you edit your profile, including any changes to your name or email address.</p>
<br/>
<p>Story Information:<br>
When you add a story, we may collect the story title, date of birth, date of death (picked from the calendar), uploaded music, uploaded images, and story description.</p>
<br/>
<p>Subscription Information:<br>
If you choose to subscribe to our premium services, we collect payment information through our third-party payment processor, Stripe.</p>
<br/>
<p>Usage Information:<br>
We may collect information about how you interact with the App, including your use of features and preferences.</p>
<br/>
<p>How We Use Your Information<br>
We may use the information we collect for the following purposes:</p>
<br/>
<ul>
  <li>To provide and improve the App's functionality and user experience.</li>
  <li>To communicate with you about your account and App-related updates.</li>
  <li>To process payments for subscription services.</li>
  <li>To personalize your experience and provide targeted content and advertisements.</li>
  <li>To enforce our Terms of Service and other legal agreements.</li>
  <li>To comply with legal obligations.</li>
</ul>
<br/>
<p>Data Security<br>
We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.</p>
<br/>
<p>Data Retention<br>
We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted by law.</p>
<br/>
<p>Children's Privacy<br>
The Memorial Moments App is not intended for children under the age of 13. We do not knowingly collect or solicit personal information from children.</p>
`;

  const editor = useRef(null);
  const [content, setContent] = useState(privacyPolicyText);
  const navigate = useNavigate();

  const handleOnSave = () => {
    console.log(content);
  };

  return (
    <div className="min-h-screen py-2 px-2 rounded-lg">
      <div className="flex items-center gap-2 text-2xl font-bold px-2 py-4 bg-[#013564] text-[#E1E1E1] rounded-lg">
        <p className="cursor-pointer" onClick={() => navigate(-1)}>
          <LeftOutlined />
        </p>
        <p>Privacy Policy</p>
      </div>
      <div className="mt-5">
        <JoditEditor
          ref={editor}
          value={content}
          config={{ height: 650, theme: "light", readonly: false }}
          onBlur={(newContent) => setContent(newContent)}
        />
      </div>
      <Button
        block
        onClick={handleOnSave}
        style={{
          marginTop: "16px",
          padding: "1px",
          fontSize: "24px",
          color: "white",
          background: "#013564",
          height: "55px",
          border: "none",
        }}
      >
        Save
      </Button>
    </div>
  );
};

export default PrivacyPolicy;
