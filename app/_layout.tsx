import { StatusBar } from "expo-status-bar";
import "../assets/styles/global.css";
import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="[id]" options={{ presentation: "modal" }} />
      </Stack>
    </>
  );
}
