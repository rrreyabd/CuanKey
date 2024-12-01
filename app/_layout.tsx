import { Stack, useRouter } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import "../global.css";
import { checkLoginStatus } from "@/utils/auth";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
      });
      setFontsLoaded(true);
    };

    const checkLogin = async () => {
      const loggedIn = await checkLoginStatus();
      if (!loggedIn) {
        router.push("/auth/Login");
      }
    };

    checkLogin();
    loadFonts();
  }, [router]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider className="flex-1 bg-black">
      <SafeAreaView className="flex-1 bg-black">
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <AuthProvider>
          <Stack
            screenOptions={{
              animation: "default", // Predefined animation for smoother navigation
              headerShown: false, // Keep headers consistent across screens
              gestureEnabled: true, // Enable swipe gestures for smooth back navigation
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }}  />

            {/* Profile */}
            <Stack.Screen
              name="profile/Profile"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="profile/EditAccount"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="profile/DeleteAccount"
              options={{ headerShown: false }}
            />

            {/* Auth */}
            <Stack.Screen name="auth/Login" options={{ headerShown: false }} />
            <Stack.Screen
              name="auth/Register"
              options={{ headerShown: false }}
            />
          </Stack>
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
