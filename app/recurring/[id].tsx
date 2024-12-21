import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import BackHeader from "@/components/BackHeader";
import PrimaryButton from "@/components/PrimaryButton";
import { getToken } from "@/utils/auth";
import { ENDPOINTS } from "@/constants/api";
import { router, useGlobalSearchParams } from "expo-router";
import TransactionTypeDropdown from "@/components/TransactionTypeDropdown";
import CategoryDropdown from "@/components/CategoryDropdown";
import WalletDropdown from "@/components/WalletDropdown";

const EditRecurring = () => {
  const { id } = useGlobalSearchParams();
  // Format Currency
  const formatCurrency = (input: string) => {
    return input.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Form State
  const [wallet, setWallet] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [recurringData, setRecurringData] = useState();

  // Budget State
  const [rawAmount, setRawAmount] = useState("0");
  const [amount, setAmount] = useState<string>("0");
  const handleAmountChange = (input: string) => {
    if (input === "") {
      setRawAmount("0");
      setAmount("0");
      return;
    }

    if (input.startsWith("0") && input.length > 1) {
      input = input.substring(1);
    }

    const rawInput = input.replace(/\./g, "");
    setRawAmount(rawInput);

    setAmount(formatCurrency(rawInput));
  };

  const handleTransactionTypeChange = (value: string | null): void => {
    setTransactionType(value ?? "");
  };

  const handleCategoryChange = (value: string | null): void => {
    setCategory(value ?? "");
  };

  const handleWalletChange = (value: string | null): void => {
    setWallet(value ?? "");
  };

  const getRecurringData = async () => {
    try {
      const response = await fetch(`${ENDPOINTS.RECURRING.BASE}/${id}`, {
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
      const data = json.data;

      setWallet(data.wallet_id);
      setCategory(data.category_id);
      setDescription(data.description);
      setRawAmount(data.amount.toString());
      setAmount(formatCurrency(data.amount.toString()));
      setRecurringData(data);

      console.log(recurringData)

    } catch (error) {
      console.error("Failed to fetch recurring data:", error);
      throw error;
    }
  };

  useEffect(() => {
    getRecurringData();
  }, []);

  useEffect(() => {
    console.log("");
    console.log("");
    console.log("category: ", category);
    console.log("description: ", description);
    console.log("transactionType: ", transactionType);
    console.log("amount: ", amount);
    console.log("wallet: ", wallet);
    console.log("rawAmount: ", rawAmount);
    console.log("");
    console.log("");
  }, [category, description, transactionType, amount, wallet, rawAmount]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleUpdateRecurring = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${ENDPOINTS.RECURRING.BASE}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify({
          wallet_id: wallet,
          category_id: category,
          is_active: true,
          amount: parseInt(rawAmount),
          description,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      Alert.alert("Success", "Recurring transaction added successfully");
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
          <BackHeader pageTitle="Edit Recurring Transaction" />
          <View className="gap-4 mt-8">
            {/* TRANSACTION TYPE */}
            <View className="gap-2">
              <Text className="text-subText text-sm font-poppinsSemibold">
                TRANSACTION TYPE
              </Text>
              <TransactionTypeDropdown
                onValueChange={handleTransactionTypeChange}
              />
            </View>

            {/* CATEGORY */}
            {transactionType && (
              <View className="gap-2">
                <Text className="text-subText text-sm font-poppinsSemibold">
                  CATEGORY
                </Text>
                <CategoryDropdown
                  onValueChange={handleCategoryChange}
                  transactionType={transactionType}
                />
              </View>
            )}

            {/* DESCRIPTION */}
            <View className="gap-2">
              <Text className="text-subText text-sm font-poppinsSemibold">
                DESCRIPTION
              </Text>
              <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                className="text-white font-poppinsSemibold bg-charcoalGray w-full py-4 px-8 rounded-md placeholder:text-subText"
              />
            </View>

            {/* AMOUNT */}
            <View className="gap-2">
              <Text className="text-subText text-sm font-poppinsSemibold">
                AMOUNT
              </Text>
              <View className="relative justify-center">
                <View className="absolute z-10 left-8 w-12 border-r border-white">
                  <Text className="font-poppinsSemibold text-white">IDR</Text>
                </View>
                <TextInput
                  value={amount}
                  onChangeText={handleAmountChange}
                  className="text-vividGreen font-poppinsSemibold bg-charcoalGray w-full py-4 pr-4 pl-24 rounded-md"
                  keyboardType="number-pad"
                />
              </View>
            </View>

            {/* WALLET */}
            <View className="gap-2">
              <Text className="text-subText text-sm font-poppinsSemibold">
                WALLET
              </Text>
              <WalletDropdown onValueChange={handleWalletChange} />
            </View>
          </View>
        </View>

        <View className="py-8 px-4 w-full absolute bottom-0 z-50 bg-black">
          <PrimaryButton
            title={isSubmitting ? "Processing..." : "Save Changes"}
            onPress={handleUpdateRecurring}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditRecurring;
