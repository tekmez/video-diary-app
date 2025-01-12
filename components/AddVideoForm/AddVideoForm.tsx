import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { VideoUploader } from "../VideoUploader/video-uploader";
import { FormField } from "./FormField";
import { useVideoForm } from "../../hooks/useVideoForm";
import { Controller } from "react-hook-form";

export const AddVideoForm = () => {
  const { form, onSubmit } = useVideoForm();
  const { control, handleSubmit } = form;

  return (
    <View className="flex-1">
      <Text className="text-2xl text-center font-bold mb-6">Add New Video</Text>

      <Controller
        control={control}
        name="videoUri"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View className="mb-6">
            <Text className="text-lg font-medium mb-2">Video</Text>
            <VideoUploader value={value} onChange={onChange} />
            {error && (
              <Text className="text-red-500 text-sm mt-1">{error.message}</Text>
            )}
          </View>
        )}
      />

      <FormField
        control={control}
        name="title"
        label="Title"
        placeholder="Video title"
        maxLength={25}
      />

      <FormField
        control={control}
        name="description"
        label="Description"
        placeholder="Video description"
        multiline
        maxLength={250}
      />

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="w-full bg-green-500 p-4 rounded-lg"
      >
        <Text className="text-white text-center font-medium">Save</Text>
      </TouchableOpacity>
    </View>
  );
};
