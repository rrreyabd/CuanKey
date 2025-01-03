import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackHeader from "@/components/BackHeader";
import PrimaryButton from "@/components/PrimaryButton";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { getToken } from "@/utils/auth";
import { ENDPOINTS } from "@/constants/api";
import { RecurringInterface } from "@/data/types";

// komponen utama untuk menampilkan daftar transaksi berulan
const Recurring = () => {
  // fungsi untuk memformat angka menjadi mata uang
  const formatCurrency = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };


  // state untuk menyimpan data transaksi berulang pengguna
  const [userRecurring, setUserRecurring] = useState<RecurringInterface[]>([]);

  // fungsi untuk mengambil data transaksi berulang pengguna dari server
  const getUserRecurring = async () => {
    try {
      // memanggil endpoint api untuk mendapatkan data transaksi berulang
      const response = await fetch(`${ENDPOINTS.RECURRING.BASE}`, {
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
      const data = json.data;
      setUserRecurring(data);
    } catch (error) {
      console.error("Failed to fetch user recurring transactions:", error);
      throw error;
    }
  };

  //mengambil data transaksi berulang saat komponen pertama kali dirender
  useEffect(() => {
    getUserRecurring();
  }, []);

  // fungsi untuk menangani penghapusan tranksaksi berulang
  const handleDeleteRecurring = async (id: number) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this recurring transaction?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              // memanggil endpoing untuk menghapus transaksi berulang
              const response = await fetch(
                `${ENDPOINTS.RECURRING.BASE}/${id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${await getToken()}`,
                  },
                }
              );

              if (!response.ok) {
                throw new Error(
                  `Error: ${response.status} ${response.statusText}`
                );
              }

              Alert.alert(
                "Success",
                "Recurring transaction deleted successfully"
              );
              router.replace("/profile/Profile");
            } catch (error) {
              console.error("Error deleting recurring transaction:", error);
              Alert.alert(
                "Error",
                "An error occurred while deleting the recurring transaction"
              );
            } finally {
            }
          },
        },
      ],
      // Dialog tidak dapat ditutup tanpa memilih salah satu tombol
      { cancelable: false }
    );
  };

  return (
    <View className="flex-1 bg-black">
      <View className="px-4 py-6">
        <BackHeader pageTitle="Recurring" />

        <ScrollView className="mt-8">
          <View>
            {userRecurring.length > 0 ? (
              userRecurring.map((recurring, index) => (
                <View
                  key={index}
                  className="flex-row justify-between p-4 bg-deepCharcoal rounded-md mb-4"
                >
                  <View>
                    <Text className="font-poppinsSemibold text-white">
                      {recurring.description}
                    </Text>
                    <Text className="font-poppinsSemibold text-vividGreen">
                      Rp. {formatCurrency(recurring.amount)}
                    </Text>
                  </View>

                  <View className="items-center flex-row gap-4">
                    <TouchableOpacity
                      onPress={() => {
                        router.push(`/recurring/${recurring.id}`);
                      }}
                    >
                      <FontAwesome name="edit" color="white" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDeleteRecurring(recurring.id)}
                    >
                      <FontAwesome name="trash" color="red" size={24} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text className="text-white font-poppinsSemibold text-center">
                No recurring transactions found
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
      <View className="py-8 px-4 w-full absolute bottom-0 bg-black">
        <PrimaryButton
          title="Add Recurring"
          onPress={() => router.push("/recurring/AddRecurring")}
        />
      </View>
    </View>
  );
};

export default Recurring;

const styles = StyleSheet.create({});
