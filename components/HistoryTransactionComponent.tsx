import { UserTransactionProps } from "@/data/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const HistoryTransactionComponent = ({
  transactions,
  index,
}: {
  transactions: UserTransactionProps;
  index: number;
  length: number;
}) => {
  const splitDate = (fullDate: string) => {
    const [year, month, day] = fullDate.split("-");

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthName = monthNames[parseInt(month, 10) - 1];

    return {
      date: parseInt(day, 10),
      month: monthName,
      year: parseInt(year, 10),
    };
  };

  const finalDate = splitDate(transactions.transaction_date);

  return (
    <TouchableOpacity
      onPress={() => {
        console.log("Navigating to transaction detail id: ", transactions.id);
        router.push(`/transactions/${transactions.id}`);
      }}
    >
      <View
        key={transactions.id}
        className={`flex-row justify-between py-4 border-b border-subText`}
      >
        <View>
          <View className="flex-row gap-4 items-center">
            <View>
              <Text className="text-white text-center text-lg h-5 font-poppinsBold">
                {finalDate.date}
              </Text>
              <Text className="text-white text-center h-4 text-sm font-poppins">
                {finalDate.month}
              </Text>
              <Text className="text-white text-center h-4 text-sm font-poppins">
                {finalDate.year}
              </Text>
            </View>

            <Text className="text-3xl">🍕</Text>

            <View className="justify-center">
              <Text className="text-white font-poppinsSemibold h-6 capitalize">
                {transactions.category.name}
              </Text>
              <Text
                className={`${
                  transactions.category.type === "Pemasukan"
                    ? "text-vividGreen"
                    : "text-customRed"
                }  font-poppinsSemibold`}
              >
                {transactions.category.type === "Pemasukan" ? "+" : "-"} Rp{" "}
                {transactions.amount.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        <View className="justify-center">
          <FontAwesome name="chevron-right" size={14} color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HistoryTransactionComponent;
