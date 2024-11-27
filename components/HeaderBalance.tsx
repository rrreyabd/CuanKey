import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Link } from "expo-router";

interface HeaderBalanceProps {
  balance: number;
}

const HeaderBalance: React.FC<HeaderBalanceProps> = ({ balance }) => {
  const [showBalance, setShowBalance] = useState<boolean>(false);

  return (
    <View className="w-full py-6 flex-row justify-between">
      <View>
        <Text className="text-lightGray font-poppins text-lg">
          All Wallets Total Balance
        </Text>
        <View className="gap-2 flex-row items-center">
          <Text
            className={`text-white font-poppinsSemibold text-xl self-start}`}
          >
            {showBalance ? `Rp ${balance.toLocaleString()}` : "Rp  *****"}
          </Text>
          <TouchableOpacity
            onPress={() => setShowBalance((prev) => !prev)}
            className="w-6 justify-center items-center"
          >
            <FontAwesome
              name={showBalance ? "eye" : "eye-slash"}
              size={14}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="justify-center">
        <View className="justify-center items-center border-2 border-white rounded-lg  aspect-square h-12">
          <Link href="./Profile">
            <MaterialIcons name="notifications" size={24} color="white" />
          </Link>
        </View>
      </View>
    </View>
  );
};

export default HeaderBalance;