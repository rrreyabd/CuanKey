import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import AuthTextInput from "@/components/auth/AuthInput";
import HeaderAuth from "@/components/auth/HeaderAuth";
import { useAuth } from "@/context/AuthContext";
import { ENDPOINTS } from "@/constants/api";

// Komponen login sebagai layar untuk autentikasi pengguna
const Login = () => {
  // state untuk menyimpan input email dan password user
  const [email, setEmail] = useState(""); // input email
  const [password, setPassword] = useState(""); // input password
  const [isSubmitting, setIsSubmitting] = useState(false); // menunjukkan apakah form sedang diproses
  const { login } = useAuth(); // mengambil fungsi login dari konteks autentikasi
  const router = useRouter(); // digunakan untuk navigasi antar halaman

  // fungsi untuk menangani login pengguna
  const handleLogin = async () => {
    if (isSubmitting) return; // mencegah proses ganda saat form diproses

    setIsSubmitting(true); // mengubah state menjadi sedang diproses
    try {
      //  melakukan request POST ke endpoin login (api backend)
      const response = await fetch(ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // header untuk menginformasikan data dalam format json
        body: JSON.stringify({ email, password }), // data login dikirim ke server
      });

      setIsSubmitting(false); // mengembalikan state sedang memproses menjadi false

      if (response.ok) {
        // mengambil data dari response server
        const { data } = await response.json();

        if (data.token) {
          // jika token berhasil diterima, pengguna berhasil login
          await login(data.token, data); // menyimpan token dan informasi pengguna di konteks autentikasi
          router.replace("/"); // navigasi ke halaman utama
        } else {
          // pesan error jika token tidak ditemukan
          Alert.alert("Error", "Token not found");
        }
      } else {
        //pesan error jika login tidak berhasil
        Alert.alert("Error", "Login failed");
      }
    } catch (error) {
      setIsSubmitting(false); // state kembali menjadi false
      //pesan error jika terjadi kesalahan proses
      Alert.alert("Error", "An error occurred during login");
    }
  };

  return (
    <View className="flex-1 bg-black px-4">
      <ScrollView>
        <HeaderAuth title="Login" desc="Enter your credentials here" />
        <View className="gap-6 mt-8 h-[400px]">
          <AuthTextInput
            icon="envelope"
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
          />
          <AuthTextInput
            icon="lock"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <View className="flex flex-col justify-end">
            <View className="self-end">
              <Link href="/auth/ForgotPassword" className="text-white font-poppins underline">Forgot Password?</Link>
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <View className="w-full">
          <LinearGradient
            colors={["#00B553", "#004F24"]}
            start={[0, 0]}
            end={[1, 0]}
            className="h-14 justify-center rounded-xl overflow-hidden"
          >
            <Pressable onPress={handleLogin} disabled={isSubmitting}>
              <Text className="font-poppinsSemibold text-white text-center">
                {isSubmitting ? "Submitting..." : "Login"}
              </Text>
            </Pressable>
          </LinearGradient>
        </View>

        <View className="mt-4">
          <Text className="text-white text-center">
            Don’t have an account?{" "}
            <Link href="/auth/Register" className="text-green-500 underline">
              Register
            </Link>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
