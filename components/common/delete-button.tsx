import { TouchableOpacity, Text } from "react-native";
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";

const DeleteButton = ({ handleDelete }: { handleDelete: () => void }) => {
  return (
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
  );
};

export default DeleteButton;
