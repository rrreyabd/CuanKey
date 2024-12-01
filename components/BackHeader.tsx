import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const BackHeader = ({pageTitle}: { pageTitle: string }) => {
  const router = useRouter();

  return (
    <View className="flex-row w-full items-center gap-8 px-4">
      <TouchableOpacity onPress={() => router.back()}>
        <FontAwesome5 name="chevron-left" size={18} color="#ffffff" />
      </TouchableOpacity>

      <Text className="text-white font-poppinsBold text-xl">{pageTitle}</Text>
    </View>
  );
};

export default BackHeader;
