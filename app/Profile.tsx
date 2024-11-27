import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "@/utils/auth";
import { ENDPOINTS } from "@/constants/api";

const Profile = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const token = await getToken();

      if (!token) {
        console.log("Token is null or missing");
        return;
      }

      const response = await fetch(ENDPOINTS.AUTH.LOGOUT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (response.ok) {
        await AsyncStorage.removeItem("token");
        console.log("Logout successful");
        router.push("/auth/Login");
      } else {
        const errorData = await response.json();
        console.log("Logout failed:", errorData);
      }
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <ScrollView className=" bg-black">
      <View className="justify-center items-center flex-1">
        <Text className="text-red-300">Profile</Text>
        <Button title="Logout" onPress={handleLogout} />
        <Link href="/" className="text-blue-1000 font-semibold">
          Back to Home
        </Link>
      </View>
    </ScrollView>
  );
};

export default Profile;
