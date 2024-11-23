import HeaderBalance from "@/components/HeaderBalance";
import Navbar from "@/components/Navbar";
import RecentTransactions from "@/components/RecentTransactions";
import { transactions } from "@/data/placeholder";
import { UserData } from "@/data/types";
import { checkLoginStatus, getToken } from "@/utils/auth";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function Index() {
  const [report, setReport] = useState(true);

  useEffect(() => {
    const verifyLogin = async () => {
      const loggedIn = await checkLoginStatus();
      if (!loggedIn) router.push("/auth/Login");
    };

    verifyLogin();
  }, []);

  return (
    <View className="flex-1 bg-black">
      <ScrollView className="flex-1 px-4">
        <HeaderBalance balance={1500841000} />

        {/* My Wallets */}
        <View className="bg-charcoalGray rounded-xl p-4">
          <View className="justify-between flex-row pb-2">
            <Text className="font-poppins text-white text-lg">My Wallet</Text>

            <Link href="/" className="text-vividGreen text-lg">
              See all
            </Link>
          </View>

          <View className="border-t border-0 border-t-white/40"></View>

          <View className="flex-row justify-between items-center pt-4">
            <View className="flex-row gap-3 items-center">
              <Image
                source={require("@/assets/images/icons/cash_wallet.png")}
              />
              <Text className="font-poppins text-white">Cash Wallet</Text>
            </View>

            <View className="items-center">
              <Text className="font-poppins text-white">Rp. 1.500.000</Text>
            </View>
          </View>
        </View>

        {/* Transaction report per month */}
        <View className="pt-8">
          <Text className="text-white font-poppins text-lg ">
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
                    report ? "text-white font-poppinsSemibold" : "text-white/50"
                  } text-lg`}
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
                    report ? "text-white/50" : "text-white font-poppinsSemibold"
                  } text-lg`}
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
          <Text className="text-white font-poppins text-lg ">
            Recent Transactions
          </Text>

          <View className="bg-charcoalGray rounded-xl px-4 mt-2 mb-32">
            {transactions
              ? transactions.map((transaction, index) => {
                  return (
                    <RecentTransactions
                      key={transaction.id}
                      transactions={transaction}
                      index={index}
                      length={transactions.length}
                    />
                  );
                })
              : null}
          </View>
        </View>
      </ScrollView>

      <Navbar className="" />
    </View>
  );
}
