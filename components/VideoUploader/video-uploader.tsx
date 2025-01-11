import React, { useState } from "react";
import { View, TouchableOpacity, Text, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useMutation } from "@tanstack/react-query";
import * as FileSystem from "expo-file-system";
import { FFmpegKit } from "ffmpeg-kit-react-native";
import VPlayer from "../common/video-player";

interface VideoUploaderProps {
  value?: string;
  onChange: (uri: string) => void;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({
  value,
  onChange,
}) => {
  const [startTime, setStartTime] = useState(0); // Başlangıç zamanı
  const [trimmedVideo, setTrimmedVideo] = useState<string | null>(null); // Kesilmiş video URI
  const [endTime, setEndTime] = useState(5); // Seçim bitişi (varsayılan: 5 saniye)
  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "videos",
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      onChange(result.assets[0].uri);
    }
  };
  const { mutate: trimVideo, isPending } = useMutation({
    mutationFn: async () => {
      if (!value) return;
      const outputUri = `${FileSystem.cacheDirectory}trimmed_video.mp4`;
      const command = `-i ${value} -ss ${startTime} -t 5 -c:v libx264 -c:a aac ${outputUri}`;
      await FFmpegKit.execute(command);
      return outputUri;
    },
    onSuccess: (result) => {
      setTrimmedVideo(result || null); // Kesilmiş video URI
    },
    onError: (error) => {
      console.error("FFMPEG error:", error);
    },
  });

  const cropVideo = () => {
    trimVideo();
  };

  return (
    <View className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
      {value ? (
        <View className="relative w-full h-full">
          <VPlayer
            url={trimmedVideo || value} // Kesilmiş video varsa onu göster
            autoPlay={false}
            style={{ width: "100%", height: "100%" }}
          />
          <TouchableOpacity
            onPress={() => onChange("")}
            className="absolute top-2 right-2 bg-red-500 rounded-full p-2"
          >
            <Ionicons name="trash-outline" size={20} color="white" />
          </TouchableOpacity>
          <View className="absolute bottom-0 w-full px-4 py-2 bg-black bg-opacity-50">
            <Text className="text-white text-sm mb-1">Select 5s Segment</Text>
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={0}
              maximumValue={5}
              value={startTime}
              onValueChange={setStartTime}
              minimumTrackTintColor="#1FB28A"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#1FB28A"
            />
            <Button
              title={isPending ? "Processing..." : "Trim Video"}
              onPress={() => trimVideo()}
              disabled={isPending}
            />
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={pickVideo}
          className="w-full h-full items-center justify-center"
        >
          <Ionicons name="cloud-upload-outline" size={40} color="gray" />
          <Text className="text-sm text-gray-500 mt-2">Upload Video</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
