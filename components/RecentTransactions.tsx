import { UserTransactionProps } from "@/data/types";
import { Image, Text, View } from "react-native";

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
    <View
      key={transactions.id}
      className={`flex-row justify-between ${
        index !== length - 1 && "border-b border-0 border-b-white/40"
      } py-6`}
    >
      <View>
        <View className="flex-row gap-4 items-center">
          <Text className="text-3xl">🍕</Text>

          <View className="justify-center">
            <Text className="text-white font-poppins">
              {transactions.description}
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
  );
};

export default RecentTransactions;
