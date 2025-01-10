import { View, TouchableOpacity } from "react-native";
import React from "react";
import { VideoCardProps } from "../../types/video";
import CardContent from "./card-content";
import VPlayer from "../common/video-player";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
const VideoCard = ({ video }: VideoCardProps) => {
  const router = useRouter();
  const handleVideoPress = () => {
    router.push(`/${video.id}`);
  };

  return (
    <Animated.View
      entering={FadeInDown.duration(500).delay(Number(video.id) * 120)}
    >
      <TouchableOpacity
        className="flex-row p-4 border-gray-300 border rounded-lg"
        onPress={handleVideoPress}
      >
        <View className="w-40 h-26 rounded-lg overflow-hidden">
          <VPlayer
            url={video.videoUrl}
            nativeControls={false}
            autoPlay={false}
          />
        </View>
        <CardContent video={video} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default VideoCard;
