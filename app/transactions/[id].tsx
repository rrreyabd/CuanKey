import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { router, useGlobalSearchParams } from "expo-router";
import { ENDPOINTS } from "@/constants/api";
import { getToken } from "@/utils/auth";
import DataNotFound from "@/components/DataNotFound";
import BackHeader from "@/components/BackHeader";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const TransactionDetail = () => {
  const { id } = useGlobalSearchParams();
  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchTransactionDetails = async () => {
    try {
      const response = await fetch(`${ENDPOINTS.TRANSACTION.BASE}/${id}`, {
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
      setTransaction(json.data);
      console.log(transaction);
    } catch (error) {
      console.error("Failed to fetch transaction details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTransaction = async () => {
    try {
      const response = await fetch(`${ENDPOINTS.TRANSACTION.BASE}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      } else {
        Alert.alert("Transaction deleted successfully");
        router.replace("/history/History");
      }
    } catch (error) {
      console.error("Failed to fetch transaction details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTransactionDetails();
    }
  }, [id]);

  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  if (loading || !transaction) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#00FF00" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black px-4 py-6">
      <View className="flex-row justify-between px-4">
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome5 name="chevron-left" size={18} color="#ffffff" />
        </TouchableOpacity>

        <View className="flex-row gap-6">
          <TouchableOpacity onPress={handleDeleteTransaction}>
            <Image
              source={require("@/assets/icons/delete-white.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="items-center pt-16 pb-8 gap-2">
        <Text className="text-7xl pt-4 text-white">
          {transaction.category.icon}
        </Text>
        <Text className="text-white text-xl text-center font-poppinsSemibold">
          {transaction.category.name}
        </Text>
        <Text
          className={`text-2xl text-center font-poppinsSemibold ${
            transaction.category.type === "Pemasukan"
              ? "text-vividGreen"
              : "text-customRed"
          }`}
        >
          {transaction.category.type === "Pemasukan" ? "+" : "-"} Rp{" "}
          {formatCurrency(transaction.amount)}
        </Text>
      </View>

      <View className="bg-deepCharcoal px-4 rounded-md">
        <View className="justify-between flex-row border-b border-subText py-4">
          <Text className="text-white font-poppins">Date</Text>
          <Text className="text-white font-poppins">
            {transaction.transaction_date
              .split("T")[0]
              .split("-")
              .reverse()
              .join("/")}
          </Text>
        </View>
        <View className="justify-between flex-row border-b border-subText py-4">
          <Text className="text-white font-poppins">Wallet</Text>
          <Text className="text-white font-poppins">
            {transaction.wallet.name}
          </Text>
        </View>
        <View className="justify-between flex-row py-4">
          <Text className="text-white font-poppins">Note</Text>
          <Text className="text-white font-poppins">
            {transaction.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionDetail;
