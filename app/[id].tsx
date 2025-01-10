import { View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import VPlayer from "@/components/common/video-player";
import DetailContent from "@/components/detail-content";
import { useVideoStore } from "@/store/video-store";
import DeleteButton from "@/components/common/delete-button";

export default function VideoDetail() {
  const { id } = useLocalSearchParams();
  const video = useVideoStore((state) => state.videos.find((v) => v.id === id));
  const removeVideo = useVideoStore((state) => state.removeVideo);

  const handleDelete = () => {
    removeVideo(id as string);
    router.back();
  };

  if (!video) return null;

  return (
    <View className="flex-1">
      <View className="w-full h-[250px]">
        <VPlayer
          url={video.videoUrl}
          autoPlay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View className="flex-1">
        <DetailContent
          title={video.title}
          description={video.description}
          date={video.date}
        />
      </View>
      <DeleteButton handleDelete={handleDelete} />
    </View>
  );
}
