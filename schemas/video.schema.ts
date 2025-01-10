import { z } from "zod";

export const videoSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(25, "Title must be less than 25 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(250, "Description must be less than 250 characters"),
  videoUri: z.string().min(1, "Video is required"),
  createdAt: z.date().default(() => new Date()),
});

export type VideoFormData = z.infer<typeof videoSchema>; 