import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useGlobalSearchParams } from "expo-router";
import { ENDPOINTS } from "@/constants/api";
import { getToken } from "@/utils/auth";
import CrossHeader from "@/components/CrossHeader";
import { Category } from "@/data/types";
import TransactionTypeDropdown from "@/components/TransactionTypeDropdown";
import PrimaryButton from "@/components/PrimaryButton";
import EmojiPicker from "react-native-emoji-modal";

// Komponen edit anggaran
const EditBudget = () => {
  const { id } = useGlobalSearchParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);

  // fungsi untuk mengambil detail kategori berdasarkan ID, memanggil endpoint category
  const getCategoryDetail = async () => {
    try {
      const response = await fetch(`${ENDPOINTS.CATEGORY.BASE}/${id}`, {
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
      console.log("");
      console.log(JSON.stringify(json.data, null, 2));
      console.log("");

      // mengupdate state dengan data kategori
      const category = json.data;
      setName(category.name);
      setEmoji(category.icon);
      setDescription(category.description);
      setBudget(category.budget ? category.budget.toString() : "0");
      setTransactionType(category.type);

      setCategory(json.data);
    } catch (error) {
      console.error("Failed to fetch category details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getCategoryDetail(); // memanggil detail kategori saat komponen dimuat
    }
  }, []);

  // Format Currency
  const formatCurrency = (input: string) => {
    return input.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // State dan Fungsi handler untuk input nama
  const [name, setName] = useState(category?.name);
  const handleNameChange = (input: string) => {
    setName(input);
  };

  // Icon State dan fungsi untuk emoji
  const [icon, setIcon] = useState(category?.icon || "");
  const handleIconChange = (input: string) => {
    setIcon(input);
  };

  // Description State
  const [description, setDescription] = useState(category?.description || "");
  const handleDescriptionChange = (input: string) => {
    setDescription(input);
  };

  // Budget State
  const [rawBudget, setRawBudget] = useState("0");
  const [budget, setBudget] = useState<string>(
    category?.budget ? category.budget.toString() : "0"
  );
  const handleBudgetChange = (input: string) => {
    if (input === "") {
      setRawBudget("0");
      setBudget("0");
      return;
    }

    if (input.startsWith("0") && input.length > 1) {
      input = input.substring(1);
    }

    const rawInput = input.replace(/\./g, "");
    setRawBudget(rawInput);

    setBudget(formatCurrency(rawInput));
  };

  // Transaction Type State
  const [transactionType, setTransactionType] = useState(category?.type || "");
  const handleTransactionTypeChange = (value: string | null): void => {
    setTransactionType(value ?? "");
  };

  // Emoji State
  const [emoji, setEmoji] = useState<string>(category?.icon || "");
  const [emojiPicker, setEmojiPicker] = useState(false);

  const handleOutsidePress = () => {
    setEmojiPicker(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    console.log("");
    console.log("nameee: ", category?.name);
    console.log("name: ", name);
    console.log("icon: ", emoji);
    console.log("description: ", description);
    console.log("rawBudget: ", rawBudget);
    console.log("budget: ", budget);
    console.log("transactionType: ", transactionType);
  }, [name, emoji, description, rawBudget, budget, transactionType]);


  // FUNGSI UNTUK MEMPERBARUI KATEGORI
  const handleUpdateCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${ENDPOINTS.CATEGORY.BASE}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`, // token autentikasi
        },
        body: JSON.stringify({
          name,
          icon: emoji,
          description,
          budget: parseInt(rawBudget), // konversi anggaran menjadi angka
          type: transactionType,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = response.json();
      console.log(data);

      Alert.alert("Success", "Category updated successfully");
      setLoading(false);
      router.replace("/budget/Budget");
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  // menampilkan indikator loading jika data belum dimuat
  if (loading || !category) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#00FF00" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View className="flex-1 bg-black px-4 py-6">
          <CrossHeader pageTitle="Edit Category" />

          <View className="gap-4 mt-8">
            {/* NAME */}
            <View className="gap-2">
              <Text className="text-subText text-sm font-poppinsSemibold">
                NAME
              </Text>
              <TextInput
                value={name}
                onChangeText={handleNameChange}
                className="text-white font-poppinsSemibold bg-charcoalGray w-full py-4 px-4 rounded-md"
              />
            </View>

            {/* ICON */}
            <View className="gap-2 relative">
              <Text className="text-subText text-sm font-poppinsSemibold">
                ICON
              </Text>
              {emojiPicker && (
                <EmojiPicker
                  onEmojiSelected={(emoji) => setEmoji(emoji || "")}
                  modalStyle={{
                    zIndex: 50,
                    position: "absolute",
                    left: 20,
                    top: "120%",
                  }}
                />
              )}
              <TouchableOpacity onPress={() => setEmojiPicker(!emojiPicker)}>
                <View className="flex-row items-center bg-charcoalGray w-full py-4 px-4 rounded-md">
                  <Text className="text-white font-poppinsSemibold">
                    {emoji ? emoji : icon}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* DESCRIPTION */}
            <View className="gap-2">
              <Text className="text-subText text-sm font-poppinsSemibold">
                DESCRIPTION
              </Text>
              <TextInput
                value={description}
                onChangeText={handleDescriptionChange}
                className="text-white font-poppinsSemibold bg-charcoalGray w-full py-4 px-4 rounded-md"
              />
            </View>

            {/* TRANSACTION TYPE */}
            <View className="gap-2">
              <Text className="text-subText text-sm font-poppinsSemibold">
                TRANSACTION TYPE
              </Text>
              <TransactionTypeDropdown
                onValueChange={handleTransactionTypeChange}
                defaultValue={category.type}
              />
            </View>

            {/* BUDGET */}
            <View className="gap-2">
              <Text className="text-subText text-sm font-poppinsSemibold">
                BUDGET
              </Text>
              <View className="relative justify-center">
                <View className="absolute z-10 left-8 w-12 border-r border-white">
                  <Text className="font-poppinsSemibold text-white">IDR</Text>
                </View>
                <TextInput
                  value={budget}
                  onChangeText={handleBudgetChange}
                  className="text-vividGreen font-poppinsSemibold bg-charcoalGray w-full py-4 pr-4 pl-24 rounded-md"
                  keyboardType="number-pad"
                />
              </View>

              <View className="mt-10">
                <PrimaryButton
                  title="Save Changes"
                  onPress={handleUpdateCategory}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EditBudget;
