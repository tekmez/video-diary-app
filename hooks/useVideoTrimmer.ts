import { useState } from 'react';
import { Alert } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import * as FileSystem from 'expo-file-system';
import { FFmpegKit, ReturnCode } from 'ffmpeg-kit-react-native';
import { UseVideoTrimmerProps } from '@/types/hooks';
import { UseVideoTrimmerReturn } from '@/types/hooks';



const checkVideoReady = async (videoUri: string): Promise<boolean> => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(videoUri.replace('file://', ''));
    return fileInfo.exists && fileInfo.size > 0;
  } catch (error) {
    console.error('Video ready check error:', error);
    return false;
  }
};

export const useVideoTrimmer = ({
  currentVideo,
  onChange,
}: UseVideoTrimmerProps): UseVideoTrimmerReturn => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(5);
  const [trimmedVideo, setTrimmedVideo] = useState<string | null>(null);

  const { mutate: trimVideo, isPending } = useMutation({
    mutationFn: async () => {
      if (!currentVideo) return null;

      const timestamp = new Date().getTime();
      const filename = `trimmed_${timestamp}.mp4`;
      const outputUri = `${FileSystem.cacheDirectory}${filename}`;

      const startTimeInSeconds = startTime / 1000;
      const endTimeInSeconds = endTime / 1000;
      const durationInSeconds = endTimeInSeconds - startTimeInSeconds;

      const command = `-ss ${startTimeInSeconds.toFixed(
        2
      )} -i "${currentVideo}" -t ${durationInSeconds.toFixed(
        2
      )} -c:v h264 -preset medium -b:v 4M -c:a aac -movflags +faststart "${outputUri}"`;

      try {
        const session = await FFmpegKit.execute(command);
        const returnCode = await session.getReturnCode();

        if (ReturnCode.isSuccess(returnCode)) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          const isReady = await checkVideoReady(outputUri);
          
          if (isReady) {
            return outputUri.startsWith('file://') ? outputUri : `file://${outputUri}`;
          }
        }
        throw new Error('Video trimming process failed');
      } catch (error) {
        Alert.alert('Error', 'Video trimming process failed. Please try again.');
        return null;
      }
    },
    onSuccess: async (result) => {
      if (result) {
        const isReady = await checkVideoReady(result);
        if (isReady) {
          setTrimmedVideo(result);
          onChange(result);
        } else {
          Alert.alert('Error', 'Trimmed video file not found.');
        }
      }
    },
    onError: (error) => {
      console.error('FFMPEG error:', error);
      Alert.alert('Error', 'Video trimming process failed. Please try again.');
    },
  });

  const handleScrubChange = ([start, end]: [number, number]) => {
    setStartTime(start);
    setEndTime(end);
  };

  return {
    startTime,
    endTime,
    trimmedVideo,
    isPending,
    handleScrubChange,
    trimVideo,
  };
}; 