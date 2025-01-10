import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { videoSchema, type VideoFormData } from "../schemas/video.schema";
import { useVideoStore } from "../store/video-store";
import { router } from "expo-router";
import { Video } from "../types/video";

export const useVideoForm = () => {
  const addVideo = useVideoStore((state) => state.addVideo);

  const form = useForm<VideoFormData>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      title: "",
      description: "",
      videoUri: "",
      createdAt: new Date(),
    },
  });

  const onSubmit = (data: VideoFormData) => {
    const newVideo: Video = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      date: data.createdAt.toLocaleDateString(),
      videoUrl: data.videoUri,
      thumbnailUrl: undefined,
    };
    
    addVideo(newVideo);
    form.reset();
    router.back();
  };

  return {
    form,
    onSubmit,
  };
}; 