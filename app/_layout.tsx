import { useRouter } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import "../global.css";
import { checkLoginStatus } from "@/utils/auth";
import { AuthProvider } from "@/context/AuthContext";

import { createStackNavigator } from "@react-navigation/stack";
import Index from "./index";
import Profile from "./profile/Profile";
import EditAccount from "./profile/EditAccount";
import DeleteAccount from "./profile/DeleteAccount";
import ChangeAccountData from "./profile/ChangeAccountData";
import Login from "./auth/Login";
import Register from "./auth/Register";

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

  const Stack = createStackNavigator();

  return (
    <SafeAreaProvider className="flex-1 bg-black">
      <SafeAreaView className="flex-1 bg-black">
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <AuthProvider>
          <Stack.Navigator
            screenOptions={{
              animation: "slide_from_right", // Predefined animation for smoother navigation
              headerShown: false, // Keep headers consistent across screens
              gestureEnabled: true, // Enable swipe gestures for smooth back navigation
            }}
          >
            <Stack.Screen
              name="index"
              component={Index}
              options={{ headerShown: false }}
            />

            {/* Profile */}
            <Stack.Screen
              name="profile/Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="profile/EditAccount"
              component={EditAccount}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="profile/DeleteAccount"
              component={DeleteAccount}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="profile/ChangeAccountData"
              component={ChangeAccountData}
              options={{ headerShown: false }}
            />

            {/* Auth */}
            <Stack.Screen
              name="auth/Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="auth/Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </AuthProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
