import DataNotFound from "@/components/DataNotFound";
import Navbar from "@/components/Navbar";
import WalletDropdownHistory from "@/components/WalletDropdownHistory";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const Budget = () => {
  const [activeWallet, setActiveWallet] = useState("Cash Wallet");

  const handleWalletChange = (value: string | null): void => {
    setActiveWallet(value ?? "");
  };
  return (
    <View className="flex-1 bg-black">
      <ScrollView className="py-6 px-4">
        <View className="justify-center w-full items-center gap-4">
          <Text className="text-white font-poppinsBold text-xl">
            Running Budgets
          </Text>
          <WalletDropdownHistory onValueChange={handleWalletChange} />
        </View>

        <View className="mt-16">
          <DataNotFound
            title="You have no budget yet"
            subTitle="Start budgeting smarter and reach your financial goals, one step at a time."
            onPress={() => router.replace("/transactions/Transaction")}
            buttonTitle="Add Budget"
          />
        </View>
      </ScrollView>
      <Navbar />
    </View>
  );
};

export default Budget;
