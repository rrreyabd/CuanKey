import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkLoginStatus, getToken, removeToken } from '@/utils/auth'; // Import fungsi checkLoginStatus
import { ENDPOINTS } from '@/constants/api';

const Profile = () => {
  const [fact, setFact] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // State untuk status login
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const loggedIn = await checkLoginStatus();
      setIsLoggedIn(loggedIn); // Update status login
      if (!loggedIn) {
        router.push('/auth/Login'); // Jika tidak login, redirect ke halaman login
      }
    };

    checkLogin();

    const fetchFact = async () => {
      try {
        const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
        const data = await response.json();
        setFact(data.text);
      } catch (error) {
        console.error('Error fetching fact:', error);
      }
    };

    fetchFact();
  }, [refresh, router]);

  const handleLogout = async () => {
    try {
      // const token = getToken(); // Ambil token dari AsyncStorage
      const token = await AsyncStorage.getItem('token'); // Ambil token dari AsyncStorage
      console.log(token);
      if (!token) {
        console.log('Token is null or missing');
        return;
      }
      
      const response = await fetch(ENDPOINTS.AUTH.LOGOUT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await AsyncStorage.removeItem('token');
        console.log('Logout successful');
        router.push('/auth/Login');
      } else {
        const errorData = await response.json();
        console.log('Logout failed:', errorData);
      }
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  if (isLoggedIn === null) {
    return <Text>Loading...</Text>; // Loading jika status login belum diketahui
  }

  return (
    <View className="justify-center items-center flex-1">
      <Text className="text-red-300">Profile</Text>
      {fact ? <Text className="text-green-500">{fact}</Text> : <Text>Loading fact...</Text>}
      <Button title="Refresh" onPress={() => setRefresh((prev) => !prev)} />
      <Button title="Logout" onPress={handleLogout} />
      <Link href="/" className="text-blue-400 font-semibold">
        Back to Home
      </Link>
    </View>
  );
};

export default Profile;
