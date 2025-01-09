import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Video Diary</Text>
      <Link href="/select" asChild>
        <TouchableOpacity className="bg-blue-500 p-4 rounded-lg">
          <Text className="text-white text-center font-semibold">
            New Video
          </Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}
