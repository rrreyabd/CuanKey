import HeaderBalance from "@/components/HeaderBalance";
import RecentTransactions from "@/components/RecentTransactions";
import { transactions } from "@/data/placeholder";
// import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";

export default function Index() {
  const [report, setReport] = useState(true);
  return (
    <ScrollView className="bg-black px-6 flex-1">
      <HeaderBalance balance={1500841000} />

      {/* My Wallets */}
      <View className="bg-charcoalGray rounded-xl p-4">
        <View className="justify-between flex-row pb-2">
          <Text className="font-poppins text-white text-lg">My Wallets</Text>

          <Link href="/" className="text-vividGreen text-lg">
            See all
          </Link>
        </View>

        <View className="border-t border-0 border-t-white/40"></View>

        <View className="flex-row justify-between items-center pt-4">
          <View className="flex-row gap-3 items-center">
            <Image source={require("@/assets/images/icons/cash_wallet.png")} />
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
                } t  ext-lg`}
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

        <View className="bg-charcoalGray rounded-xl px-4 mt-2">
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
  );
}

// const HeaderBalance = () => {
//   const [showBalance, setShowBalance] = useState(false);

//   return (
//     <View className="w-full py-6 flex-row justify-between">
//       <View>
//         <Text className="text-lightGray font-poppins text-lg">
//           All Wallets Total Balance
//         </Text>
//         <View className="gap-2 flex-row items-center">
//           <Text
//             className={`text-white font-poppinsSemibold text-xl self-start}`}
//           >
//             {showBalance ? "Rp 1.500.000" : "Rp  *****"}
//           </Text>
//           <TouchableOpacity
//             onPress={() => setShowBalance((prev) => !prev)}
//             className="w-6 justify-center items-center"
//           >
//             <FontAwesome
//               name={showBalance ? "eye" : "eye-slash"}
//               size={14}
//               color="white"
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View className="justify-center">
//         <View className="justify-center items-center border-2 border-white rounded-lg  aspect-square h-12">
//           <Link href="/Profile">
//             <MaterialIcons name="notifications" size={24} color="white" />
//           </Link>
//         </View>
//       </View>
//     </View>
//   );
// };
