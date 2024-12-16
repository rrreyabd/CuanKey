import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { DropdownProps } from "@/data/types";

const TransactionTypeDropdown: React.FC<DropdownProps> = ({
  onValueChange,
}) => {
  const [value, setValue] = useState<string | null>(null);

  const transactionTypes = [
    { label: "Income", value: "Pemasukan" },
    { label: "Expense", value: "Pengeluaran" },
  ];

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
      data={transactionTypes}
      labelField="label"
      valueField="value"
      placeholder="Select Transaction Type"
      value={value}
      onChange={(item) => {
        setValue(item.value);
        onValueChange(item.value);
      }}
      renderItem={renderItem}
    />
  );
};

export default TransactionTypeDropdown;

const styles = StyleSheet.create({
  dropdown: {
    height: 55,
    color: "white",
    backgroundColor: "#20252a",
    borderRadius: 6,
    paddingLeft: 30,
    paddingRight: 15,
  },
  container: {
    borderColor: "#20252a",
    backgroundColor: "#20252a",
    borderRadius: 6,
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
    fontFamily: "Poppins-SemiBold",
    color: "white",
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
