import { View, Text, Modal, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editVideoSchema, EditVideoFormData } from "@/schemas/video.schema";
import { FormField } from "@/components/AddVideoForm/FormField";

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
  const { control, handleSubmit, reset } = useForm<EditVideoFormData>({
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
