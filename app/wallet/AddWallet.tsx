import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import BackHeader from "@/components/BackHeader";
import PrimaryButton from "@/components/PrimaryButton";
import { getToken } from "@/utils/auth";
import { ENDPOINTS } from "@/constants/api";
import { router } from "expo-router";

const AddWallet = () => {
  // Format Currency
  const formatCurrency = (input: string) => {
    return input.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Name State
  const [name, setName] = useState("");
  const handleWalletNameChange = (input: string) => {
    setName(input);
  };

  // Budget State
  const [rawInitialBalance, setRawInitialBalance] = useState("0");
  const [initialBalance, setInitialBalance] = useState<string>("0");
  const handleInitialBalanceChange = (input: string) => {
    if (input === "") {
      setRawInitialBalance("0");
      setInitialBalance("0");
      return;
    }

    if (input.startsWith("0") && input.length > 1) {
      input = input.substring(1);
    }

    const rawInput = input.replace(/\./g, "");
    setRawInitialBalance(rawInput);

    setInitialBalance(formatCurrency(rawInput));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmitWallet = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(ENDPOINTS.WALLET.BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify({
          name,
          initial_balance: parseInt(rawInitialBalance),
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      Alert.alert("Success", "Transaction added successfully");
      router.replace("/profile/Profile");
    } catch (error) {
      console.error("Error adding transaction:", error);
      Alert.alert("Error", "An error occurred while adding transaction");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1 bg-black">
        <View className="px-4 py-6">
          <BackHeader pageTitle="Add Wallet" />
          <View className="gap-4 mt-8">
            {/* WALLET NAME */}
            <View className="gap-2">
              <Text className="text-subText text-sm font-poppinsSemibold">
                WALLET NAME
              </Text>
              <TextInput
                placeholder="Wallet Name"
                value={name}
                onChangeText={handleWalletNameChange}
                className="text-white font-poppinsSemibold bg-charcoalGray w-full py-4 px-8 rounded-md placeholder:text-subText"
              />
            </View>

            {/* INITIAL BALANCE */}
            <View className="gap-2">
              <Text className="text-subText text-sm font-poppinsSemibold">
                INITIAL BALANCE
              </Text>
              <View className="relative justify-center">
                <View className="absolute z-10 left-8 w-12 border-r border-white">
                  <Text className="font-poppinsSemibold text-white">IDR</Text>
                </View>
                <TextInput
                  value={initialBalance}
                  onChangeText={handleInitialBalanceChange}
                  className="text-vividGreen font-poppinsSemibold bg-charcoalGray w-full py-4 pr-4 pl-24 rounded-md"
                  keyboardType="number-pad"
                />
              </View>
            </View>
          </View>
        </View>

        <View className="py-8 px-4 w-full absolute bottom-0 bg-black">
          <PrimaryButton
            title={isSubmitting ? "Processing..." : "Add Wallet"}
            onPress={handleSubmitWallet}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddWallet;

const styles = StyleSheet.create({});
