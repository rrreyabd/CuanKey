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
import TransactionTypeDropdown from "@/components/TransactionTypeDropdown";
import CategoryDropdown from "@/components/CategoryDropdown";
import WalletDropdown from "@/components/WalletDropdown";

const AddRecurring = () => {
  // Format Currency, mengubah angka menjadi format mata uang
  const formatCurrency = (input: string) => {
    return input.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Form State untuk form input
  const [wallet, setWallet] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] = useState("");

  // Budget State
  const [rawAmount, setRawAmount] = useState("0");
  const [amount, setAmount] = useState<string>("0");

  //fungsi untuk menangani perubahan input jumlah transaksi
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
  // fungis menangani perubahan kategori
  const handleTransactionTypeChange = (value: string | null): void => {
    setTransactionType(value ?? "");
  };

// fungsi menangani perubahan kategori
  const handleCategoryChange = (value: string | null): void => {
    setCategory(value ?? "");
  };
//fungsi menangani perubahan dompet
  const handleWalletChange = (value: string | null): void => {
    setWallet(value ?? "");
  };

  //state menambahkan apakah proses pengiriman form sedang berlangsung
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmitRecurring = async () => {
    setIsSubmitting(true); // menandai bahwa proses sedang berlangsung
    try {
      // memanggil endppoint API untuk menambahkan transaksi berulang
      const response = await fetch(ENDPOINTS.RECURRING.BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify({
          wallet_id: wallet,
          category_id: category,
          amount: parseInt(rawAmount),
          description,
        }),
      });

      //jika response tidak berhasil, lemparkan error
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // menampilkan parsing respons json dari server
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
          <BackHeader pageTitle="Add Recurring Transaction" />
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
            title={isSubmitting ? "Processing..." : "Add Recurring"}
            onPress={handleSubmitRecurring}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddRecurring;
