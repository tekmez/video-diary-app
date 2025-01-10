import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { AddVideoForm } from "../../components/AddVideoForm/AddVideoForm";

const AddScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4">
        <AddVideoForm />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddScreen;
