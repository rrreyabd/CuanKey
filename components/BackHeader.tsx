import { Text, View } from "react-native";
import React from "react";
import { Link, LinkProps } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

interface BackHeaderProps {
  pageTitle: string;
  href: LinkProps['href'];
}

const BackHeader: React.FC<BackHeaderProps> = ({ pageTitle, href }) => {
  return (
    <View className="flex-row w-full items-center gap-8 px-4">
      <Link href={href}>
        <FontAwesome5 name="chevron-left" size={18} color="#ffffff" />
      </Link>
      <Text className="text-white font-poppinsBold text-xl">{pageTitle}</Text>
    </View>
  );
};

export default BackHeader;