import { StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { VideoView } from "expo-video";
import { VPlayerProps } from "@/types/video";
import { useVideoPlayer } from "expo-video";

const VPlayer = ({
  url,
  nativeControls = true,
  style,
  autoPlay,
  ...props
}: VPlayerProps) => {
  if (!url) return null;

  const player = useVideoPlayer(url, (player) => {
    player.loop = false;
    if (autoPlay) {
      player.play();
    }
  });

  return (
    <SafeAreaView>
      <VideoView
        style={[styles.video, style]}
        player={player}
        allowsFullscreen
        contentFit="cover"
        nativeControls={nativeControls}
        {...props}
      />
    </SafeAreaView>
  );
};

export default VPlayer;

const styles = StyleSheet.create({
  video: {
    width: 156,
    height: 108,
    aspectRatio: 16 / 9,
  },
});
