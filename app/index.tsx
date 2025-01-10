import { SafeAreaView, Text, FlatList } from "react-native";
import VideoCard from "./components/Video/video-card";
import { sampleVideos, Video } from "./types/video";
export default function Home() {
  const renderItem = ({ item }: { item: Video }) => <VideoCard video={item} />;

  return (
    <SafeAreaView className="flex-1">
      <Text className="text-2xl font-bold mb-4 text-center">Video Diary</Text>
      <FlatList
        data={sampleVideos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
    </SafeAreaView>
  );
}
