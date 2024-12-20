/*
  ChangeAccountData adalah komponen React Native yang digunakan untuk mengubah data akun pengguna, 
  termasuk nama lengkap dan nomor telepon. Komponen ini menyediakan antarmuka pengguna untuk mengedit 
  data akun serta memanggil API untuk memperbarui informasi di server.
*/

/*
React Native Modules:
  Alert: Menampilkan notifikasi dialog ke pengguna.
  View: Container untuk tata letak komponen.
React Modules:
  useState: Hook untuk menyimpan dan mengelola status komponen.
Custom Components:
  BackHeader: Komponen untuk menampilkan header dengan tombol kembali.
  Input: Komponen input teks untuk mengedit data.
  PrimaryButton: Komponen tombol utama untuk tindakan.
Custom Context:
  useAuth: Hook untuk mengakses konteks autentikasi pengguna.
Konstanta dan Utils:
  ENDPOINTS: Berisi URL endpoint API.
  getToken: Fungsi untuk mendapatkan token autentikasi.
  router: Digunakan untuk navigasi antar halaman.
*/
import { Alert, View } from "react-native";
import React, { useState } from "react";
import BackHeader from "@/components/BackHeader";
import Input from "@/components/Input";
import { useAuth } from "@/context/AuthContext";
import PrimaryButton from "@/components/PrimaryButton";
import { ENDPOINTS } from "@/constants/api";
import { getToken } from "@/utils/auth";
import { router } from "expo-router";

// menyimpan inputan pengguna
const ChangeAccountData = () => {
  const { user, setUserData } = useAuth();
  const [fullName, setFullName] = useState(user?.fullname || "");
  const [phone, setPhone] = useState(user?.phone_number || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /*
    Fungsi asinkron yang mengirimkan data yang diubah ke server.
    Proses:
      - Mengatur isSubmitting menjadi true untuk menunjukkan aktivitas.
      - Mengirim permintaan PUT ke endpoint pengguna dengan header dan payload JSON yang berisi data baru.
      - Jika berhasil, memperbarui data pengguna di konteks useAuth dan menampilkan notifikasi sukses.
      - Jika gagal, menangani error dengan log dan menampilkan dialog error.
      - Mengatur isSubmitting kembali ke false setelah selesai.
  */
  const handleUpdateProfile = async () => {
    setIsSubmitting(true);

    try {
      // memanggil endpoint user
      const response = await fetch(ENDPOINTS.USER, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`, // token autentikasi
        },
        body: JSON.stringify({
          profile_picture: user?.profile_picture,
          fullname: fullName,
          phone_number: phone,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setUserData(data.data);
      // pesan berhasil update
      Alert.alert("Success", "Profile updated successfully");
      router.replace("/profile/Profile");
    } catch (error) {
      // pesan gagal update
      console.error("Error updating profile:", error);
      Alert.alert("Error", "An error occurred while updating profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="bg-black flex-1">
      <View className="py-6 px-4">
        <BackHeader pageTitle="Change Account Data" />

        {/* Form */}
        <View className="gap-6 py-8">
          <Input
            placeholder="Full Name"
            value={fullName}
            label="FULL NAME"
            onChangeText={setFullName}
          />
          <Input
            placeholder="Phone Number"
            value={phone}
            label="PHONE NUMBER"
            onChangeText={setPhone}
          />
        </View>
      </View>

      <View className="py-8 px-4 w-full absolute bottom-0 bg-black">
        <PrimaryButton
          title={isSubmitting ? "Processing..." : "Update Account"}
          onPress={() => handleUpdateProfile()}
        />
      </View>
    </View>
  );
};

export default ChangeAccountData;
