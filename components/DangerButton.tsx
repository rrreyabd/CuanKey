import { ButtonProps } from "@/data/types";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { TouchableOpacity, Text } from "react-native";

const DangerButton: FC<ButtonProps> = ({
  title,
  onPress,
  className,
  textClassName,
}) => {
  return (
    <>
      <LinearGradient
        colors={["#E9482B", "#832818"]}
        start={[0, 0]}
        end={[1, 0]}
        className="h-14 justify-center rounded-xl overflow-hidden"
      >
        <TouchableOpacity onPress={onPress}>
          <Text
            className={`text-white text-lg font-poppinsSemibold text-center ${textClassName}`}
          >
            {title}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
};

export default DangerButton;
