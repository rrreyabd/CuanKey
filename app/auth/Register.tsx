import React, { useState } from "react";
import AuthTextInput from "@/components/Auth/AuthInput";
import HeaderAuth from "@/components/Auth/HeaderAuth";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { ENDPOINTS } from "@/constants/api";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (isSubmitting) return;

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(ENDPOINTS.AUTH.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: fullName,
          email,
          phone_number: phone,
          password,
          password_confirmation: confirmPassword,
        }),
      });

      setIsSubmitting(false);

      if (response.ok) {
        Alert.alert("Success", "Registration successful");
        router.push("/auth/Login");
      } else {
        const errorData = await response.json();
        console.error("Registration error:", errorData);
        Alert.alert("Error", "Registration failed");
      }
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error during registration:", error);
      Alert.alert("Error", "An error occurred during registration");
    }
  };

  return (
    <View className="flex-1 bg-black px-4">
      <ScrollView>
        {/* Header */}
        <HeaderAuth title="Register" desc="Create your account here" />

        {/* Form */}
        <KeyboardAvoidingView
          className="gap-6 mt-8"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
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
            placeholder="Password"
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
        </KeyboardAvoidingView>

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
