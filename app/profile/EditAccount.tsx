/*
React Native Modules:
  Alert: Menampilkan dialog notifikasi.
  Image, Pressable, Text, TouchableOpacity, View: Membuat antarmuka pengguna.

React dan Expo Modules:
  useEffect, useMemo, useRef, useState: Mengelola state dan efek dalam komponen.
  FontAwesome5, Feather: Ikon dari paket @expo/vector-icons.
  Link, router: Navigasi antar halaman menggunakan expo-router.

Custom Modules:
  useAuth: Hook untuk mengakses data pengguna dan fungsi logout.
  BackHeader: Komponen header dengan tombol kembali.
  DangerButton: Tombol untuk tindakan berisiko seperti logout.
  BottomSheet, BottomSheetView: Komponen lembar bawah untuk pilihan gambar profil.
  ProfilePictureComponent: Komponen tampilan gambar profil.
  PrimaryButton: Tombol utama untuk tindakan.

Konstanta dan Utilitas:
  getToken: Fungsi untuk mendapatkan token autentikasi.
  ENDPOINTS: URL endpoint untuk operasi API.
  AsyncStorage: Penyimpanan lokal data pengguna.
*/
import {
  Alert,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link, router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import BackHeader from "@/components/BackHeader";
import DangerButton from "@/components/DangerButton";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Feather from "@expo/vector-icons/Feather";
import ProfilePictureComponent from "@/components/ProfilePictureComponent";
import PrimaryButton from "@/components/PrimaryButton";
import { getToken } from "@/utils/auth";
import { ENDPOINTS } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditAccount = () => {
  const { user, handleLogout, setUserData } = useAuth();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["100%"], []);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<
    number | boolean
  >(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  // Menampilkan gambar profil pengguna dengan opsi untuk mengubahnya.
  const handleUpdateProfilePicture = async () => {
    setIsLoading(true);
    try { // memanggil endpoint user untuk kebutuhan edit akun
      const response = await fetch(ENDPOINTS.USER, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify({
          profile_picture: selectedProfilePicture,
          fullname: user?.fullname,
          phone_number: user?.phone_number,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      await AsyncStorage.setItem("userData", JSON.stringify(data.data));
      setUserData(data.data);
      Alert.alert("Success", "Profile picture updated successfully");
      router.back();
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "An error occurred while updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="bg-black flex-1">
      <View className="py-6 px-4">
        <BackHeader pageTitle="Account" />

        <View className="py-8 gap-8 items-center w-full">
          <ProfilePictureComponent
            handleOpenBottomSheet={handleOpenBottomSheet}
          />
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
          {/* Change Account Data */}
          <Link href="./ChangeAccountData">
            <View className="bg-deepCharcoal flex-row justify-between w-full p-4 rounded-md">
              <View className="gap-6 flex-row items-center">
                <Image
                  source={require("@/assets/icons/exchange-solid.png")}
                  style={{ width: 24, height: 24 }}
                />
                <Text className="text-white font-poppins">
                  Change Account Data
                </Text>
              </View>

              <FontAwesome5 name="chevron-right" size={18} color="#525B69" />
            </View>
          </Link>

          {/* Change Password */}
          <Link href="./ChangePassword">
            <View className="bg-deepCharcoal flex-row justify-between w-full p-4 rounded-md">
              <View className="gap-6 flex-row items-center">
                <Image
                  source={require("@/assets/icons/lock.png")}
                  style={{ width: 24, height: 24 }}
                />
                <Text className="text-white font-poppins">Change Password</Text>
              </View>

              <FontAwesome5 name="chevron-right" size={18} color="#525B69" />
            </View>
          </Link>

          {/* Delete Account */}
          <Link href="./DeleteAccount">
            <View className="bg-deepCharcoal flex-row justify-between w-full p-4 rounded-md">
              <View className="gap-6 flex-row items-center">
                <Image
                  source={require("@/assets/icons/delete-fill.png")}
                  style={{ width: 24, height: 24 }}
                />
                <Text className="text-white font-poppins">Delete Account</Text>
              </View>

              <FontAwesome5 name="chevron-right" size={18} color="#525B69" />
            </View>
          </Link>
        </View>
      </View>
      <View className="py-8 px-4 w-full absolute bottom-0">
        <DangerButton title="Logout" onPress={() => handleLogout()} />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: "white" }}
        handleStyle={{ backgroundColor: "#151A1F" }}
      >
        <BottomSheetView className="bg-deepCharcoal flex-1 gap-8">
          <View className="flex-row flex-wrap gap-8 items-center justify-center pt-8">
            {/* Profile Picture 1 */}
            <TouchableOpacity
              onPress={() => setSelectedProfilePicture(1)}
              activeOpacity={0.4}
              className={`bg-white rounded-full overflow-hidden aspect-square justify-center items-center w-[128px] ${
                selectedProfilePicture === 1 ? "border-4 border-vividGreen" : ""
              }`}
            >
              <Image
                source={require("@/assets/profile/character_1.png")}
                style={{ width: 128, height: 128 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedProfilePicture(2)}
              activeOpacity={0.4}
              className={`bg-white rounded-full overflow-hidden aspect-square justify-center items-center w-[128px] ${
                selectedProfilePicture === 2 ? "border-4 border-vividGreen" : ""
              }`}
            >
              <Image
                source={require("@/assets/profile/character_2.png")}
                style={{ width: 128, height: 128 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedProfilePicture(3)}
              activeOpacity={0.4}
              className={`bg-white rounded-full overflow-hidden aspect-square justify-center items-center w-[128px] ${
                selectedProfilePicture === 3 ? "border-4 border-vividGreen" : ""
              }`}
            >
              <Image
                source={require("@/assets/profile/character_3.png")}
                style={{ width: 128, height: 128 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedProfilePicture(4)}
              activeOpacity={0.4}
              className={`bg-white rounded-full overflow-hidden aspect-square justify-center items-center w-[128px] ${
                selectedProfilePicture === 4 ? "border-4 border-vividGreen" : ""
              }`}
            >
              <Image
                source={require("@/assets/profile/character_4.png")}
                style={{ width: 128, height: 128 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedProfilePicture(5)}
              activeOpacity={0.4}
              className={`bg-white rounded-full overflow-hidden aspect-square justify-center items-center w-[128px] ${
                selectedProfilePicture === 5 ? "border-4 border-vividGreen" : ""
              }`}
            >
              <Image
                source={require("@/assets/profile/character_5.png")}
                style={{ width: 128, height: 128 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedProfilePicture(6)}
              activeOpacity={0.4}
              className={`bg-white rounded-full overflow-hidden aspect-square justify-center items-center w-[128px] ${
                selectedProfilePicture === 6 ? "border-4 border-vividGreen" : ""
              }`}
            >
              <Image
                source={require("@/assets/profile/character_6.png")}
                style={{ width: 128, height: 128 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedProfilePicture(7)}
              activeOpacity={0.4}
              className={`bg-white rounded-full overflow-hidden aspect-square justify-center items-center w-[128px] ${
                selectedProfilePicture === 7 ? "border-4 border-vividGreen" : ""
              }`}
            >
              <Image
                source={require("@/assets/profile/character_7.png")}
                style={{ width: 128, height: 128 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedProfilePicture(8)}
              activeOpacity={0.4}
              className={`bg-white rounded-full overflow-hidden aspect-square justify-center items-center w-[128px] ${
                selectedProfilePicture === 8 ? "border-4 border-vividGreen" : ""
              }`}
            >
              <Image
                source={require("@/assets/profile/character_8.png")}
                style={{ width: 128, height: 128 }}
              />
            </TouchableOpacity>
          </View>

          <View className="px-8">
            <PrimaryButton
              disabled={!selectedProfilePicture}
              title={isLoading ? "Processing..." : "Save Changes"}
              onPress={handleUpdateProfilePicture}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default EditAccount;
