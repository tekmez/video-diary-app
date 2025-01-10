import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import { Video } from "../../types/video";
import { useEvent } from "expo";

interface VideoCardProps {
  video: Video;
}

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
      {/* Sol taraf - Video */}
      <TouchableOpacity
        className="w-40 h-28 rounded-lg overflow-hidden"
        onPress={handleVideoPress}
      >
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          contentFit="cover"
          nativeControls={false}
        />
      </TouchableOpacity>

      {/* Sağ taraf - Bilgiler */}
      <View className="flex-1 ml-4">
        <Text className="text-lg font-semibold">{video.title}</Text>
        <Text className="text-gray-600 text-sm mt-1">{video.description}</Text>
        <Text className="text-gray-400 text-xs mt-2">{video.date}</Text>
      </View>
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  video: {
    width: 156,
    height: 108,
  },
});
