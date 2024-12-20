import DataNotFound from "@/components/DataNotFound";
import Navbar from "@/components/Navbar";
import WalletDropdownHistory from "@/components/WalletDropdownHistory";
import { ENDPOINTS } from "@/constants/api";
import { Category } from "@/data/types";
import { checkLoginStatus, getToken } from "@/utils/auth";
import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Budget = () => {
  // All Transactions Amount
  const [allTransactionsAmount, setAllTransactionsAmount] = useState<number>(0);

  // Get User Category
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const getUserCategory = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(ENDPOINTS.CATEGORY.BASE, {
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
      const categories: Category[] = json.data;
      const allTransactionsAmount = json.all_transaction;
      setAllTransactionsAmount(allTransactionsAmount);
      setCategories(categories);
      setIsFetching(false);
    } catch (error) {
      console.error("Failed to fetch user categories:", error);
      throw error;
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        const loggedIn = await checkLoginStatus();
        if (!loggedIn) {
          router.replace("/auth/Login");
          return;
        }
        await Promise.all([getUserCategory()]);
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };

    initializeData();
  }, []);

  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  if (isFetching) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#00B553" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <ScrollView className="py-6 px-4">
        <View className="justify-center w-full items-center gap-4">
          <Text className="text-white font-poppinsBold text-xl">
            Categories
          </Text>
        </View>

        {categories.length > 0 ? (
          <View className="mt-16 gap-4">
            <Link href="/budget/AddBudget">
              <Text className="text-white text-lg font-poppins text-right">
                Add Category
              </Text>
            </Link>

            {categories.map((category, index) => {
              const totalTransaction =
                category.total_transaction === null
                  ? 0
                  : category.total_transaction;
              const budget = category.budget === null ? 0 : category.budget;
              const percentage = (totalTransaction / budget) * 100;
              console.log("persentase ke-" + index + ": " + percentage);

              return (
                <View
                  key={index}
                  className="bg-charcoalGray rounded-md p-4 flex-row justify-between items-center"
                >
                  <View className="w-2/12">
                    <Text className="text-4xl">{category.icon}</Text>
                  </View>
                  <View className="w-10/12 gap-2">
                    <View className="flex-row justify-between items-center w-full">
                      <Text className="text-white font-poppinsSemibold">
                        {category.name}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          router.push(`/budget/${category.id}`);
                        }}
                      >
                        <Image
                          source={require("@/assets/icons/edit-fill.png")}
                          style={{ width: 20, height: 20 }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <View className="w-full bg-subText rounded-sm overflow-hidden h-4">
                        <View
                          className={`bg-vividGreen ${
                            percentage === 0 ? "p-0" : "p-2"
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></View>
                      </View>
                      <View className="flex-row justify-between items-center w-full">
                        <Text className="text-white font-poppinsSemibold text-sm">
                          Rp{" "}
                          {category.total_transaction
                            ? formatCurrency(category.total_transaction)
                            : 0}
                        </Text>
                        <Text className="text-vividGreen font-poppinsSemibold text-sm">
                          Rp{" "}
                          {category.budget === null
                            ? 0
                            : formatCurrency(category.budget)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          // Data Not Found
          <View className="mt-16">
            <DataNotFound
              title="You have no budget yet"
              subTitle="Start budgeting smarter and reach your financial goals, one step at a time."
              onPress={() => router.replace("/transactions/Transaction")}
              buttonTitle="Add Budget"
            />
          </View>
        )}
      </ScrollView>
      <Navbar />
    </View>
  );
};

export default Budget;
