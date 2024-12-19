import DataNotFound from "@/components/DataNotFound";
import Navbar from "@/components/Navbar";
import WalletDropdownHistory from "@/components/WalletDropdownHistory";
import { ENDPOINTS } from "@/constants/api";
import { Category } from "@/data/types";
import { checkLoginStatus, getToken } from "@/utils/auth";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Budget = () => {
  // Wallet Dropdown
  const [activeWallet, setActiveWallet] = useState("Cash Wallet");
  const handleWalletChange = (value: string | null): void => {
    setActiveWallet(value ?? "");
  };

  // Get User Category
  const [categories, setCategories] = useState<Category[]>([]);
  const getUserCategory = async () => {
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
      setCategories(categories);
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
        console.log(activeWallet);
        await Promise.all([getUserCategory()]);
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };

    initializeData();
  }, [activeWallet]);

  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

        {categories.length > 0 ? (
          <View className="mt-16 gap-4">
            {categories.map((category, index) => (
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
                    <TouchableOpacity>
                      <Image
                        source={require("@/assets/icons/edit-fill.png")}
                        style={{ width: 20, height: 20 }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <View className="w-full bg-subText rounded-sm overflow-hidden">
                      <View className="bg-vividGreen w-1/5 p-2"></View>
                    </View>
                    <View className="flex-row justify-between items-center w-full">
                      <Text className="text-white font-poppinsSemibold text-sm">
                        Rp{" "}
                        {category.budget
                          ? formatCurrency(category.budget)
                          : formatCurrency(parseInt("120000"))}
                      </Text>
                      <Text className="text-subText font-poppinsSemibold text-sm">
                        Rp{" "}
                        {category.budget
                          ? formatCurrency(category.budget)
                          : formatCurrency(parseInt("120000"))}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
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
