import React, { useState } from "react";
import { Button, Avatar, message, Upload, Modal } from "antd";
import {
  PlusOutlined,
  PlayCircleOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { confirm } = Modal;

const Music = () => {
  const initialMusicList = [
    {
      id: 1,
      title: "Sad Tragic Dramatic Music Slow Melancholic",
      artist: "Denis-Pavlov-Music",
      image:
        "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60",
      audio: "https://example.com/audio1.mp3", // Sample audio URL
    },
    {
      id: 2,
      title: "Crying cello",
      artist: "Oleksi_Kalyna",
      image:
        "https://images.unsplash.com/photo-1525186402429-7868b7bd2fe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60",
      audio: "https://example.com/audio2.mp3",
    },
    {
      id: 3,
      title: "Jewish Longing",
      artist: "Ashot-Danielyan-Composer",
      image:
        "https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60",
      audio: "https://example.com/audio3.mp3",
    },
    {
      id: 4,
      title: "Tragedy And Grief",
      artist: "Ashot-Danielyan-Composer",
      image:
        "https://images.unsplash.com/photo-1542927349-99430b3b8d48?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60",
      audio: "https://example.com/audio4.mp3",
    },
    {
      id: 5,
      title: "Afterlife - Heavenly Instrumental",
      artist: "free-to-use-audio",
      image:
        "https://images.unsplash.com/photo-1493690172670-0ac6d13d43e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60",
      audio: "https://example.com/audio5.mp3",
    },
    {
      id: 6,
      title: "The death of the Egyptians",
      artist: "Oleksi_Kalyna",
      image:
        "https://images.unsplash.com/photo-1488381397757-10935f2fc3b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60",
      audio: "https://example.com/audio6.mp3",
    },
    {
      id: 7,
      title: "Auld Lang Syne - Nehmt Abschied Brüder...",
      artist: "JuliusH",
      image:
        "https://images.unsplash.com/photo-1505731134967-1f25e1e8733e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60",
      audio: "https://example.com/audio7.mp3",
    },
    {
      id: 8,
      title: "farewell to W.",
      artist: "Partlyon",
      image:
        "https://images.unsplash.com/photo-1558449030-ef30c1cb2330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=60",
      audio: "https://example.com/audio8.mp3",
    },
  ];

  const [musicList, setMusicList] = useState(initialMusicList);

  const handlePlay = (audioUrl) => {
    console.log(`Playing: ${audioUrl}`);
    message.info("Playing the song...");
    const audio = new Audio(audioUrl);
    audio.play();
  };
  const showDeleteConfirm = (id) => {
    confirm({
      title: (
        <span className="text-xl font-semibold text-black">
          Do you want to delete this music?
        </span>
      ),
      icon: <ExclamationCircleOutlined className="text-red-600" />,
      //   content: (
      //     <div className="text-gray-700">
      //       This action cannot be undone. Please confirm if you want to proceed.
      //     </div>
      //   ),
      okText: "Delete",
      //   okType: "danger",
      cancelText: "No",
      centered: true,
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log("Delete canceled");
      },
      okButtonProps: {
        className: "bg-[#013564] text-white font-semibold",
      },
      cancelButtonProps: {
        className:
          "bg-gray-300 hover:bg-gray-400 border-none text-black font-semibold",
      },
      className: "custom-modal",
    });
  };

  const handleDelete = (id) => {
    setMusicList(musicList.filter((item) => item.id !== id));
    message.success("Song deleted successfully.");
  };

  const handleAddMusic = (file) => {
    const objectUrl = URL.createObjectURL(file);
    const newSong = {
      id: musicList.length + 1,
      title: file.name,
      artist: "Unknown Artist", // You might want to prompt the user to enter this
      image: "https://via.placeholder.com/100", // Placeholder image
      audio: objectUrl,
    };
    setMusicList([...musicList, newSong]);
    message.success("Song added successfully.");
  };

  return (
    <div className="rounded-lg mx-auto">
      <h2 className="text-2xl font-bold bg-[#013564] text-white p-4 rounded-t-lg">
        Music
      </h2>
      <div className="flex justify-center items-center bg-white p-4 text-white">
        <Upload
          accept=".mp3,.wav,.aac"
          beforeUpload={(file) => {
            handleAddMusic(file);
            return false; // Prevent the upload action
          }}
          showUploadList={false}
        >
          <Button
            className="bg-white text-[#013564] border-2 border-[#013564] w-full h-12 font-bold px-4 py-2 rounded-lg"
            icon={<PlusOutlined />}
          >
            Add Music From Your Library
          </Button>
        </Upload>
      </div>
      <div className="bg-white px-10">
        {musicList.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-2 border-b border-gray-200"
          >
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-700 w-8">
                {index + 1}.
              </span>
              <Avatar src={item.image} size="medium" className="ml-4" />
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.artist}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                className="text-gray-500 border-none"
                icon={<PlayCircleOutlined />}
                onClick={() => handlePlay(item.audio)}
              />
              <Button
                className="text-gray-500 border-none"
                icon={<DeleteOutlined />}
                onClick={() => showDeleteConfirm(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Music;
