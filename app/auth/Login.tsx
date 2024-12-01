import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import AuthTextInput from "@/components/auth/AuthInput";
import HeaderAuth from "@/components/auth/HeaderAuth";
import { useAuth } from "@/context/AuthContext";
import { ENDPOINTS } from "@/constants/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, setUserData } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      setIsSubmitting(false);

      if (response.ok) {
        const { data } = await response.json();
        
        if (data.token) {
          await login(data.token, data);
          router.push("/");
        } else {
          Alert.alert("Error", "Token not found");
        }
      } else {
        Alert.alert("Error", "Login failed");
      }
    } catch (error) {
      setIsSubmitting(false);
      Alert.alert("Error", "An error occurred during login");
    }
  };

  return (
    <View className="flex-1 bg-black px-4">
      <ScrollView>
        <HeaderAuth title="Login" desc="Enter your credentials here" />
        <View className="gap-6 mt-8 h-[400px]">
          <AuthTextInput icon="envelope" placeholder="Email Address" value={email} onChangeText={setEmail} />
          <AuthTextInput icon="lock" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
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
