import { Stack, useRouter } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import "../global.css";
import { checkLoginStatus } from "@/utils/auth";

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
    }

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
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="Profile" options={{ headerShown: false }} />
          <Stack.Screen name="auth/Login" options={{ headerShown: false }} />
          <Stack.Screen name="auth/Register" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}