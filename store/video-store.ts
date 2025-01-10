import { create } from 'zustand';
import { sampleVideos, Video } from '../types/video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';
interface VideoStore {
  videos: Video[];
  addVideo: (video: Video) => void;
  removeVideo: (id: string) => void;
  updateVideo: (id: string, video: Partial<Video>) => void;
}

export const useVideoStore = create<VideoStore>()(
  persist(
    (set) => ({
      videos: sampleVideos,

      addVideo: (video) =>
        set((state) => ({
          videos: [...state.videos, video],
        })),
        
      removeVideo: (id) =>
        set((state) => ({
          videos: state.videos.filter((video) => video.id !== id),
        })),
        
      updateVideo: (id, updatedVideo) =>
        set((state) => ({
          videos: state.videos.map((video) =>
          video.id === id ? { ...video, ...updatedVideo } : video
        ),
      })),
    }),
    {
      name: 'video-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
