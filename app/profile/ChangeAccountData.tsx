import { Alert, View } from "react-native";
import React, { useState } from "react";
import BackHeader from "@/components/BackHeader";
import Input from "@/components/Input";
import { useAuth } from "@/context/AuthContext";
import PrimaryButton from "@/components/PrimaryButton";
import { ENDPOINTS } from "@/constants/api";
import { getToken } from "@/utils/auth";
import { router } from "expo-router";

const ChangeAccountData = () => {
  const { user, setUserData } = useAuth();
  const [fullName, setFullName] = useState(user?.fullname || "");
  const [phone, setPhone] = useState(user?.phone_number || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateProfile = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch(ENDPOINTS.USER, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify({
          profile_picture: "1",
          fullname: fullName,
          phone_number: phone,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setUserData(data.data);
      Alert.alert("Success", "Profile updated successfully");
      router.replace("/profile/Profile");
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
