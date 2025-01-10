import { View } from "react-native";
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
const DetailContent = ({
  title,
  description,
  date,
}: {
  title: string;
  description: string;
  date: string;
}) => {
  return (
    <View className="p-6 space-y-4">
      <Animated.Text
        entering={FadeInDown.duration(400).delay(500)}
        className="text-3xl font-semibold mb-4"
      >
        {title}
      </Animated.Text>
      <Animated.Text
        entering={FadeInDown.duration(400).delay(600)}
        className="text-md"
      >
        {description}
      </Animated.Text>
      <Animated.Text
        entering={FadeInDown.duration(400).delay(700)}
        className="text-gray-500 text-sm text-right mt-4"
      >
        {date}
      </Animated.Text>
    </View>
  );
};

export default DetailContent;
