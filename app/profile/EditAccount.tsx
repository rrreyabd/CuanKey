import { Image, Text, View } from "react-native";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import BackHeader from "@/components/BackHeader";
import DangerButton from "@/components/DangerButton";

const EditAccount = () => {
  const { user, handleLogout } = useAuth();

  return (
    <View className="bg-black flex-1">
    <View className="py-6 px-4">
      <BackHeader pageTitle="Profile" href="/profile/Profile" />

      <View className="py-8 gap-8 items-center w-full">
        <View className="bg-white rounded-full aspect-square overflow-hidden">
          <Image
            source={require("@/assets/profile/character_1.png")}
            style={{ width: 120, height: 120 }}
          />
        </View>
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
        <Link href="/">
          <View className="bg-deepCharcoal flex-row justify-between w-full p-4 rounded-md">
            <View className="gap-6 flex-row items-center">
              <Image
                source={require("@/assets/icons/exchange-solid.png")}
                style={{ width: 24, height: 24 }}
              />
              <Text className="text-white font-poppins">Change Account Data</Text>
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
        <DangerButton
          title="Logout"
          onPress={() => handleLogout()}
        />
      </View>
    </View>
  );
};

export default EditAccount;
