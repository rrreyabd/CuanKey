import HeaderBalance from "@/components/HeaderBalance";
import Navbar from "@/components/Navbar";
import RecentTransactions from "@/components/RecentTransactions";
import { ENDPOINTS } from "@/constants/api";
import { transactions } from "@/data/placeholder";
import { UserData } from "@/data/types";
import { UserWallet } from "@/data/types"; // Add this import
import { checkLoginStatus, getToken, removeToken } from "@/utils/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";

export default function Index() {
  const [report, setReport] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userTotalBalance, setUserTotalBalance] = useState<number>(0);
  const [userWallets, setUserWallets] = useState<UserWallet[]>([]);
  
  const getUserData = async () => {
    try {
      const response = await fetch(ENDPOINTS.USER, {
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
      const data: UserData = json.data;
      setUserData(data);
      return data;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      throw error;
    }
  };

  const getUserWallets = async () => {
    try {
      const response = await fetch(ENDPOINTS.WALLET.BASE, {
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
      setUserWallets(json.data);
      return json.data;
    } catch (error) {
      console.error("Failed to fetch user wallets:", error);
      throw error;
    }
  };

  const getUserTotalBalance = async () => {
    try {
      const response = await fetch(ENDPOINTS.WALLET.TOTAL, {
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
      setUserTotalBalance(json.data.total_balance);
    } catch (error) {
      console.error("Failed to fetch user total balance:", error);
      throw error;
    }
  }
  
  useEffect(() => {
    const initializeData = async () => {
      const token = await getToken();
      console.log(token)

      try {
        const loggedIn = await checkLoginStatus();
        if (!loggedIn) {
          router.push("/auth/Login");
          return;
        }
        
        await Promise.all([getUserData(), getUserWallets(), getUserTotalBalance()]);
      } catch (error) {
        console.error("Error initializing data:", error);
        // Handle error appropriately
      }
    };

    initializeData();
  }, []);

  // if (!userData) {
  //   return <Text>Loading...</Text>;
  // }

  return (
    <View className="flex-1 bg-black">
      <ScrollView className="flex-1 px-4">
        <HeaderBalance balance={userTotalBalance} />

        {/* My Wallets */}
        <View className="bg-charcoalGray rounded-xl p-4">
          <View className="justify-between flex-row pb-2">
            <Text className="font-poppins text-white text-lg">My Wallet</Text>

            {userWallets.length > 0 ? (
              <Link href="/" className="text-vividGreen text-lg">
                See All
              </Link>
            ) : ( 
              <Link href="/" className="text-vividGreen text-lg">
                Add Wallet
              </Link>
            )}
          </View>

          <View className="border-t border-0 border-t-white/40"></View>

          {userWallets.length > 0 ? (
            userWallets.map((wallet, i) => (
              <View key={i} className="flex-row justify-between items-center pt-4">
                <View className="flex-row gap-3 items-center">
                  <Image
                    source={require("@/assets/images/icons/cash_wallet.png")}
                  />
                  <Text className="font-poppins text-white">{wallet.name}</Text>
                </View>
                <Text className="font-poppins text-white">
                  Rp {wallet.total_balance}
                </Text>
              </View>
            ))
          ) : (
            <View className="pt-4">
              <Text className="font-poppins text-white/50">No active wallet</Text>
            </View>
          )}
        </View>

        {/* Transaction report per month */}
        <View className="pt-8">
          <Text className="text-white font-poppins text-lg">
            Transaction report per month
          </Text>

          <View className="bg-charcoalGray rounded-xl p-4 mt-2">
            <View className="flex-row">
              <TouchableOpacity
                onPress={() => setReport(true)}
                className="w-1/2 justify-center items-center border-r border-0 border-r-white/40"
              >
                <Text
                  className={`${
                    report ? "text-white font-poppinsSemibold" : "text-white/50 font-poppins"
                  }`}
                >
                  Income
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setReport(false)}
                className="w-1/2 justify-center items-center border-l border-0 border-l-white/40"
              >
                <Text
                  className={`${
                    report ? "text-white/50 font-poppins" : "text-white font-poppinsSemibold"
                  }`}
                >
                  Expenses
                </Text>
              </TouchableOpacity>
            </View>

            <View className="border-t border-0 border-t-white/40 mt-4"></View>

            <View className="mt-4">
              <Text className="text-white font-poppinsSemibold">
                Average {report ? "Income" : "Expenses"}
              </Text>
              <Text className="text-white font-poppinsSemibold">
                {report ? "Rp 789.000" : "Rp 891.000"}
              </Text>
            </View>
          </View>
        </View>

        <View className="pt-8">
          <Text className="text-white font-poppins text-lg">
            Recent Transactions (The current data shown is placeholder data.)
          </Text>

          <View className="bg-charcoalGray rounded-xl px-4 mt-2 mb-32">
            {transactions?.map((transaction, index) => (
              <RecentTransactions
                key={transaction.id}
                transactions={transaction}
                index={index}
                length={transactions.length}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <Navbar className="" />
    </View>
  );
}