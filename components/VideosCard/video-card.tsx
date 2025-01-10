import { View, TouchableOpacity } from "react-native";
import React from "react";
import { useVideoPlayer } from "expo-video";
import { VideoCardProps } from "../../types/video";
import CardContent from "./card-content";
import VPlayer from "../common/video-player";
import { useRouter } from "expo-router";

const VideoCard = ({ video }: VideoCardProps) => {
  const router = useRouter();
  const player = useVideoPlayer(video.videoUrl, (player) => {
    player.loop = false;
  });

  const handleVideoPress = () => {
    router.push(`/${video.id}`);
  };

  return (
    <TouchableOpacity
      className="flex-row p-4 border-b border-gray-200"
      onPress={handleVideoPress}
    >
      <View className="w-40 h-26 rounded-lg overflow-hidden">
        <VPlayer player={player} nativeControls={false} />
      </View>
      <CardContent video={video} />
    </TouchableOpacity>
  );
};

export default VideoCard;
