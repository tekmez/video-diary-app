import { View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import VPlayer from "@/components/common/video-player";
import DetailContent from "@/components/detail-content";
import { useVideoStore } from "@/store/video-store";
import DeleteButton from "@/components/common/delete-button";
import EditButton from "@/components/common/edit-button";
import EditVideoModal from "@/components/EditVideoModal/edit-video-modal";
import { useState } from "react";

export default function VideoDetail() {
  const { id } = useLocalSearchParams();
  const video = useVideoStore((state) => state.videos.find((v) => v.id === id));
  const removeVideo = useVideoStore((state) => state.removeVideo);
  const updateVideo = useVideoStore((state) => state.updateVideo);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleDelete = () => {
    removeVideo(id as string);
    router.back();
  };

  const handleEdit = () => {
    setIsEditModalVisible(true);
  };

  const handleSave = (data: { title: string; description: string }) => {
    updateVideo(id as string, data);
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
      <EditButton handleEdit={handleEdit} />
      <DeleteButton handleDelete={handleDelete} />
      <EditVideoModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onSave={handleSave}
        initialData={{
          title: video.title,
          description: video.description,
        }}
      />
    </View>
  );
}
