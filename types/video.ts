import { StyleProp, ViewStyle } from "react-native";

export interface Video {
  id: string;
  title: string;
  description: string;
  date: string;
  videoUrl: any;
  thumbnailUrl?: string;
}

export interface VPlayerProps {
  player: any;
  nativeControls?: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface VideoCardProps {
  video: Video;
}

export const sampleVideos: Video[] = [
  {
    id: '1',
    title: 'What I ate today',
    description: 'Korean BBQ, sushi, hot pot and ice cream',
    date: '1 January 2023',
    videoUrl: require('../assets/SampleVideo.mp4'),
  },
  {
    id: '2',
    title: 'My New Year Resolutions',
    description: 'Read 30 books, travel to 5 new places, start a business',
    date: '31 December 2022',
    videoUrl: require('../assets/SampleVideo.mp4'),
  },
  {
    id: '3',
    title: 'My Favorite Things in 2022',
    description: 'I love my job, my friends and my life',
    date: '30 December 2022',
    videoUrl: require('../assets/SampleVideo.mp4'),
  }
]; 