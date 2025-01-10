import { View, TouchableOpacity } from "react-native";
import React from "react";
import { useVideoPlayer } from "expo-video";
import { VideoCardProps } from "../../types/video";
import { useEvent } from "expo";
import CardContent from "./card-content";
import VPlayer from "../common/video-player";

const VideoCard = ({ video }: VideoCardProps) => {
  const player = useVideoPlayer(video.videoUrl, (player) => {
    player.loop = false;
  });
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const handleVideoPress = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  return (
    <View className="flex-row p-4 border-b border-gray-200">
      <TouchableOpacity
        className="w-40 h-26 rounded-lg overflow-hidden"
        onPress={handleVideoPress}
      >
        <VPlayer player={player} nativeControls={false} />
      </TouchableOpacity>
      <CardContent video={video} />
    </View>
  );
};

export default VideoCard;
