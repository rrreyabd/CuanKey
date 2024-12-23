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
*/

import { Alert, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import BackHeader from "@/components/BackHeader";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import { ENDPOINTS } from "@/constants/api";
import { getToken } from "@/utils/auth";
import { useAuth } from "@/context/AuthContext";


/*
State Management
  oldPassword: Menyimpan kata sandi lama yang dimasukkan pengguna.
  password: Menyimpan kata sandi baru yang dimasukkan pengguna.
  confirmPassword: Menyimpan konfirmasi kata sandi baru.
  passwordStrength: Menyimpan kekuatan kata sandi baru (Weak, Medium, atau Strong).
  isSubmitting: Status boolean untuk menunjukkan apakah proses pengiriman data sedang berlangsung.
*/
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleLogout } = useAuth();

  // Menghitung kekuatan kata sandi setiap kali nilai password berubah.
  useEffect(() => {
    if (password.length < 8) {
      setPasswordStrength("Weak");
    } else if (
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[\W_]/.test(password)
    ) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Medium");
    }
  }, [password]);

  // fungsi mengirimkan data perubahan kata sandi ke server
  const handleUpdatePassword = async () => {
    setIsSubmitting(true);

    try {
      // menyesuaikan password sesuai kredensial dengan endpoint update password
      if (password.length > 0) {
        if (confirmPassword) {
          if (password === confirmPassword) {
            const response = await fetch(ENDPOINTS.AUTH.UPDATE_PASSWORD, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${await getToken()}`,
              },
              body: JSON.stringify({
                old_password: oldPassword,
                new_password: password,
              }),
            });

            if (!response.ok) {
              throw new Error(
                `Error: ${response.status} ${response.statusText}`
              );
            } else {
              const data = await response.json();
              handleLogout()
              Alert.alert("Success", "Password updated successfully");
              
            }
            
          } else {
            setIsSubmitting(false);
            alert("Password does not match");
          }
        } else {
          setIsSubmitting(false);
          alert("Confirm Password is required");
        }
      } else {
        setIsSubmitting(false);
        alert("New Password is required");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "An error occurred while updating profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="bg-black flex-1">
      <View className="py-6 px-4">
        <BackHeader pageTitle="Change Password" />

        {/* Form */}
        <View className="gap-6 py-8">
          <Input
            placeholder="Old Password"
            value={oldPassword}
            label="OLD PASSWORD"
            onChangeText={setOldPassword}
          />
          <Input
            placeholder="New Password"
            value={password}
            label="PASSWORD"
            onChangeText={setPassword}
          />
          <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            label="CONFIRM PASSWORD"
            onChangeText={setConfirmPassword}
          />

          {password.length > 0 && (
            <>
              <View>
                <View className="flex-row justify-between">
                  <Text className="text-white font-poppins text-sm">
                    Password Strength:
                  </Text>
                  <Text
                    className={`font-poppinsSemibold text-sm ${
                      passwordStrength === "Weak"
                        ? "text-red-500"
                        : passwordStrength === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {passwordStrength}
                  </Text>
                </View>

                <View>
                  <View className="bg-white/30 w-full h-2 rounded-full mt-2">
                    <View
                      className={`h-full rounded-full ${
                        passwordStrength === "Weak"
                          ? "w-1/3 bg-red-500"
                          : passwordStrength === "Medium"
                          ? "w-2/3 bg-yellow-500"
                          : "w-full bg-green-500"
                      }`}
                    ></View>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </View>

      <View className="py-8 px-4 w-full absolute bottom-0 bg-black">
        <PrimaryButton
          title={isSubmitting ? "Submitting" : "Change Password"}
          onPress={() => handleUpdatePassword()}
        />
      </View>
    </View>
  );
};

export default ChangePassword;
