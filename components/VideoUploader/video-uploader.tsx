import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import VPlayer from "../common/video-player";
import { VideoScrubber } from "../common/video-scrubber";
import { useVideoUploader } from "../../hooks/useVideoUploader";
import { useVideoTrimmer } from "../../hooks/useVideoTrimmer";
import { VideoUploaderProps } from "@/types/video";

export const VideoUploader: React.FC<VideoUploaderProps> = ({
  value,
  onChange,
}) => {
  const { currentVideo, videoDuration, pickVideo, handleReset } =
    useVideoUploader({
      onChange,
      initialValue: value,
    });

  const {
    startTime,
    endTime,
    trimmedVideo,
    isPending,
    handleScrubChange,
    trimVideo,
  } = useVideoTrimmer({
    currentVideo,
    onChange,
  });

  const videoToDisplay = trimmedVideo || currentVideo || value;

  return (
    <View className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
      {videoToDisplay ? (
        <View className="relative w-full h-full">
          <VPlayer
            key={videoToDisplay}
            url={videoToDisplay}
            autoPlay={false}
            style={{ width: "100%", height: "100%" }}
          />
          <TouchableOpacity
            onPress={handleReset}
            className="absolute top-2 right-2 bg-red-500 rounded-full p-2"
          >
            <Ionicons name="trash-outline" size={20} color="white" />
          </TouchableOpacity>

          {!trimmedVideo && (
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
                  isPending ? "bg-gray-500" : "bg-orange-500"
                }`}
              >
                <Text className="text-white text-center font-medium">
                  {isPending ? "Processing..." : "Trim Video"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <TouchableOpacity
          onPress={pickVideo}
          className="w-full h-full items-center justify-center"
        >
          {isPending ? (
            <Text className="text-sm text-gray-500">Video Processing...</Text>
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={40} color="gray" />
              <Text className="text-sm text-gray-500 mt-2">Upload Video</Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};
