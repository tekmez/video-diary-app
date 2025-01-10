import { Text, View } from "react-native";
import React from "react";
import { Video } from "@/types/video";

const CardContent = ({ video }: { video: Video }) => {
  return (
    <View className="flex-1 ml-4 justify-between">
      <View>
        <Text className="text-lg font-semibold">{video.title}</Text>
        <Text className="text-gray-600 text-sm mt-1">{video.description}</Text>
      </View>
      <Text className="text-gray-500 text-xs mt-2 text-right">
        {video.date}
      </Text>
    </View>
  );
};

export default CardContent;
