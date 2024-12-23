/*
React Native Modules:
  View, Text, Button, Image, ScrollView, Pressable: Membuat antarmuka pengguna.

React dan Expo Modules:
  Link, useRouter: Mendukung navigasi menggunakan expo-router.

Custom Modules: 
  useAuth: Hook untuk mendapatkan data pengguna saat ini.
  Navbar: Komponen navigasi bawah untuk berpindah antar halaman.
  ProfilePictureComponent: Komponen untuk menampilkan dan/atau mengubah gambar profil pengguna.

Utilitas dan Konstanta:
  getToken: Fungsi untuk mengambil token autentikasi dari penyimpanan.

ENDPOINTS: Konstanta URL API yang digunakan untuk permintaan server.
  AsyncStorage: Modul penyimpanan data lokal.
  
Ikon:
  FontAwesome5: Perpustakaan ikon untuk menambahkan ikon estetis ke antarmuka pengguna.

*/

import React from "react";
import { View, Text, Button, Image, ScrollView, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "@/utils/auth";
import { ENDPOINTS } from "@/constants/api";
import { useAuth } from "@/context/AuthContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Navbar from "@/components/Navbar";
import ProfilePictureComponent from "@/components/ProfilePictureComponent";

const Profile = () => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <View className="flex-1 bg-black">
      <ScrollView className="py-6 px-4">
        <View className="justify-center items-center flex-1">
          <View className="flex-row justify-center w-full items-center">
            <Text className="text-white font-poppinsBold text-xl">
              Profile
            </Text>
          </View>
          <View className="py-8 gap-8 items-center w-full">
            <ProfilePictureComponent />
            <View className="items-center">
              <Text className="text-white font-poppinsSemibold text-lg">
                {user?.fullname ?? "Name not available"}
              </Text>
              <Text className="text-vividGreen font-poppins">
                {user?.email ?? "Email not available"}
              </Text>
            </View>
          </View>

          {/* Horizontal Line */}
          <View className="w-full border border-none border-t-white/50"></View>

          <View className="py-8 gap-4">
            {/* Account */}
            <Link href="/profile/EditAccount">
              <View className="bg-deepCharcoal flex-row justify-between w-full p-4 rounded-md">
                <View className="gap-6 flex-row items-center">
                  <Image
                    source={require("@/assets/icons/user.png")}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text className="text-white font-poppins">Account</Text>
                </View>

                <FontAwesome5 name="chevron-right" size={18} color="#525B69" />
              </View>
            </Link>
            
            {/* My Wallet */}
            <Link href="/wallet/Wallet">
              <View className="bg-deepCharcoal flex-row justify-between w-full p-4 rounded-md">
                <View className="gap-6 flex-row items-center">
                  <Image
                    source={require("@/assets/icons/wallet-solid.png")}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text className="text-white font-poppins">My Wallet</Text>
                </View>

                <FontAwesome5 name="chevron-right" size={18} color="#525B69" />
              </View>
            </Link>

            {/* Transaction Category */}
            {/* <Link href="/">
              <View className="bg-deepCharcoal flex-row justify-between w-full p-4 rounded-md">
                <View className="gap-6 flex-row items-center">
                  <Image
                    source={require("@/assets/icons/round-category.png")}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text className="text-white font-poppins">
                    Transaction Category
                  </Text>
                </View>

                <FontAwesome5 name="chevron-right" size={18} color="#525B69" />
              </View>
            </Link> */}

            {/* Recurring Transactions */}
            <Link href="/recurring/Recurring">
              <View className="bg-deepCharcoal flex-row justify-between w-full p-4 rounded-md">
                <View className="gap-6 flex-row items-center">
                  <Image
                    source={require("@/assets/icons/recurring-payment.png")}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text className="text-white font-poppins">
                    Recurring Transaction
                  </Text>
                </View>

                <FontAwesome5 name="chevron-right" size={18} color="#525B69" />
              </View>
            </Link>

            {/* Settings */}
            <Link href="/setting/Setting">
              <View className="bg-deepCharcoal flex-row justify-between w-full p-4 rounded-md">
                <View className="gap-6 flex-row items-center">
                  <Image
                    source={require("@/assets/icons/settings-fill.png")}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text className="text-white font-poppins">Settings</Text>
                </View>

                <FontAwesome5 name="chevron-right" size={18} color="#525B69" />
              </View>
            </Link>

            {/* <Button title="Logout" onPress={handleLogout} /> */}
          </View>
        </View>
      </ScrollView>

      <Navbar className="" />
    </View>
  );
};

export default Profile;
