import { Image, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import { useAuth } from "@/context/AuthContext";

const ProfilePictureComponent = ({
  handleOpenBottomSheet,
}: {
  handleOpenBottomSheet?: () => void;
}) => {
  const { user } = useAuth();

  useEffect(() => {
    console.log(user?.profile_picture)
  }, [])

  const ProfilePictureDynamicComponent = () => {
    switch (user?.profile_picture?.toString() ?? "") {
      case "1":
        return (
          <Image
            source={require("@/assets/profile/character_1.png")}
            style={{ width: 120, height: 120 }}
          />
        );
      case "2":
        return (
          <Image
            source={require("@/assets/profile/character_2.png")}
            style={{ width: 120, height: 120 }}
          />
        );
      case "3":
        return (
          <Image
            source={require("@/assets/profile/character_3.png")}
            style={{ width: 120, height: 120 }}
          />
        );
      case "4":
        return (
          <Image
            source={require("@/assets/profile/character_4.png")}
            style={{ width: 120, height: 120 }}
          />
        );
      case "5":
        return (
          <Image
            source={require("@/assets/profile/character_5.png")}
            style={{ width: 120, height: 120 }}
          />
        );
      case "6":
        return (
          <Image
            source={require("@/assets/profile/character_6.png")}
            style={{ width: 120, height: 120 }}
          />
        );
      case "7":
        return (
          <Image
            source={require("@/assets/profile/character_7.png")}
            style={{ width: 120, height: 120 }}
          />
        );
      case "8":
        return (
          <Image
            source={require("@/assets/profile/character_8.png")}
            style={{ width: 120, height: 120 }}
          />
        );
      default:
        return (
          <Image
            source={require("@/assets/profile/character_1.png")}
            style={{ width: 120, height: 120 }}
          />
        );
    }
  };

  return (
    <View className="relative">
      <View className="bg-white rounded-full overflow-hidden aspect-square">
        <ProfilePictureDynamicComponent />
      </View>
      {/* Button Edit Image */}
      {handleOpenBottomSheet && (
        <TouchableOpacity onPress={handleOpenBottomSheet} className="bg-vividGreen p-2 rounded-full absolute bottom-1 right-1">
          <Feather name="edit-2" size={16} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProfilePictureComponent;
