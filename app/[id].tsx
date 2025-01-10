import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { sampleVideos } from "@/types/video";
import VPlayer from "@/components/common/video-player";
import { useVideoPlayer } from "expo-video";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function VideoDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const video = sampleVideos.find((v) => v.id === id);
  const [title, setTitle] = useState(video?.title);
  const [description, setDescription] = useState(video?.description);

  const player = useVideoPlayer(video?.videoUrl, (player) => {
    player.loop = false;
    player.play();
  });

  if (!video) return null;

  return (
    <View className="flex-1 bg-white">
      <View className="w-full h-[250px] relative">
        <VPlayer player={player} style={{ width: "100%", height: "100%" }} />
        <TouchableOpacity
          className="absolute top-12 left-4 p-2 bg-black/50 rounded-full"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View className="p-4 space-y-4">
        <TextInput
          value={title}
          onChangeText={setTitle}
          className="text-xl font-semibold border-b border-gray-200 pb-2"
          placeholder="Başlık"
        />
        <TextInput
          value={description}
          onChangeText={setDescription}
          className="text-gray-600 border-b border-gray-200 pb-2"
          placeholder="Açıklama"
          multiline
        />
        <Text className="text-gray-400 text-sm">{video.date}</Text>
      </View>
    </View>
  );
}
