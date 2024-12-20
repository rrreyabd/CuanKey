import React, { useState } from "react";
import AuthTextInput from "@/components/auth/AuthInput";
import HeaderAuth from "@/components/auth/HeaderAuth";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { ENDPOINTS } from "@/constants/api";

// Komponen Register untuk mendaftarkan pengguna baru
const Register = () => {
  // State untuk menyimpan data input pengguna
  const [fullName, setFullName] = useState(""); // Nama lengkap pengguna
  const [email, setEmail] = useState(""); // Email pengguna
  const [phone, setPhone] = useState(""); // Nomor telepon pengguna
  const [password, setPassword] = useState(""); // Password Pengguna
  const [confirmPassword, setConfirmPassword] = useState(""); // Konfirmasi Password
  const [isSubmitting, setIsSubmitting] = useState(false); // Status apakah proses sedang berjalan
  const router = useRouter(); // Untuk navigasi antar halaman

  // Fungsi untuk proses pendaftaran
  const handleRegister = async () => {
    if (isSubmitting) return; // mencegah proses berulang saat sedang berjalan

    // validasi password untuk melihat kecocokan kredensial
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setIsSubmitting(true); //mengubah state ke sedang memproses

    try {
      // mengirim data ke server dengan post dan mengambil endpoint auth dan register
      const response = await fetch(ENDPOINTS.AUTH.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: fullName, // mengirim nama lengkap
          email, // mengirim email
          phone_number: phone, // mengirim nomor telepon
          password, // mengirim password
          password_confirmation: confirmPassword, // mengirim konfirmasi password
        }),
      });

      setIsSubmitting(false); // mengembalikan status sedang memprises menjadi false

      if (response.ok) {
        // menampilkan pesan registrasi berhasil jika proses berhasil
        Alert.alert("Success", "Registration successful");
        router.push("/auth/Login"); // pergi ke halaman login
      } else {
        // menampilkan pesan error jika registrasi gagal
        const errorData = await response.json();
        console.error("Registration error:", errorData);
        Alert.alert("Error", "Registration failed");
      }
    } catch (error) {
      // menampilkan pesan error jika proses gagal
      setIsSubmitting(false); // mengembalikan state menjadi false
      console.error("Error during registration:", error); // logging error saat proses gagal
      Alert.alert("Error", "An error occurred during registration");
    }
  };

  return (
    <View className="flex-1 bg-black px-4">
      <ScrollView>
        {/* Header */}
        <HeaderAuth title="Register" desc="Create your account here" />

        {/* Form */}
        <View className="gap-6 mt-8 h-[400px]">
          <AuthTextInput
            placeholder="Full Name"
            icon="user-circle"
            value={fullName}
            onChangeText={setFullName}
          />
          <AuthTextInput
            placeholder="Email Address"
            icon="envelope"
            value={email}
            onChangeText={setEmail}
          />
          <AuthTextInput
            placeholder="Phone Number"
            icon="phone"
            value={phone}
            onChangeText={setPhone}
          />
          <AuthTextInput
            placeholder="Password (min. 8 characters)"
            icon="lock"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <AuthTextInput
            placeholder="Confirm Your Password"
            icon="lock"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        {/* Submit Button */}
        <View className="items-center gap-6">
          <View className="w-full">
            <LinearGradient
              colors={["#00B553", "#004F24"]}
              start={[0, 0]}
              end={[1, 0]}
              className="h-14 justify-center rounded-xl overflow-hidden"
            >
              <Pressable onPress={handleRegister} disabled={isSubmitting}>
                <Text className="font-poppinsSemibold text-white text-center">
                  {isSubmitting ? "Processing..." : "Register"}
                </Text>
              </Pressable>
            </LinearGradient>
          </View>
        </View>

        {/* Login Link */}
        <View className="mt-6">
          <Text className="text-white/75 text-center">
            Already have an account?{" "}
            <Link
              href="/auth/Login"
              className="underline font-poppinsSemibold text-vividGreen"
            >
              Login
            </Link>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;
