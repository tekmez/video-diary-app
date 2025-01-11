import { SafeAreaView, Text, FlatList, View } from "react-native";
import { Video } from "@/types/video";
import VideoCard from "@/components/VideosCard/video-card";
import { useVideoStore } from "@/store/video-store";

export default function Home() {
  const videos = useVideoStore((state) => state.videos);
  const renderItem = ({ item }: { item: Video }) => <VideoCard video={item} />;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text className="text-2xl font-bold mb-4 text-center">Video Diary</Text>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        className="flex-1 p-4"
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-4" />}
      />
    </SafeAreaView>
  );
}
