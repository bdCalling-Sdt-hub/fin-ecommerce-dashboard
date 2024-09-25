import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const aboutUsText = `
<p>Memorial Moments Magazine is your Magazine; let me explain:When you pick up a magazine, Better Living, Jet, Ebony, Vogue and open it… Let me stop, who buys magazines these days? We are in an electronic, digital, satellite, and now AI thriving world. Memorial Moments Magazine has been around since 2010 in paperback form. Now that we are in the time of the electronic boom, Memorial Moments Magazine has moved with the times. Those magazines would write about the famous celebrities who have passed on; they talk about different times of their lives, expressing their struggles, pitfalls, rejections, and acceptance that helped to define who they became to be. This is what Memorial Moments Magazine is extending to you and your family.</p>
<br/>
<p>Memorial Moments has given you a magazine that provides a platform for you to write your story about your Loved One, Veteran, or your Pet, who has stepped out of this life and into the next level of their life. The story you will write is from your point of view of who they were and how important they were to you in your life. You will have the opportunity to say what you did not get a chance to say at the funeral, of what most did not know, of the special things that loved one did just for YOU. You might want to write about a Veteran — that father, mom, uncle, grandparent — who served their Nation, may it be United Armed Forces, Police Force, Firefighter, and Security in many forms. Let’s not forget about that other family member that always showed love and loyalty, your Pet. Yes, you can write about that lovable little one or big one that would cheer you up and put a smile on your face when nobody else could. They are truly missed. You now have time and opportunity to celebrate and commemorate your Loved One, Veteran, and Pet in a very tasteful, professional, and respectful way that you did not have at the time of their departure.</p>
<br/>
<p>Memorial Moments Magazine has a staff that will handle the story of your Loved One, Veteran, or Pet with professionalism and care, as can be expected. Our staff will work earnestly for you to achieve your satisfaction. We will only publish what you have given us, staying within the boundaries of the Terms and Conditions. Memorial Moments Magazine is at your service to help you celebrate and commemorate the memories of your family member who has moved out of this life and into the next level of their life.</p>
<br/>
<p>Peace and Blessings,<br>Dr. Bruce B. Matthews, President and CEO</p>
`;

  const editor = useRef(null);
  const [content, setContent] = useState(aboutUsText);
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
        <p>About Us</p>
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
export default AboutUs;
