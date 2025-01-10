import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import VPlayer from "../common/video-player";

interface VideoUploaderProps {
  value?: string;
  onChange: (uri: string) => void;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({
  value,
  onChange,
}) => {
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

  return (
    <View className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
      {value ? (
        <View className="relative w-full h-full">
          <VPlayer
            url={value}
            autoPlay={false}
            style={{ width: "100%", height: "100%" }}
          />
          <TouchableOpacity
            onPress={() => onChange("")}
            className="absolute top-2 right-2 bg-red-500 rounded-full p-2"
          >
            <Ionicons name="trash-outline" size={20} color="white" />
          </TouchableOpacity>
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
