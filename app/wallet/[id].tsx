import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useGlobalSearchParams } from "expo-router";
import CrossHeader from "@/components/CrossHeader";
import { TextInput } from "react-native-gesture-handler";
import { ENDPOINTS } from "@/constants/api";
import { getToken } from "@/utils/auth";
import PrimaryButton from "@/components/PrimaryButton";
import { UserWallet, WalletResponse } from "@/data/types";
import DangerButton from "@/components/DangerButton";

const EditWallet = () => {
  const { id } = useGlobalSearchParams();
  const [loading, setLoading] = useState(false);
  const [walletData, setWalletData] = useState<WalletResponse>();

  const getWalletData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${ENDPOINTS.WALLET.BASE}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      setWalletData(json.data);
    } catch (error) {
      console.error("Failed to fetch user wallets:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWalletData();
  }, []);

  // Format Currency
  const formatCurrency = (input: string) => {
    return input.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Name State
  const [name, setName] = useState(walletData?.name || "");
  const handleWalletNameChange = (input: string) => {
    setName(input);
  };

  // Budget State
  const [rawInitialBalance, setRawInitialBalance] = useState(
    walletData?.initial_balance.toString() || "0"
  );
  const [initialBalance, setInitialBalance] = useState<string>(
    formatCurrency(walletData?.initial_balance.toString() || "0")
  );
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

  useEffect(() => {
    console.log("");
    console.log("");
    console.log("");
    console.log(name);
    console.log(rawInitialBalance);
    console.log(initialBalance);
    console.log("");
    console.log("");
    console.log("");
  }, [name, initialBalance, rawInitialBalance]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleUpdateWallet = async () => {
    try {
      const response = await fetch(`${ENDPOINTS.WALLET.BASE}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify({
          name,
          initial_balance: rawInitialBalance,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      Alert.alert("Success", "Wallet updated successfully");
      router.replace("/profile/Profile");
    } catch (error) {
      console.error("Error updating wallet:", error);
      Alert.alert("Error", "An error occurred while updating wallet");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setName(walletData?.name || "s");
    setRawInitialBalance(parseInt(rawInitialBalance).toString());
    setInitialBalance(
      formatCurrency(walletData?.initial_balance?.toString() || "0")
    );
  }, [walletData]);

  const handleDeleteWallet = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this wallet?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            setIsSubmitting(true);
            try {
              const response = await fetch(`${ENDPOINTS.WALLET.BASE}/${id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${await getToken()}`,
                },
              });

              if (!response.ok) {
                throw new Error(
                  `Error: ${response.status} ${response.statusText}`
                );
              }

              Alert.alert("Success", "Wallet deleted successfully");
              router.replace("/profile/Profile");
            } catch (error) {
              console.error("Error deleting wallet:", error);
              Alert.alert(
                "Error",
                "An error occurred while deleting the wallet"
              );
            } finally {
              setIsSubmitting(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#00FF00" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <View className="px-4 py-6">
        <CrossHeader pageTitle="Edit Wallet" />
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
              className="text-white font-poppinsSemibold bg-charcoalGray w-full py-4 px-8 rounded-md placeholder:text-subText placeholder:font-poppinsSemibold"
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

      <View className="py-8 px-4 w-full absolute bottom-0 bg-black gap-4">
        <PrimaryButton
          title={isSubmitting ? "Processing..." : "Update Wallet"}
          onPress={handleUpdateWallet}
        />

        <DangerButton
          title={isSubmitting ? "Deleting..." : "Delete Wallet"}
          onPress={handleDeleteWallet}
        />
      </View>
    </View>
  );
};

export default EditWallet;

const styles = StyleSheet.create({});
