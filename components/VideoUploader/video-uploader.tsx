import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import * as FileSystem from "expo-file-system";
import { FFmpegKit, ReturnCode } from "ffmpeg-kit-react-native";
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
  const [videoDuration, setVideoDuration] = useState(30);
  const [trimmedVideo, setTrimmedVideo] = useState<string | null>(null);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    if (trimmedVideo) {
      checkVideoReady(trimmedVideo);
    }
  }, [trimmedVideo]);

  const checkVideoReady = async (videoUri: string) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(
        videoUri.replace("file://", "")
      );
      if (fileInfo.exists && fileInfo.size > 0) {
        setIsVideoReady(true);
      } else {
        setIsVideoReady(false);
      }
    } catch (error) {
      console.error("Video hazırlık kontrolü hatası:", error);
      setIsVideoReady(false);
    }
  };

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "videos",
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      if (result.assets[0].duration) {
        setVideoDuration(Math.floor(result.assets[0].duration));
        setEndTime(Math.min(5, Math.floor(result.assets[0].duration)));
      }
      const uri = formatVideoUri(result.assets[0].uri);
      setCurrentVideo(uri);
      onChange(uri);
      setTrimmedVideo(null);
      setIsVideoReady(true);
    }
  };

  const formatVideoUri = (uri: string) => {
    if (Platform.OS === "ios") {
      return uri.startsWith("file://") ? uri : `file://${uri}`;
    }
    return uri;
  };

  const { mutate: trimVideo, isPending } = useMutation({
    mutationFn: async () => {
      if (!currentVideo) return null;
      setIsVideoReady(false);

      const timestamp = new Date().getTime();
      const filename = `trimmed_${timestamp}.mp4`;
      const outputUri = `${FileSystem.cacheDirectory}${filename}`;

      const startTimeInSeconds = startTime / 1000;
      const endTimeInSeconds = endTime / 1000;
      const durationInSeconds = endTimeInSeconds - startTimeInSeconds;

      const command = `-ss ${startTimeInSeconds.toFixed(
        2
      )} -i "${currentVideo}" -t ${durationInSeconds.toFixed(
        2
      )} -c:v h264 -c:a aac -movflags +faststart "${outputUri}"`;

      try {
        const session = await FFmpegKit.execute(command);
        const returnCode = await session.getReturnCode();

        if (ReturnCode.isSuccess(returnCode)) {
          await new Promise((resolve) => setTimeout(resolve, 500));

          const fileInfo = await FileSystem.getInfoAsync(outputUri);
          if (fileInfo.exists && fileInfo.size > 0) {
            return formatVideoUri(outputUri);
          }
        } else {
          throw new Error("Video trimming process failed");
        }
        return null;
      } catch (error) {
        Alert.alert(
          "Error",
          "Video trimming process failed. Please try again."
        );
        return null;
      }
    },
    onSuccess: async (result) => {
      if (result) {
        const fileInfo = await FileSystem.getInfoAsync(
          result.replace("file://", "")
        );
        if (fileInfo.exists && fileInfo.size > 0) {
          setTrimmedVideo(result);
          onChange(result);
          setIsVideoReady(true);
        } else {
          Alert.alert("Error", "Trimmed video file not found.");
        }
      }
    },
    onError: (error) => {
      console.error("FFMPEG error:", error);
      Alert.alert("Error", "Video trimming process failed. Please try again.");
      setIsVideoReady(false);
    },
  });

  const handleScrubChange = ([start, end]: [number, number]) => {
    setStartTime(start);
    setEndTime(end);
  };

  const handleReset = () => {
    setTrimmedVideo(null);
    setCurrentVideo(null);
    setIsVideoReady(false);
    onChange("");
  };

  const videoToDisplay = trimmedVideo || currentVideo || value;
  return (
    <View className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
      {videoToDisplay && isVideoReady ? (
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
                {isPending ? "Processing..." : "Trim Video"}
              </Text>
            </TouchableOpacity>
          </View>
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
