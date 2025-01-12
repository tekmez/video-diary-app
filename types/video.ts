import { StyleProp, ViewStyle } from "react-native";

export interface Video {
  id: string;
  title: string;
  description: string;
  date: string;
  videoUrl: string;
  thumbnailUrl?: string;
}

export interface VPlayerProps {
  url: any;
  nativeControls?: boolean;
  autoPlay: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface VideoCardProps {
  video: Video;
}

export interface VideoUploaderProps {
  value?: string;
  onChange: (uri: string) => void;
}

export const sampleVideos: Video[] = [
  {
    id: '1',
    title: 'What I ate today',
    description: 'Korean BBQ, sushi, hot pot and ice cream',
    date: '1 January 2023',
    videoUrl: require('../assets/SampleVideo.mp4'),
  },
]; 