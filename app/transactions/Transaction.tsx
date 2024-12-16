import CategoryDropdown from "@/components/CategoryDropdown";
import CrossHeader from "@/components/CrossHeader";
import TransactionTypeDropdown from "@/components/TransactionTypeDropdown";
import WalletDropdown from "@/components/WalletDropdown";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Pressable,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import PrimaryButton from "@/components/PrimaryButton";
import { getToken } from "@/utils/auth";
import { ENDPOINTS } from "@/constants/api";
import { router } from "expo-router";

const Transaction = () => {
  const [rawAmount, setRawAmount] = useState("0");
  const [transactionType, setTransactionType] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("0");
  const [date, setDate] = useState(new Date());
  const [wallet, setWallet] = useState("");
  const [notes, setNotes] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onChange = (
    { type }: { type: string },
    selectedDate: Date | undefined
  ) => {
    if (type === "set" && selectedDate) {
      setDate(selectedDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
      }
    } else {
      toggleDatePicker();
    }
  };

  useEffect(() => {
    console.log(
      "amount: ", rawAmount + 
      "\ndate: ", formatDate(date) + 
      "\nnotes: ", notes +
      "\nwallet: ", wallet +
      "\ncategory: ", category
    );
  }, [rawAmount, date, notes, wallet, category, transactionType]);

  const formatCurrency = (num: string) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAmountChange = (text: string) => {
    let numericValue = text.replace(/,/g, "");
    if (numericValue === "") {
      setRawAmount("0");
      setAmount("0");
    } else {
      // Remove leading zeros
      numericValue = numericValue.replace(/^0+(?!$)/, "");
      const value = parseFloat(numericValue);
      if (!isNaN(value)) {
        setRawAmount(numericValue);
        setAmount(formatCurrency(numericValue));
      }
    }
  };

  const handleWalletChange = (value: string | null): void => {
    setWallet(value ?? "");
  };

  const handleCategoryChange = (value: string | null): void => {
    setCategory(value ?? "");
  };

  const handleTransactionTypeChange = (value: string | null): void => {
    setTransactionType(value ?? "");
  };

  const confirmIOSDate = () => {
    setDate(date);
    toggleDatePicker();
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  const handleSubmitTransaction = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(ENDPOINTS.TRANSACTION.BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        body: JSON.stringify({
          wallet_id: wallet,
          category_id: category,
          amount: rawAmount,
          description: notes,
          transaction_date: formatDate(date),
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      Alert.alert("Success", "Transaction added successfully");
      router.replace("/");
    } catch (error) {
      console.error("Error adding transaction:", error);
      Alert.alert("Error", "An error occurred while adding transaction");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="bg-black flex-1 py-6 px-4">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <CrossHeader pageTitle="Add Transaction" />
          <View className="gap-6 py-8">
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

            {/* DATE */}
            <View className="gap-2">
              <Text className="text-subText text-sm font-poppinsSemibold">
                DATE
              </Text>
              <Pressable onPress={toggleDatePicker}>
                <View className="flex-row justify-between items-center bg-charcoalGray w-full py-4 px-8 rounded-md">
                  <Text className="text-white font-poppinsSemibold">
                    {date.toDateString()}
                  </Text>
                </View>
              </Pressable>

              {/* DATEPICKER */}
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="spinner"
                  onChange={onChange}
                  style={styles.datePicker}
                />
              )}

              {/* Confirm Button for iOS */}
              {showDatePicker && Platform.OS === "ios" && (
                <View className="flex-row justify-around">
                  <TouchableOpacity onPress={toggleDatePicker}>
                    <Text>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={confirmIOSDate}>
                    <Text>Confirm</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* NOTES */}
            <View className="gap-2">
              <Text className="text-subText text-sm font-poppinsSemibold">
                NOTES
              </Text>
              <TextInput
                placeholder="Add Notes (if needed)"
                placeholderTextColor="#525B69"
                value={notes}
                onChangeText={setNotes}
                className="text-white font-poppinsSemibold bg-charcoalGray w-full py-4 px-8 rounded-md"
                keyboardType="default"
              />
            </View>

            {/* WALLET */}
            <View className="gap-2">
              <Text className="text-subText text-sm font-poppinsSemibold">
                WALLET
              </Text>
              <WalletDropdown onValueChange={handleWalletChange} />
            </View>

            <PrimaryButton
              title={isSubmitting ? "Processing..." : "Add Transaction"}
              onPress={() => handleSubmitTransaction()}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  datePicker: {
    height: 120,
    marginTop: -10,
  },
});
