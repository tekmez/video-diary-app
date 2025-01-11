import React from "react";
import { View, Text } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

interface VideoScrubberProps {
  duration: number;
  startTime: number;
  endTime: number;
  onScrubChange: (values: [number, number]) => void;
}

const formatTime = (seconds: number) => {
  const totalSeconds = Math.round(seconds);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const VideoScrubber: React.FC<VideoScrubberProps> = ({
  duration,
  startTime,
  endTime,
  onScrubChange,
}) => {
  const MAX_DURATION = 5;
  const durationInSeconds = duration / 1000;
  const startTimeInSeconds = startTime / 1000;
  const endTimeInSeconds = Math.min(
    endTime / 1000,
    Math.min(startTimeInSeconds + MAX_DURATION, durationInSeconds)
  );

  return (
    <View className="w-full px-4 py-2">
      <View className="flex-row justify-between mb-2">
        <Text className="text-white text-xs">{formatTime(0)}</Text>
        <Text className="text-white text-xs">
          {formatTime(durationInSeconds)}
        </Text>
      </View>
      <View className="flex-row items-center justify-center">
        <MultiSlider
          values={[startTimeInSeconds, endTimeInSeconds]}
          min={0}
          max={durationInSeconds}
          step={0.1}
          allowOverlap={false}
          snapped
          minMarkerOverlapDistance={5}
          selectedStyle={{
            backgroundColor: "#1FB28A",
          }}
          unselectedStyle={{
            backgroundColor: "rgba(255,255,255,0.3)",
          }}
          containerStyle={{
            width: "100%",
            height: 40,
          }}
          trackStyle={{
            height: 4,
            borderRadius: 2,
          }}
          markerStyle={{
            height: 24,
            width: 24,
            borderRadius: 12,
            backgroundColor: "#1FB28A",
            borderWidth: 3,
            borderColor: "white",
          }}
          onValuesChange={(values: number[]) => {
            const start = values[0];
            const end = Math.min(
              values[1],
              Math.min(start + MAX_DURATION, durationInSeconds)
            );
            onScrubChange([start * 1000, end * 1000] as [number, number]);
          }}
        />
      </View>
      <View className="flex-row justify-between mt-1">
        <Text className="text-white text-xs">
          {formatTime(startTimeInSeconds)}
        </Text>
        <Text className="text-white text-xs">
          {formatTime(endTimeInSeconds)}
        </Text>
      </View>
    </View>
  );
};
