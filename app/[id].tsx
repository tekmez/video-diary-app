import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { sampleVideos } from "@/types/video";
import VPlayer from "@/components/common/video-player";
import { useVideoPlayer } from "expo-video";
import DetailContent from "@/components/detail-content";

export default function VideoDetail() {
  const { id } = useLocalSearchParams();
  const video = sampleVideos.find((v) => v.id === id);

  const player = useVideoPlayer(video?.videoUrl, (player) => {
    player.loop = false;
    player.play();
  });

  if (!video) return null;

  return (
    <View className="flex-1">
      <View className="w-full h-[250px]">
        <VPlayer player={player} style={{ width: "100%", height: "100%" }} />
      </View>
      <DetailContent
        title={video.title}
        description={video.description}
        date={video.date}
      />
    </View>
  );
}
