import { View, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editVideoSchema, EditVideoFormData } from "@/schemas/video.schema";

interface EditVideoModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: EditVideoFormData) => void;
  initialData: EditVideoFormData;
}

export default function EditVideoModal({
  visible,
  onClose,
  onSave,
  initialData,
}: EditVideoModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditVideoFormData>({
    resolver: zodResolver(editVideoSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (visible) {
      reset(initialData);
    }
  }, [visible, initialData]);

  const onSubmit = handleSubmit((data) => {
    onSave(data);
    onClose();
  });

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center bg-black/50">
        <View className="bg-white mx-4 p-4 rounded-lg">
          <Text className="text-lg font-bold mb-4">Edit Video</Text>

          <Text className="font-medium mb-2">Title</Text>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  className="border border-gray-300 rounded-lg p-2"
                />
                {errors.title && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.title.message?.toString()}
                  </Text>
                )}
              </View>
            )}
          />

          <Text className="font-medium mb-2 mt-4">Description</Text>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  multiline
                  numberOfLines={4}
                  className="border border-gray-300 rounded-lg p-2"
                />
                {errors.description && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.description.message?.toString()}
                  </Text>
                )}
              </View>
            )}
          />

          <View className="flex-row justify-end gap-2 mt-6">
            <TouchableOpacity
              onPress={onClose}
              className="bg-gray-200 rounded-lg px-4 py-2"
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSubmit}
              className="bg-green-500 rounded-lg px-4 py-2"
            >
              <Text className="text-white">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
