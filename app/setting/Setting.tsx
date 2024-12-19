import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Switch } from "react-native-gesture-handler";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Setting = () => {
  // Notification State
  const [isNotificationEnabled, setIsNotificationEnabled] = useState<boolean>(false);
  const toggleNotificationEnabled = async () => {
    // Change Notification State
    const newState = !isNotificationEnabled;
    setIsNotificationEnabled(newState);

    // Save the state of the notification to AsyncStorage
    try {
      await AsyncStorage.setItem("isNotificationEnabled", JSON.stringify(newState));
    } catch (error) {
      console.error("Failed to save notification state", error);
    }
  };

  // Fetch Notification State
  useEffect(() => {
    const fetchNotificationState = async () => {
      const NotificationEnabledOldState = await AsyncStorage.getItem("isNotificationEnabled");
      if (NotificationEnabledOldState !== null) {
        setIsNotificationEnabled(JSON.parse(NotificationEnabledOldState));
      }
    };
    fetchNotificationState();
  }, []);

  return (
    <View className="bg-black flex-1">
      <View className="py-6 px-8">
        <View className="flex-row justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome5 name="chevron-left" size={18} color="#ffffff" />
          </TouchableOpacity>

          <Text className="text-white font-poppinsBold text-xl text-center">
            Settings
          </Text>

          <View style={{ width: 18 }}></View>
        </View>

        <View className="py-16">
          <View className="justify-between items-center flex-row">
            <Text className="text-white font-poppinsSemibold text-lg">
              Enable Notifications
            </Text>
            <Switch
              trackColor={{ true: "#00B553", false: "#ccc" }}
              thumbColor={isNotificationEnabled ? "#00B553" : "#f4f4f4"}
              ios_backgroundColor="#ccc"
              onValueChange={toggleNotificationEnabled}
              value={isNotificationEnabled}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Setting;