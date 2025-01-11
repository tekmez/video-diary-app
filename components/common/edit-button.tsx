import { TouchableOpacity, Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface EditButtonProps {
  handleEdit: () => void;
}

export default function EditButton({ handleEdit }: EditButtonProps) {
  return (
    <Animated.View
      entering={FadeInDown.duration(400).delay(800)}
      className="relative bottom-16 left-0 right-0"
    >
      <TouchableOpacity
        onPress={handleEdit}
        className="bg-orange-500 mx-5 p-4 rounded-lg"
      >
        <Text className="text-white text-center font-bold">Edit</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
