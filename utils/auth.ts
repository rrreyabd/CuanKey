import { UserData } from "@/data/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkLoginStatus = async () => {
  const token = await AsyncStorage.getItem("token");
  return token !== null;
};

export const saveUserData = async ( data: UserData) => {
  await AsyncStorage.setItem("user", JSON.stringify(data));
}

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem("token", token);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem("token");
};

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};