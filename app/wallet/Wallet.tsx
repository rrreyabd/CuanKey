import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackHeader from "@/components/BackHeader";
import PrimaryButton from "@/components/PrimaryButton";
import { router } from "expo-router";
import { ENDPOINTS } from "@/constants/api";
import { getToken } from "@/utils/auth";
import { UserWallet } from "@/data/types";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

const Wallet = () => {
  const [loading, setLoading] = useState(false);
  const [userWallets, setUserWallets] = useState<UserWallet[]>([]);

  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Get user wallets
  const getUserWallets = async () => {
    setLoading(true);
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

      // Remove the user field from each wallet object
      const walletsWithoutUser = json.data.map((wallet: UserWallet) => {
        const { user, ...walletWithoutUser } = wallet;
        return walletWithoutUser;
      });

      setUserWallets(walletsWithoutUser);
      return walletsWithoutUser;
    } catch (error) {
      console.error("Failed to fetch user wallets:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(userWallets);
    getUserWallets();
  }, []);

  if (loading) {
    return (
      <View className="bg-black flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00B553" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <View className="py-6 px-4">
        <View className="pb-4">
          <BackHeader pageTitle="My Wallets" />
        </View>

        <ScrollView>
          <View className="gap-4 mt-8">
            {userWallets.map((wallet, i) => {
              console.log(JSON.stringify(wallet, null, 2));
              const colors =
                i % 3 === 0
                  ? ["#00B553", "#000000"]
                  : i % 3 === 1
                  ? ["#0E8BD0", "#000000"]
                  : ["#E9482B", "#000000"];
              return (
                <TouchableOpacity
                  onPress={() => {
                    router.push(`/wallet/${wallet.id}`);
                  }}
                  activeOpacity={0.8}
                  key={i}
                >
                  <LinearGradient
                    colors={[colors[0], colors[1]]}
                    start={[0, 0]}
                    end={[0, 1]}
                    className={`h-48 rounded-xl overflow-hidden border border-white/50`}
                  >
                    <View className="h-full justify-between p-4">
                      <View className="flex-row justify-between">
                        <View>
                          <Text className="text-white font-poppins">
                            Created at
                          </Text>
                          <Text className="text-white/70 text-sm font-poppins">
                            {wallet.created_at}
                          </Text>
                        </View>

                        <Image
                          source={require("@/assets/images/icons/cuankey_icon_long.png")}
                          style={{ width: 123, height: 33.76 }}
                        />
                      </View>

                      <View className="flex-row justify-between">
                        <View>
                          <Text className="text-white font-poppinsBold text-lg">
                            {wallet.name}
                          </Text>
                          <Text className="text-white/70 font-poppins">
                            Rp {formatCurrency(wallet.total_balance)}
                          </Text>
                        </View>

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
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>

          <View className="h-36 bg-black"></View>
        </ScrollView>
      </View>

      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"]}
        start={[0, 0]}
        end={[0, 0.4]}
        className="h-30 justify-center rounded-xl overflow-hidden absolute bottom-0 py-8 px-4 w-full"
      >
        {/* <View className="py-8 px-4 w-full absolute bottom-0 bg-black" style> */}
        <PrimaryButton
          title="Add Wallet"
          onPress={() => router.push("/wallet/AddWallet")}
        />
        {/* </View> */}
      </LinearGradient>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({});
