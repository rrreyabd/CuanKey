/*
  Komponen Setting ini digunakan untuk menampilkan halaman pengaturan, dengan fokus utama pada pengaturan notifikasi. 
  Pengguna dapat mengaktifkan atau menonaktifkan notifikasi melalui sebuah switch yang disertai 
  dengan mekanisme penyimpanan status notifikasi menggunakan AsyncStorage.
*/

/*
React dan React Native:
  Text, TouchableOpacity, View: Digunakan untuk menampilkan elemen-elemen UI dasar.
  Switch: Komponen untuk menampilkan tombol geser yang memungkinkan pengguna mengaktifkan atau menonaktifkan notifikasi.
Expo:
  router: Digunakan untuk melakukan navigasi antar layar dengan expo-router.
AsyncStorage:
  Digunakan untuk menyimpan dan mengambil data lokal di perangkat pengguna, dalam hal ini digunakan untuk menyimpan status pengaturan notifikasi.
FontAwesome5:
  Digunakan untuk menampilkan ikon panah kiri pada tombol kembali.
*/
import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Switch } from "react-native-gesture-handler";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Setting = () => {
  // Notification State
  // isNotificaationEnabled untuk menyimpan status apakah notifikasi diaktifkan atau mati
  // toggleNotificationEnabled adalah fungsi untuk mengubah status notifikasi dan menyimpannya ke dalam AsyncStorage
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