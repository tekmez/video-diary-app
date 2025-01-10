import { View, TouchableOpacity, Text } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import VPlayer from "@/components/common/video-player";
import { useVideoPlayer } from "expo-video";
import DetailContent from "@/components/detail-content";
import { useVideoStore } from "@/store/video-store";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function VideoDetail() {
  const { id } = useLocalSearchParams();
  const video = useVideoStore((state) => state.videos.find((v) => v.id === id));
  const removeVideo = useVideoStore((state) => state.removeVideo);

  const player = useVideoPlayer(video?.videoUrl, (player) => {
    player.loop = false;
    player.play();
  });

  const handleDelete = () => {
    removeVideo(id as string);
    router.back();
  };

  if (!video) return null;

  return (
    <View className="flex-1">
      <View className="w-full h-[250px]">
        <VPlayer player={player} style={{ width: "100%", height: "100%" }} />
      </View>
      <View className="flex-1">
        <DetailContent
          title={video.title}
          description={video.description}
          date={video.date}
        />
      </View>
      <Animated.View
        entering={FadeInDown.duration(400).delay(800)}
        className="relative bottom-12 left-0 right-0"
      >
        <TouchableOpacity
          onPress={handleDelete}
          className="bg-red-500 mx-5 p-4 rounded-lg"
        >
          <Text className="text-white text-center font-bold">Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
