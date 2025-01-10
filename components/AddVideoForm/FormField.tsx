import React from "react";
import { View, Text, TextInput } from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  multiline?: boolean;
  maxLength?: number;
}

export const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  multiline = false,
  maxLength,
}: FormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-medium">{label}</Text>
            {maxLength && (
              <Text className="text-sm text-gray-500">
                {value.length}/{maxLength}
              </Text>
            )}
          </View>
          <TextInput
            className="w-full p-3 border border-gray-200 rounded-lg"
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            multiline={multiline}
            numberOfLines={multiline ? 4 : 1}
            maxLength={maxLength}
          />
          {error && (
            <Text className="text-red-500 text-sm mt-1">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
};
