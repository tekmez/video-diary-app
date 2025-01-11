import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import * as FileSystem from "expo-file-system";
import { FFmpegKit } from "ffmpeg-kit-react-native";
import VPlayer from "../common/video-player";
import { VideoScrubber } from "../common/video-scrubber";

interface VideoUploaderProps {
  value?: string;
  onChange: (uri: string) => void;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({
  value,
  onChange,
}) => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(5);
  const [videoDuration, setVideoDuration] = useState(30); // Default duration
  const [trimmedVideo, setTrimmedVideo] = useState<string | null>(null);

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "videos",
      allowsEditing: false,
      // videoMaxDuration: 5,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      // Video seçildiğinde süreyi FFmpeg ile al
      if (result.assets[0].duration) {
        setVideoDuration(Math.floor(result.assets[0].duration));
        setEndTime(Math.min(5, Math.floor(result.assets[0].duration)));
      }
      onChange(result.assets[0].uri);
    }
  };

  const { mutate: trimVideo, isPending } = useMutation({
    mutationFn: async () => {
      if (!value) return;
      const outputUri = `${FileSystem.cacheDirectory}trimmed_video.mp4`;
      const duration = endTime - startTime;
      const command = `-i ${value} -ss ${startTime} -t ${duration} -c:v libx264 -c:a aac ${outputUri}`;
      await FFmpegKit.execute(command);
      return outputUri;
    },
    onSuccess: (result) => {
      setTrimmedVideo(result || null);
    },
    onError: (error) => {
      console.error("FFMPEG error:", error);
    },
  });

  const handleScrubChange = ([start, end]: [number, number]) => {
    setStartTime(start);
    setEndTime(end);
  };

  return (
    <View className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
      {value ? (
        <View className="relative w-full h-full">
          <VPlayer
            url={trimmedVideo || value}
            autoPlay={false}
            style={{ width: "100%", height: "100%" }}
          />
          <TouchableOpacity
            onPress={() => onChange("")}
            className="absolute top-2 right-2 bg-red-500 rounded-full p-2"
          >
            <Ionicons name="trash-outline" size={20} color="white" />
          </TouchableOpacity>
          <View className="absolute bottom-0 w-full bg-black bg-opacity-70">
            <VideoScrubber
              duration={videoDuration}
              startTime={startTime}
              endTime={endTime}
              onScrubChange={handleScrubChange}
            />
            <TouchableOpacity
              onPress={() => trimVideo()}
              disabled={isPending}
              className={`mx-4 mb-4 py-2 px-4 rounded-lg ${
                isPending ? "bg-gray-500" : "bg-[#1FB28A]"
              }`}
            >
              <Text className="text-white text-center font-medium">
                {isPending ? "İşleniyor..." : "Videoyu Kırp"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={pickVideo}
          className="w-full h-full items-center justify-center"
        >
          <Ionicons name="cloud-upload-outline" size={40} color="gray" />
          <Text className="text-sm text-gray-500 mt-2">Video Yükle</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
