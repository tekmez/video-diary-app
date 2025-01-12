import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { UseVideoUploaderProps } from '@/types/hooks';
import { UseVideoUploaderReturn } from '@/types/hooks';

const formatVideoUri = (uri: string): string => {
  if (Platform.OS === 'ios') {
    return uri.startsWith('file://') ? uri : `file://${uri}`;
  }
  return uri;
};


export const useVideoUploader = ({ onChange, initialValue }: UseVideoUploaderProps): UseVideoUploaderReturn => {
  const [currentVideo, setCurrentVideo] = useState<string | null>(initialValue || null);
  const [videoDuration, setVideoDuration] = useState(0);

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'videos',
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      if (result.assets[0].duration) {
        setVideoDuration(Math.floor(result.assets[0].duration));
      }
      const uri = formatVideoUri(result.assets[0].uri);
      setCurrentVideo(uri);
      onChange(uri);
    }
  };

  const handleReset = () => {
    setCurrentVideo(null);
    setVideoDuration(0);
    onChange('');
  };

  return {
    currentVideo,
    videoDuration,
    pickVideo,
    handleReset,
  };
}; 