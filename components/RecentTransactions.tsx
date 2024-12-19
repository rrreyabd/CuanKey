import { UserTransactionProps } from "@/data/types";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const RecentTransactions = ({
  transactions,
  index,
  length,
}: {
  transactions: UserTransactionProps;
  index: number;
  length: number;
}) => {
  const formattedDate = transactions.transaction_date
    .split("T")[0]
    .split("-")
    .reverse()
    .join("/");

  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/transactions/${transactions.id}`);
      }}
    >
      <View
        key={transactions.id}
        className={`flex-row justify-between ${
          index !== length - 1 && "border-b border-0 border-b-white/40"
        } py-6`}
      >
        <View>
          <View className="flex-row gap-4 items-center">
            <Text className="text-3xl">{transactions.category.icon}</Text>

            <View className="justify-center">
              <Text className="text-white font-poppins">
                {transactions.category.name}
              </Text>
              <Text className="text-lightGray font-poppins text-sm">
                {formattedDate}
              </Text>
            </View>
          </View>
        </View>

        <View className="justify-center">
          <Text
            className={`${
              transactions.category.type === "Pemasukan"
                ? "text-vividGreen"
                : "text-customRed"
            }  font-poppins`}
          >
            {transactions.category.type === "Pemasukan" ? "+" : "-"} Rp{" "}
            {transactions.amount.toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecentTransactions;
