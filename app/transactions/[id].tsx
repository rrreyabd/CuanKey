import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Image,
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

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#00FF00" />
      </View>
    );
  }

  if (!transaction) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <DataNotFound
          title="Transaction not found"
          subTitle="The transaction you are looking for does not exist."
          onPress={() => router.replace("/history/History")}
          buttonTitle="Back to History"
        />
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
          <Image
            source={require("@/assets/icons/edit-fill.png")}
            style={{ width: 24, height: 24 }}
          />
          <TouchableOpacity>
            <Image
              source={require("@/assets/icons/delete-white.png")}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="gap-4">
        <View>
          <Text className="text-subText font-poppinsSemibold">Category</Text>
          <Text className="text-white font-poppins">
            {transaction.category.name}
          </Text>
        </View>

        <View>
          <Text className="text-subText font-poppinsSemibold">Amount</Text>
          <Text
            className={`font-poppins text-lg ${
              transaction.category.type === "Pemasukan"
                ? "text-vividGreen"
                : "text-customRed"
            }`}
          >
            {transaction.category.type === "Pemasukan" ? "+" : "-"} Rp{" "}
            {transaction.amount.toLocaleString()}
          </Text>
        </View>

        <View>
          <Text className="text-subText font-poppinsSemibold">Date</Text>
          <Text className="text-white font-poppins">
            {transaction.transaction_date}
          </Text>
        </View>

        <View>
          <Text className="text-subText font-poppinsSemibold">Wallet</Text>
          <Text className="text-white font-poppins">
            {transaction.wallet.name}
          </Text>
        </View>

        <View>
          <Text className="text-subText font-poppinsSemibold">Description</Text>
          <Text className="text-white font-poppins">
            {transaction.description || "No description provided"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionDetail;
