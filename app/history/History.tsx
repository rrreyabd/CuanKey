/*
React Native Core Components:
  Text, Pressable, View, ActivityIndicator: Digunakan untuk membangun antarmuka pengguna.
  ScrollView: Untuk memungkinkan scrolling pada konten yang panjang.
Custom Components:
  Navbar: Navigasi bawah aplikasi.
  WalletDropdownHistory: Dropdown untuk memilih dompet aktif.
  HistoryTransactionComponent: Komponen individual untuk menampilkan transaksi.
  DataNotFound: Menampilkan pesan ketika tidak ada data.
Utility & Constants:
  ENDPOINTS: URL API untuk mengakses data transaksi.
  checkLoginStatus, getToken: Fungsi utilitas untuk otentikasi pengguna.
Router:
  router: Digunakan untuk navigasi antarhalaman.
*/
import { Text, Pressable, View, StatusBar, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { ScrollView } from "react-native-gesture-handler";
import WalletDropdownHistory from "@/components/WalletDropdownHistory";
import { UserTransactionProps } from "@/data/types";
import { ENDPOINTS } from "@/constants/api";
import { checkLoginStatus, getToken } from "@/utils/auth";
import { router } from "expo-router";
import HistoryTransactionComponent from "@/components/HistoryTransactionComponent";
import DataNotFound from "@/components/DataNotFound";

// KOMPONEN HISTORY
const History = () => {
  /*
    filterState: Menyimpan filter aktif (All Type, Income, atau Expense).
    activeWallet: Dompet aktif untuk filter.
    transactions: Menyimpan data transaksi dari API.
    user: Menyimpan data pengguna.
    isFetching: Status loading saat memuat data.
  */
  const [filterState, setFilterState] = useState("All Type");
  const [activeWallet, setActiveWallet] = useState("Cash Wallet");
  const [transactions, setTransactions] = useState<UserTransactionProps[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);

  // Get the current month
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const currentMonthIndex = new Date().getMonth();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  /*
    mengembalikan array bulan terbaru hingga 12 bulan ke belakang
  */
  const getRecentMonths = (currentMonthIndex: number) => {
    const recentMonths = [];
    for (let i = 0; i < 12; i++) {
      const monthIndex = (currentMonthIndex - i + 12) % 12;
      recentMonths.push(months[monthIndex]);
    }
    return recentMonths;
  };

  const recentMonths = getRecentMonths(currentMonthIndex);

  const formatDateToMonth = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { month: "long" });
  };

  // Get User Transactions
  /*
    Mendapatkan semua transaksi pengguna dari API.
    Mengatur status isFetching untuk menunjukkan proses loading
  */
  const getUserTransactions = async () => {
    setIsFetching(true)
    try {
      const response = await fetch(ENDPOINTS.TRANSACTION.BASE, { // memanggil endpoint transaction
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`, // menunggu token autentikasi
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();

      const transactions: UserTransactionProps[] = json.data;

      setIsFetching(false)
      setTransactions(transactions);
    } catch (error) {
      console.error("Failed to fetch user transactions:", error);
      throw error;
    }
  };

  //memperbarui dompet berdasarkan input pengguna
  const handleWalletChange = (value: string | null): void => {
    setActiveWallet(value ?? "");
  };
  /*
    mengecek status login, memuat data transaksi, menginisialisasi komponen
  */
  useEffect(() => {
    const initializeData = async () => {
      const token = await getToken();
      console.log("user: ", user);
      console.log(token);

      try {
        const loggedIn = await checkLoginStatus();
        if (!loggedIn) {
          router.replace("/auth/Login");
          return;
        }
        console.log(activeWallet);
        await Promise.all([getUserTransactions()]);
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };

    initializeData();
  }, [activeWallet]);

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
            Transaction History
          </Text>
          <WalletDropdownHistory onValueChange={handleWalletChange} />
        </View>

        {/* Filter */}
        <View className="flex-row justify-between items-center mt-4">
          <Pressable
            className={`w-1/3 border-b-2  py-4 ${
              filterState === "All Type"
                ? "border-vividGreen"
                : "border-subText"
            } `}
            onPress={() => setFilterState("All Type")}
          >
            <Text
              className={`text-center font-poppinsSemibold ${
                filterState === "All Type" ? "text-vividGreen" : "text-white"
              } `}
            >
              All Type
            </Text>
          </Pressable>
          <Pressable
            className={`w-1/3 border-b-2  py-4 ${
              filterState === "Income" ? "border-vividGreen" : "border-subText"
            } `}
            onPress={() => setFilterState("Income")}
          >
            <Text
              className={`text-center font-poppinsSemibold ${
                filterState === "Income" ? "text-vividGreen" : "text-white"
              } `}
            >
              Income
            </Text>
          </Pressable>
          <Pressable
            className={`w-1/3 border-b-2  py-4 ${
              filterState === "Expense" ? "border-vividGreen" : "border-subText"
            } `}
            onPress={() => setFilterState("Expense")}
          >
            <Text
              className={`text-center font-poppinsSemibold ${
                filterState === "Expense" ? "text-vividGreen" : "text-white"
              } `}
            >
              Expense
            </Text>
          </Pressable>
        </View>

        {/* Transaction History */}
        {transactions.length > 0 ? (
          <View className="gap-4 mt-4">
            {recentMonths.map((month, index) => {
              const monthTransactions = transactions?.filter((transaction) => {
                const isCorrectMonth =
                  formatDateToMonth(transaction.transaction_date) === month;
                const isCorrectWallet =
                  transaction.wallet.name === activeWallet;
                const isCorrectFilter =
                  filterState === "All Type" ||
                  (filterState === "Income" &&
                    transaction.category.type === "Pemasukan") ||
                  (filterState === "Expense" &&
                    transaction.category.type === "Pengeluaran");

                return isCorrectMonth && isCorrectWallet && isCorrectFilter;
              });

              if (monthTransactions.length === 0) {
                return null;
              }

              return (
                <View key={index} className="gap-2">
                  <Text className="text-subText font-poppinsSemibold text-base uppercase">
                    {currentMonth === month ? "This Month" : month}
                  </Text>
                  <View className="bg-black rounded-xl px-4">
                    {monthTransactions.map((transaction, index) => (
                      <HistoryTransactionComponent
                        key={transaction.id}
                        transactions={transaction}
                        index={index}
                        length={transactions.length}
                      />
                    ))}
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <DataNotFound 
            title="You have no transaction yet"
            subTitle="Start adding your income and expenses to manage your money better!"
            onPress={() => router.replace("/transactions/Transaction")}
            buttonTitle="Create Transaction"
          />
        )}
      </ScrollView>
      <Navbar />
    </View>
  );
};

export default History;
