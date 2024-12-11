import { LeftOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import JoditEditor from "jodit-react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useAddSettingsMutation,
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../../Redux/api/settingsApi";

const TermsAndCondition = () => {
  const editor = useRef(null);
  const navigate = useNavigate();

  const [content, setContent] = useState("");

  const {
    data: getSettingsData,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetSettingsQuery();
  console.log(getSettingsData?.data.termsOfService);

  // Mutations for adding and updating Terms & Condition
  const [addSettings, { isLoading: isAdding }] = useAddSettingsMutation();
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  // Load Terms & Condition data on component mount
  useEffect(() => {
    if (getSettingsData?.data.termsOfService) {
      setContent(getSettingsData.data.termsOfService); // Load the latest policy
    }
  }, [getSettingsData]);

  const handleOnSave = async () => {
    try {
      if (getSettingsData?.data.termsOfService) {
        // Update existing Terms & Condition
        await updateSettings({ termsOfService: content }).unwrap();
        toast.success("Terms & Condition updated successfully!");
      } else {
        // Add a new Terms & Condition if not existing
        await addSettings({ termsOfService: content }).unwrap();
        toast.success("Terms & Condition added successfully!");
      }
      refetch(); // Refresh the data after save
    } catch (error) {
      toast.error("Failed to save Terms & Condition. Please try again.");
      console.error("Save error:", error);
    }
  };

  // Show loading state while fetching data
  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading Terms & Condition..." />
      </div>
    );
  }

  // Show error message if fetch fails
  if (fetchError) {
    return (
      <div className="text-white">
        Error loading Terms & Condition. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen py-2 px-2 rounded-lg">
      <div className="flex items-center gap-2 text-2xl font-bold px-2 py-4 bg-[#013564] text-[#E1E1E1] rounded-lg">
        <p className="cursor-pointer" onClick={() => navigate(-1)}>
          <LeftOutlined />
        </p>
        <p>Terms & Condition</p>
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
        loading={isAdding || isUpdating} // Show loading while saving
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
        Save Changes
      </Button>
    </div>
  );
};

export default TermsAndCondition;
