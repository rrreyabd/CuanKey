import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ENDPOINTS } from "@/constants/api";
import { getToken } from "@/utils/auth";
import { DropdownProps } from "@/data/types";

const CategoryDropdown: React.FC<DropdownProps> = ({
  onValueChange,
  transactionType,
}) => {
  const [value, setValue] = useState<string | null>(null);
  const [userCategories, setUserCategories] = useState([]);

  const getUserCategories = async () => {
    try {
      const response = await fetch(ENDPOINTS.CATEGORY.BASE, {
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

      const categories = json.data
        .filter((category: { id: number; name: string; type: string }) => {
          if (transactionType === "Pemasukan") {
            return category.type === "Pemasukan";
          } else if (transactionType === "Pengeluaran") {
            return category.type === "Pengeluaran";
          }
          return false;
        })
        .map((category: { id: number; name: string }) => ({
          label: category.name,
          value: category.id.toString(),
        }));

      setUserCategories(categories);
      return json.data;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw error;
    }
  };

  useEffect(() => {
    getUserCategories();
  }, [transactionType]);

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
      data={userCategories}
      labelField="label"
      valueField="value"
      placeholder="Select Category"
      value={value}
      onChange={(item) => {
        setValue(item.value);
        onValueChange(item.value);
      }}
      renderItem={renderItem}
    />
  );
};

export default CategoryDropdown;

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
