import { create } from 'zustand';
import { Video, sampleVideos } from '../types/video';

interface VideoStore {
  videos: Video[];
  addVideo: (video: Video) => void;
  removeVideo: (id: string) => void;
  updateVideo: (id: string, video: Partial<Video>) => void;
}

export const useVideoStore = create<VideoStore>((set) => ({
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
})); 