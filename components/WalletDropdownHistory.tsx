import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ENDPOINTS } from "@/constants/api";
import { getToken } from "@/utils/auth";
import { DropdownProps } from "@/data/types";

const WalletDropdownHistory: React.FC<DropdownProps> = ({ onValueChange }) => {
  const [value, setValue] = useState("Cash Wallet");
  const [userWallets, setUserWallets] = useState([]);

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
      const walletNames = json.data.map(
        (wallet: { id: number; name: string }) => ({
          label: wallet.name,
          value: wallet.id.toString(),
        })
      );
      setUserWallets(walletNames);
      return json.data;
    } catch (error) {
      console.error("Failed to fetch user wallets:", error);
      throw error;
    }
  };

  useEffect(() => {
    getUserWallets();
  }, []);

  const renderItem = (item: { label: string; value: string }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem} className="font-poppins">
          {item.label}
        </Text>
        {item.value === value && (
          <AntDesign style={styles.icon} color="black" name="check" size={20} />
        )}
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={[styles.placeholderStyle, styles.textDropdown]}
      selectedTextStyle={[styles.selectedTextStyle, styles.textDropdown]}
      iconStyle={styles.iconStyle}
      containerStyle={styles.container}
      data={userWallets}
      labelField="label"
      valueField="value"
      placeholder="Cash Wallet"
      itemContainerStyle={styles.container}
      activeColor="#20252a"
      value={value}
      onChange={(item) => {
        setValue(item.value);
        onValueChange(item.label);
      }}
      renderLeftIcon={() => (
        <Image
          source={require("@/assets/images/icons/cash_wallet.png")}
          style={styles.icon}
        />
      )}
      renderItem={renderItem}
    />
  );
};

export default WalletDropdownHistory;

const styles = StyleSheet.create({
  dropdown: {
    height: 55,
    color: "white",
    backgroundColor: "#20252a",
    borderRadius: 30,
    paddingLeft: 15,
    paddingRight: 15,
    width: 200,
  },
  container: {
    borderColor: "#20252a",
    backgroundColor: "#20252a",
    borderRadius: 30,
    marginTop: 2,
  },
  icon: {
    marginRight: 8,
    color: "white",
  },
  item: {
    padding: 17,
    backgroundColor: "#20252a",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 30,
  },
  textItem: {
    color: "white",
    flex: 1,
    fontFamily: "Poppins-SemiBold",
  },
  placeholderStyle: {
    fontSize: 14,
    color: "white",
    fontFamily: "Poppins-SemiBold",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "white",
    fontFamily: "Poppins-SemiBold",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  textDropdown: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    color: "white",
  },
});
