import HeaderBalance from "@/components/HeaderBalance";
import Navbar from "@/components/Navbar";
import RecentTransactions from "@/components/RecentTransactions";
import { ENDPOINTS } from "@/constants/api";
import { useAuth } from "@/context/AuthContext";
import { UserTransactionProps, UserWallet } from "@/data/types";
import {
  checkAuthStatus,
  checkLoginStatus,
  getToken,
  removeToken,
} from "@/utils/auth";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function Index() {
  const [report, setReport] = useState(true);
  const [userTotalBalance, setUserTotalBalance] = useState<number>(0);
  const [userWallets, setUserWallets] = useState<UserWallet[]>([]);
  const [transactions, setTransactions] = useState<UserTransactionProps[]>([]);
  const [barPresed, setBarPressed] = useState<number>();
  const [isFetching, setIsFetching] = useState(true);
  const [formattedData, setFormattedData] = useState<
    { month: string; total_expense: number; total_income: number }[]
  >([]);
  const [recapData, setRecapData] = useState<{
    income: string;
    expense: string;
  }>();

  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
  };

  const getUserTransactions = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(ENDPOINTS.TRANSACTION.BASE, {
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
      const transactions: UserTransactionProps[] = json.data.slice(0, 10);

      setTransactions(transactions);
      setIsFetching(false);
    } catch (error) {
      console.error("Failed to fetch user transactions:", error);
      throw error;
    }
  };

  const getUserTransactionsRecap = async () => {
    try {
      const response = await fetch(ENDPOINTS.TRANSACTION.MONTHLY, {
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

      // Reformat data
      const formatted = json.data.map((item: any) => ({
        month: item.month,
        total_expense: item.total_expense,
        total_income: item.total_income,
      }));

      setRecapData({
        income: formatCurrency(json.overall_averages.average_income.toFixed(0)),
        expense: formatCurrency(
          json.overall_averages.average_expense.toFixed(0)
        ),
      });

      // Save formatted data to state
      setFormattedData(formatted);
    } catch (error) {
      console.error("Failed to fetch user transactions recap:", error);
      throw error;
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      const token = await getToken();
      console.log(token);

      try {
        const loggedIn = await checkLoginStatus();
        if (!loggedIn) {
          router.replace("/auth/Login");
          return;
        }

        await Promise.all([
          getUserWallets(),
          getUserTotalBalance(),
          getUserTransactions(),
          getUserTransactionsRecap(),
          checkAuthStatus(),
        ]);
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };
    initializeData();
  }, []);

  const abbreviateMonth = (monthString: string) => {
    const monthMap = {
      January: "Jan",
      February: "Feb",
      March: "Mar",
      April: "Apr",
      May: "May",
      June: "Jun",
      July: "Jul",
      August: "Aug",
      September: "Sep",
      October: "Oct",
      November: "Nov",
      December: "Dec",
    };

    // Split the string if it contains a year
    const [month] = monthString.split(" ");
    return monthMap[month as keyof typeof monthMap] || month; // Return abbreviation or original month
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
      {isFetching && (
        <View className="flex-1 justify-center items-center bg-black">
          <ActivityIndicator size="large" color="#00B553" />
        </View>
      )}
      <ScrollView className="flex-1 px-4">
        <HeaderBalance balance={userTotalBalance} />

        {/* My Wallets */}
        <View className="bg-deepCharcoal rounded-xl p-4">
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
              <View
                key={i}
                className="flex-row justify-between items-center pt-4"
              >
                <View className="flex-row gap-3 items-center">
                  {i % 3 === 0 ? (
                    <Image
                      source={require("@/assets/images/icons/cash_wallet_blue.png")}
                      style={{ width: 40, height: 40 }}
                    />
                  ) : i % 3 === 1 ? (
                    <Image
                      source={require("@/assets/images/icons/cash_wallet_red.png")}
                      style={{ width: 40, height: 40 }}
                    />
                  ) : (
                    <Image
                      source={require("@/assets/images/icons/cash_wallet_yellow.png")}
                      style={{ width: 40, height: 40 }}
                    />
                  )}
                  <Text className="font-poppins text-white">{wallet.name}</Text>
                </View>
                <Text
                  className={`font-poppins ${
                    wallet.total_balance > 0
                      ? "text-vividGreen"
                      : "text-customRed"
                  } `}
                >
                  Rp {formatCurrency(wallet.total_balance)}
                </Text>
              </View>
            ))
          ) : (
            <View className="pt-4">
              <Text className="font-poppins text-white/50">
                No active wallet
              </Text>
            </View>
          )}
        </View>

        {/* Transaction report per month */}
        <View className="pt-8">
          <Text className="text-white font-poppins text-lg">
            Transaction report per month
          </Text>

          <View className="bg-deepCharcoal rounded-xl p-4 mt-2">
            <View className="flex-row">
              <TouchableOpacity
                onPress={() => setReport(true)}
                className="w-1/2 justify-center items-center border-r border-0 border-r-white/40"
              >
                <Text
                  className={`${
                    report
                      ? "text-white font-poppinsSemibold"
                      : "text-white/50 font-poppins"
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
                    report
                      ? "text-white/50 font-poppins"
                      : "text-white font-poppinsSemibold"
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
                Rp {report ? recapData?.income : recapData?.expense}
              </Text>
              <View className="flex-row h-[200px] items-end mt-16">
                {formattedData.map((data, index) => {
                  // Determine the highest value
                  const highestValue = report
                    ? Math.max(...formattedData.map((d) => d.total_income))
                    : Math.max(...formattedData.map((d) => d.total_expense));

                  // Calculate percentage
                  const percentage = report
                    ? (data.total_income / highestValue) * 100
                    : (data.total_expense / highestValue) * 100;

                  const handlePressBarChart = () => {
                    if (barPresed === index) {
                      setBarPressed(NaN);
                    } else {
                      setBarPressed(index);
                      console.log("barPressed: ", barPresed);
                      console.log("index: ", index);
                    }
                  };

                  return (
                    // Bar chart
                    <View
                      key={index}
                      className="w-[20%] h-full gap-2 justify-end"
                    >
                      {barPresed === index && (
                        <View
                          className={`absolute bottom-10 z-20 w-40 p-2 rounded-md bg-black/80 ${
                            index > 2 ? "right-2" : "left-2"
                          }`}
                        >
                          <Text className="text-white font-poppins">
                            {data.month}
                          </Text>
                          <Text className="text-white font-poppins">
                            Rp{" "}
                            {report
                              ? formatCurrency(data.total_income)
                              : formatCurrency(data.total_expense)}
                          </Text>
                        </View>
                      )}

                      <TouchableOpacity
                        onPress={handlePressBarChart}
                        className="items-center h-full"
                        style={{ height: `${percentage}%` }}
                      >
                        <View
                          className={`rounded-md h-full w-[80%] ${
                            // (
                            //   report
                            //     ? highestValue === data.total_income
                            //     : highestValue === data.total_expense
                            // )
                            barPresed === index ? "bg-white" : "bg-vividGreen"
                          }`}
                        ></View>
                      </TouchableOpacity>
                      <Text className="text-white text-center font-poppinsSemibold">
                        {abbreviateMonth(data.month)}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>

        <View className="pt-8">
          <Text className="text-white font-poppins text-lg">
            Recent Transactions
          </Text>

          {transactions.length > 0 ? (
            <View className="bg-deepCharcoal rounded-xl px-4 mt-2 mb-32">
              {transactions?.map((transaction, index) => (
                <RecentTransactions
                  key={transaction.id}
                  transactions={transaction}
                  index={index}
                  length={transactions.length}
                />
              ))}
            </View>
          ) : (
            <View className="p-4 h-40 justify-center">
              <Text className="text-white/50 font-poppins text-lg text-center">
                You haven't added any transactions yet.
              </Text>
              <Link href="/transactions/Transaction">
                <Text className="text-vividGreen font-poppins text-lg text-center underline">
                  Add Transaction
                </Text>
              </Link>
            </View>
          )}
        </View>
      </ScrollView>

      <Navbar className="" />
    </View>
  );
}
