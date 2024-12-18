import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getToken, saveToken, removeToken } from "@/utils/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContextProps, UserData } from "@/data/types";
import { ENDPOINTS } from "@/constants/api";
import { useRouter } from "expo-router";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await getToken();
      const storedUserData = await AsyncStorage.getItem("userData");

      if (token && storedUserData) {
        setIsAuthenticated(true);
        setUserData(JSON.parse(storedUserData));
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const fetchUserData = async () => {
    const { setUserData } = useAuth();
    try {
      const response = await fetch(ENDPOINTS.USER, {
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
      console.log("json: ", json)
  
      const data: UserData = json.data;
      console.log(data)
      setUserData(data);
      return data;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      throw error;
    }
  }

  const login = async (token: string, user: UserData) => {
    await saveToken(token);
    await AsyncStorage.setItem("userData", JSON.stringify(user)); // Simpan data pengguna
    setIsAuthenticated(true);
    setUserData(user); // Update state
  };

  const logout = async () => {
    await removeToken();
    await AsyncStorage.removeItem("userData"); // Hapus data pengguna dari AsyncStorage
    setIsAuthenticated(false);
    setUserData(null); // Reset state
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(ENDPOINTS.USER, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      await logout();
      alert("Account deleted successfully.");
      router.replace("/auth/Login")
    } catch (error) {
      console.error("Failed to delete account:", error);
      throw error;
    }
  };

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const token = await getToken();

      if (!token) {
        console.log("Token is null or missing");
        return;
      }

      const response = await fetch(ENDPOINTS.AUTH.LOGOUT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (response.ok) {
        await AsyncStorage.removeItem("token");
        console.log("Logout successful");
        router.push("/auth/Login");
      } else {
        const errorData = await response.json();
        console.log("Logout failed:", errorData);
      }
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, user: userData, setUserData, fetchUserData, handleDeleteAccount, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
