import { StyleSheet } from "react-native";
import React from "react";
import { VideoView } from "expo-video";
import { VPlayerProps } from "@/types/video";

const VPlayer = ({
  player,
  nativeControls = true,
  style,
  ...props
}: VPlayerProps) => {
  return (
    <VideoView
      style={[styles.video, style]}
      player={player}
      allowsFullscreen
      contentFit="cover"
      nativeControls={nativeControls}
      {...props}
    />
  );
};

export default VPlayer;

const styles = StyleSheet.create({
  video: {
    width: 156,
    height: 108,
  },
});
