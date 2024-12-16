import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const CrossHeader = ({pageTitle}: { pageTitle: string }) => {
  const router = useRouter();

  return (
    <View className="flex-row w-full items-center gap-8 px-4">
      <TouchableOpacity onPress={() => router.back()}>
        <MaterialCommunityIcons name="window-close" size={18} color="#ffffff" />
      </TouchableOpacity>

      <Text className="text-white font-poppinsBold text-xl">{pageTitle}</Text>
    </View>
  );
};

export default CrossHeader;
