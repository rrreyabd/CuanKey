import { Button, Image, Pressable, Text, View } from "react-native";
import React from "react";
import BackHeader from "@/components/BackHeader";
import DangerButton from "@/components/DangerButton";
import { useAuth } from "@/context/AuthContext";

const DeleteAccount = () => {
  const { handleDeleteAccount } = useAuth();
  return (
    <View className="bg-black flex-1">
      <View className=" py-6 px-4 relative">
        <BackHeader pageTitle="Delete Account" href="/profile/EditAccount" />

        <View className="items-center py-8">
          <Image source={require("@/assets/icons/red_warning.png")} />
        </View>

        <View className="gap-6">
          <Text className="font-poppinsBold text-white text-lg text-center">
            Proceed to Delete Your Account?
          </Text>
          <Text className="font-poppins text-white text-lg text-center">
            You Will Lose:
          </Text>

          <View>
            {consequences.map((consequence) => UnorderedList(consequence))}
          </View>
        </View>
      </View>
      <View className="py-8 px-4 w-full absolute bottom-0">
        <DangerButton
          title="Delete Account"
          onPress={() => handleDeleteAccount()}
        />
      </View>
    </View>
  );
};

export default DeleteAccount;

const consequences = [
  "All saved financial data, including transaction history and budgets.",
  "Access to any reports, charts, or financial insights generated.",
  "Any personalized settings and preferences in the app.",
];

const UnorderedList = (children: string) => {
  return (
    <View className="flex-row items-start gap-2">
      <Text className="text-white">•</Text>
      <Text className="text-white font-poppins">{children}</Text>
    </View>
  );
};
